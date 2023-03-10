import Navbar from "../components/Navbar";
import Liked from "../components/Liked";
import { Outlet,useLocation } from "react-router-dom";
import { useState,useRef,useEffect } from "react";
import {EditPost,Post} from "./";
import { usePostAtom,ACTIONS } from "../store/CurrentPost";


export default function Home() {
  const  [isCrossed,setIsCrossed]=useState(false)
  const [{activeFor,likes},setCurrentPost]=usePostAtom()

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
    window.addEventListener("scroll", changeNavbarColor, true);
    return () => {
      window.removeEventListener("scroll", changeNavbarColor);
    };
  }, []);


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
