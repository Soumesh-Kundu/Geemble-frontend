import Navbar from "../components/Navbar";
import Liked from "../components/Liked";
import { Outlet,useLocation,useNavigate } from "react-router-dom";
import { useState,useRef,useEffect } from "react";
import {EditPost,Post} from "./";
import { usePostAtom,ACTIONS } from "../store/CurrentPost";
import {useQuery} from '@tanstack/react-query'
import { getDetails } from "../api/user";
import { useAuthorAtom } from "../store/Authstore";


export default function Home() {
  const  [isCrossed,setIsCrossed]=useState(false)
  const [{activeFor,likes},setCurrentPost]=usePostAtom()
  const navigator=useNavigate()
  const [,setAuthor]=useAuthorAtom()
  const {isLoading,data}=useQuery({
    queryKey:['users/admin'],
    queryFn:getDetails,
    refetchOnWindowFocus:false,
  })
  
  const appRef=useRef()
  const location=useLocation()
  const changeNavbarColor = () => {
    if (appRef?.current?.getBoundingClientRect().top <= 60) {
      setIsCrossed(true);
    } else {
      setIsCrossed(false);
    }
  };
  useEffect(() => {
    if(localStorage.getItem('authToken')===null){
      navigator('/login')
    }
    window.addEventListener("scroll", changeNavbarColor, true);
    return () => {
      window.removeEventListener("scroll", changeNavbarColor);
    };
  }, []);
  useEffect(()=>{
    if(!isLoading && data!==undefined){
      setAuthor({
        ...data.data.result
      })
    }
  },[data])

  return (
    <>
    <div className="flex flex-col h-full">
      <Navbar isCrossed={isCrossed}/>
      <main ref={appRef} className={`flex-grow ${location.pathname==='/search'?'mt-12 md:mt-[4.6rem] lg:mt-20':"mt-20 md:mt-24 lg:mt-24 "} `}>
        <Outlet context={{setIsCrossed}}/>
      </main>
      {activeFor==='Edit' && <EditPost/>}
      {activeFor==='Show'&& <Post/>}
      {activeFor==='likes'&& <Liked likes={likes} cancelFunction={()=>{
        setCurrentPost({
          type:ACTIONS.CLEAR
        })
      }}/>}
    </div>
    </>
  );
}
