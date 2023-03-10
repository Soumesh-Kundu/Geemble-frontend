import Background from "../components/Background";
import { useLocation,useNavigate } from "react-router-dom";
import Geemble from "../assets/Geemble.png";
import { useState, useRef, useEffect } from "react";
import Button from "../components/Button";

let currentIndex=0
export default function Verify() {
  const { state } = useLocation();
  const navigate=useNavigate()
  const { email } = state;
  const inputRef=useRef()
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeIndex,setActiveIndex]=useState()
  const [countDown, setCountDown] = useState(60)


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
    console.log(otp.join(""))
    navigate('/newpassword',{replace:true})
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
              {email ? email : "abc@gmail.com"}
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
            <span className="text-[#0e5fc0]">OTP will be valid for {countDown}s </span>
            <Button type="submit">Send</Button>
          </form>
        </section>
      </div>
      <Background />
    </section>
  );
}
