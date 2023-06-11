import Background from "../components/Background";
import Geemble from "../assets/Geemble.png";
import { useState} from "react";
import Button from "../components/Button";
import { Link,useNavigate } from "react-router-dom";
import {useMutation} from '@tanstack/react-query'
import {forgetpassword} from '../api/auth'
import { ACTIONS, useAlertAtom } from "../store/AlertStore";
import Loader from "../components/Loader";

export default function ForgetPassword() {
  const [error, setError] = useState({
    has:false,
    message:"asdf"
  });
  const [data, setData] = useState({ email: "" });
  const [, setAlert] = useAlertAtom();
  const navigate=useNavigate()
  const {isLoading,mutate}=useMutation({
    mutationFn:forgetpassword,
    onError:(error)=>{
        if (error.response === undefined) {
          setAlert({
            type: ACTIONS.SET_ALERT,
            payload: {
              messege: "Oops! Server is Down, Sorry for inconvinence",
              alertType: "error",
            },
          });
          return;
        }
        if (error.response.status === 401) {
          console.log("hello")
          setError((prev)=>({...prev,has:false}));
          setError((prev)=>({...prev,has:true,message:"user doesn't exists"}));
          return 
        }
        if (error.response.status === 500) {
          setAlert({
            type: ACTIONS.SET_ALERT,
            payload: {
              messege: "Oops! Some error has occured, Sorry for inconvinence",
              alertType: "error",
            },
          });
          setError((prev)=>({...prev,has:false}));
          return;
        }
    },
    onSuccess:(res)=>{
      if(res.status===200 && res.data.success){
        sessionStorage.setItem('sessionToken',res.data.OTPtoken)
        navigate('/verify',{state:{email:data.email,redirect:'/newpassword'},replace:true})
        return
      }
    }
  })

  function handleOnBlur({ target }) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (target.value === "") {
      setError((prev)=>({...prev,has:false}));
      setData({ email: target.value });
      return;
    }
    if (regex.test(target.value)) {
      setError((prev)=>({...prev,has:false}));
      setData({ email: target.value });
    } else {
      setError((prev)=>({...prev,has:false}));
      setTimeout(() => {
        setError((prev)=>({...prev,has:true,message:"Email is invalid"}));
      }, 10);
    }
  }

  function handleOnSumbit(e) {
    e.preventDefault();
    if(error.has){
      setError((prev)=>({...prev,has:false}));
      setTimeout(() => {
        setError((prev)=>({...prev,has:true}));
      }, 5);
      return 
    }
    mutate(data)
  }

  return (
    <div>
      <div className="flex justify-center items-center h-screen w-screen z-50">
        <main className="flex flex-col lg:flex-row h-4/5 items-center gap-6 lg:gap-16 w-full justify-start lg:justify-center">
          <section
            id="hero"
            className="flex flex-col w-4/5 md:w-2/5 lg:w-1/3 gap-5 justify-center items-center "
          >
            <img src={Geemble} alt="" className="w-3/4 lg:w-3/5" />
            <h2 className="text-white text-center  whitespace-normal">
              Seems like something lost!! But wait we gotta your back
            </h2>
          </section>
          <div className="md:w-[1px] lg:h-4/5 bg-[#e4e3e3] z-50"></div>
          <section
            id="login"
            className="h-[70%] md:h-3/6 lg:h-3/4 w-11/12 md:w-6/12 lg:w-1/3 bg-[#dbdbdb85] backdrop-blur-3xl rounded-xl flex flex-col justify-center p-6 md:p-8 gap-8 items-center"
          >
            <h2 className="text-white text-xl whitespace-normal">
              <span className="text-3xl text-[#0E5FC0]">We </span>
              just need to be sure that its you{" "}
            </h2>
            <form
              onSubmit={handleOnSumbit}
              className="w-full  flex flex-col items-center gap-0"
            >
              <label
                htmlFor="username"
                className="flex flex-col text-xl w-full text-[#0E5FC0] gap-3"
              >
                Enter Your Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  onBlur={handleOnBlur}
                  className={`h-10 w-full bg-[#ffffff] rounded-lg outline-none px-3 text-lg text-black ${
                    error.has ? "shake-danger" : ""
                  }  ${error.has ? "border-2  border-red-500" : ""}`}
                />
                <span
                  className={`text-red-600 w-full text-left text-base ${
                    error.has ? "visible" : "invisible"
                  }`}
                >
                  {error.message}
                </span>
              </label>

              <Button type="submit" condition={isLoading}>{isLoading?<Loader/>:'Verify'}</Button>
            </form>
            <div className="h-[2px] w-full bg-white z-50"></div>
            <span className="text-lg">
              remember?{" "}
              <Link to="/login" className="text-[#0E5FC0] underline">
                login
              </Link>{" "}
            </span>
          </section>
        </main>
      </div>
      <Background />
    </div>
  );
}
