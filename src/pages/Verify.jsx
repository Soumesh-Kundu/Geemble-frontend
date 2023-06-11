import Background from "../components/Background";
import { useLocation,useNavigate } from "react-router-dom";
import Geemble from "../assets/Geemble.png";
import { useState, useRef, useEffect } from "react";
import Button from "../components/Button";
import { resend as resendAuth,verify as verifyAuth } from "../api/auth";
import { resend as resendUser,verify as verifyUser } from "../api/user";
import {useMutation} from '@tanstack/react-query'
import Loader from "../components/Loader";
import { useAlertAtom,ACTIONS } from "../store/AlertStore";

const resendMap=new Map([
  ['/verify/user',resendUser],
  ['/verify',resendAuth]
])
const verifyMap=new Map([
  ['/verify/user',verifyUser],
  ['/verify',verifyAuth]
])

let currentIndex=0

export default function Verify() {
  const { pathname,state } = useLocation();
  const navigate=useNavigate()
  const {redirect, email } = state ?? {};
  const [,setAlert]=useAlertAtom()
  // console.log(verifyMap.get(pathname))
  const inputRef=useRef()
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeIndex,setActiveIndex]=useState()
  const [countDown, setCountDown] = useState(60)
  const {isLoading,mutate}=useMutation({
    mutationFn:verifyMap.get(pathname),
    onError:({response})=>{
      if (response === undefined) {
        setAlert({
          type: ACTIONS.SET_ALERT,
          payload: {
            messege: "Oops! Server is Down, Sorry for inconvinence",
            alertType: "error",
          },
        });
        return;
      }
      if(response.status===408){
        setAlert({
          type: ACTIONS.SET_ALERT,
          payload: {
            messege: "OTP has expired",
            alertType: "error",
          },
        })
      }
      if(response.status===400 || response.status===401){
        setAlert({
          type: ACTIONS.SET_ALERT,
          payload: {
            messege: "OTP is Invalid",
            alertType: "error",
          },
        })
      }
      if (response.status === 500) {
        setAlert({
          type: ACTIONS.SET_ALERT,
          payload: {
            messege: "Oops! Some error has occured, Sorry for inconvinence",
            alertType: "error",
          },
        });
        return;
      }
    },
    onSuccess:(data)=>{
      if(data.status===200){
        sessionStorage.removeItem('sessionToken')
        if(pathname==='/verify'){
          localStorage.setItem('authToken',data.data.authToken)
        }
        navigate(redirect,{replace:true})
      }
    }
  })

  function handleOnChange({target}) {
    const value=target.value.slice(target.value.length-1)
    if (value >= 0 && value <= 9) {
      const newOTP=[...otp]
      newOTP[currentIndex]=value
      value?setActiveIndex(currentIndex+1):setActiveIndex(currentIndex-1)
      setOtp(newOTP)
    }
  }

  function handleKeyDown({key},index){
    currentIndex=index
    if(key==='Backspace') setActiveIndex(index-1)
  }
  async function handleResend(){
    await resendMap.get(pathname)()
  }
  useEffect(()=>{
    const time = setInterval(() => {
        setCountDown((prev=>
          {if(prev>0) return prev-1 
            return prev
          }))
    }, 1000);
    return ()=>{
      clearInterval(time)
    }
  },[])
  useEffect(() => {
      inputRef.current?.focus()
  }, [activeIndex])
  
  function handleOnSubmit(e) {
    e.preventDefault()
    mutate({
      token:otp.join("")
    })
  }
  return (
    <section className="w-full h-full">
      <div
        id="verfiy"
        className="flex flex-col justify-start items-center h-full
      w-full gap-10 pt-28 lg:pt-20 px-3 "
      >
        <div className="flex w-full  lg:w-1/2 flex-col items-center gap-8">
          <img src={Geemble} alt="" className="w-3/5 md:w-2/5" />
          <h2 className="text-white text-lg">
            Be patient!... just a last check
          </h2>
        </div>
        <section
          id="OTP"
          className="w-full md:w-3/4 lg:w-1/2 bg-[#c7c7c74f] backdrop-blur-3xl p-6 rounded-lg flex flex-col items-center gap-10 "
        >
          <h2 className="text-lg text-white">
            An One Time password has been sent to{" "}
            <span className="text-xl text-[#0E5FC0]">
              {email!==undefined ? email : "abc@gmail.com"}
            </span>, 
          please kindly check your email
          </h2>
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col items-center w-full gap-8"
          >
            <label className="flex gap-3 md:gap-5 w-full justify-center">
              {otp.map((value, index) => (
                <input
                  type="number"
                  key={index}
                  ref={index===activeIndex?inputRef:null}
                  value={value}
                
                  className="h-10 md:h-12 w-10 md:w-12 rounded-xl text-center text-gray-500 focus:text-black caret-transparent  outline-none outline-0 focus:outline-2 outline-gray-600 cursor-pointer no-apperence"
                  onChange={handleOnChange}
                  onKeyDown={(e)=>{handleKeyDown(e,index)}}
                />
              ))}
            </label>
            {countDown>=1?<span className="text-[#0e5fc0] text-lg">Resend Code in {countDown}s </span>:<button type='button' onClick={handleResend} className="ml-2 text-[#0e5fc0] font-semibold text-lg">RESEND CODE</button>}
            <Button type="submit" condition={isLoading}>{isLoading?<Loader/>:'Send'}</Button>
          </form>
        </section>
      </div>
      <Background />
    </section>
  );
}
