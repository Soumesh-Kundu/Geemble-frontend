import Background from "../components/Background";
import Geemble from "../assets/Geemble.png";
import male from "../assets/male.gif";
import female from "../assets/female.gif";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import {useMutation} from '@tanstack/react-query'
import Button from "../components/Button";
import { Link,useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { useAlertAtom,ACTIONS } from "../store/AlertStore";
import Loader from "../components/Loader";
 
export default function Register() {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [valid, setValid] = useState({
    email: true,
    name: true,
    username: true,
  });
  const [,setAlert]=useAlertAtom()
  const {isLoading,mutate}=useMutation({
    mutationFn:register,
    onError: ({response}) => {
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
      console.log(response)
      if (response.status === 400 && response.data.email ) {
        setError(prev=>([...prev,{name:'email',msg:""}]))
        return 
      }
      if (response.status === 400 && response.data.username ) {
        setError(prev=>([...prev,{name:'username',msg:""}]))
        return 
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
    onSuccess: (response) => {
      console.log(response)
      if (response.status === 201) {
        localStorage.setItem("authToken", response.data.authToken);
        sessionStorage.setItem('sessionToken',response.data.OTPtoken)
        navigate("/verify/user",{state:{
          redirect:'/',
          email:data.email
        },replace:true});
      }
    },
  })

  const [error, setError] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    gender: "",
    cPassword:""
  });
  function handleOnChange() {
    setEmpty(false);
  }

  function handleOnBlur(e) {
    if (e.target.name === "email") {
      handleEmail(e.target.value);
    }
    if (e.target.name === "username") {
      checkUsername(e.target.value);
    }
    if (e.target.name === "name") {
      checkName(e.target.value);
    }
    if (e.target.name === "cPassword" || e.target.name==='password') {
      checkPass(e.target);
    }
    if (!error.includes(e.target.name)) {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      return;
    }
    if (data[e.target.name] !== e.target.value) {
      setError((prev) => prev.filter((item) => item.name !== e.target.name));
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      return;
    }
  }
  function checkPass({value,name}) {
    if(name==='password' && data.cPassword.length && data.cPassword!==value){
      setError((prev) => prev.filter((item) => item.name !== "password"));
      setTimeout(() => {
        setError((prev) => [
          ...prev,
          { name: "password", error: "" },
        ]);
      }, 100);
      return;
    }
    if (value.length && value !== data.password) {
      setError((prev) => prev.filter((item) => item.name !== "password"));
      setTimeout(() => {
        setError((prev) => [
          ...prev,
          { name: "password", error: "" },
        ]);
      }, 100);
      return;
    }
    setError((prev) => prev.filter((item) => item.name !== "password"));
    return;
  }
  function checkName(value) {
    const nameRegex = {
      firstChar: /^[A-Z]/,
      wholeName: /^[A-Z][a-z]+\s[A-Za-z]+\s?$/,
    };
    if (value.length < 1) {
      setError((prev) => prev.filter((item) => item.name !== "name"));
      return;
    }
    if (value.length < 5) {
      setValid((prev) => ({ ...prev, name: false }));
      setError((prev) => prev.filter((item) => item.name !== "name"));
      setTimeout(() => {
        setError((prev) => [
          ...prev,
          { name: "name", error: "can't be less than 5 character" },
        ]);
      }, 100);
      return;
    }
    if (!nameRegex.firstChar.test(value)) {
      setValid((prev) => ({ ...prev, name: false }));
      setError((prev) => prev.filter((item) => item.name !== "name"));
      setTimeout(() => {
        setError((prev) => [
          ...prev,
          { name: "name", error: "Should be start with capital" },
        ]);
      }, 100);
    }
    if (!nameRegex.wholeName.test(value)) {
      setValid((prev) => ({ ...prev, name: false }));
      setError((prev) => prev.filter((item) => item.name !== "name"));
      setTimeout(() => {
        setError((prev) => [
          ...prev,
          {
            name: "name",
            error: "Should only contain letters and one whitespace between",
          },
        ]);
      }, 100);
    } else {
      setValid((prev) => ({ ...prev, name: true }));
      setError((prev) => prev.filter((item) => item.name !== "name"));
    }
  }

  function checkUsername(value) {
    const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{5,13}$/;
    if (value.length < 1) {
      setError((prev) => prev.filter((item) => item.name !== "username"));
      return;
    }
    if (value.length < 5) {
      setValid((prev) => ({ ...prev, username: false }));
      setError((prev) => prev.filter((item) => item.name !== "username"));
      setTimeout(() => {
        setError((prev) => [
          ...prev,
          { name: "username", error: "can't be less than 5 character" },
        ]);
      }, 100);
      return;
    }
    if(value.length>13){
      setValid((prev) => ({ ...prev, username: false }));
      setError((prev) => prev.filter((item) => item.name !== "username"));
      setTimeout(() => {
        setError((prev) => [
          ...prev,
          { name: "username", error: "can't be more than 13 character" },
        ]);
      }, 100);
      return;
    }
    if (!usernameRegex.test(value)) {
      setValid((prev) => ({ ...prev, username: false }));
      setError((prev) => prev.filter((item) => item.name !== "username"));
      setTimeout(() => {
        setError((prev) => [
          ...prev,
          {
            name: "username",
            error: "Username only contain letter,number and underscore(_)",
          },
        ]);
      }, 100);
    } else {
      setValid((prev) => ({ ...prev, username: true }));
      setError((prev) => prev.filter((item) => item.name !== "username"));
    }
  }
  function handleEmail(value) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.length < 1) {
      setError((prev) => prev.filter((item) => item.name !== "email"));
      return;
    }
    if (regex.test(value) || !value.length) {
      setValid((prev) => ({ ...prev, email: true }));
      setError((prev) => prev.filter((item) => item.name !== "email"));
    } else {
      setValid((prev) => ({ ...prev, email: false }));
      setError((prev) => prev.filter((item) => item.name !== "email"));
      setTimeout(() => {
        setError((prev) => [
          ...prev,
          { name: "email", error: "Email is not valid" },
        ]);
      }, 100);
    }
  }

  function handleOnSumbit(e) {
    e.preventDefault();
   
    if (
      !(
        data.name &&
        data.email &&
        data.password &&
        data.username &&
        data.gender
      )
    ) {
      setEmpty(true);
      return;
    }
    if (!(valid.email && valid.name && valid.username)) {
      return;
    }
    mutate(data)
    // navigate('/verify/user',{state:{email:data.email,redirect:'/'},replace:true})
  }
  return (
    <>
      <div  className="flex justify-center items-start h-auto w-screen z-50  ">
        <main className="flex flex-col  items-center my-8 px-5 lg:p-0  gap-4 overflow-auto md:gap-6 w-full justify-center h-auto" >
          <section
            id="hero"
            className="flex flex-col w-4/5 md:w-2/5 lg:w-1/3 gap-5 justify-center items-center  "
          >
            <img src={Geemble} alt="" className="w-3/4 lg:w-3/5" />
            <h2
              className="text-white text-center text-sm "
              style={{
                wordWrap: "break-word",
              }}
            >
              a way to connect with the world and share your experince and
              memories
            </h2>
          </section>
          <section
            id="login"
            className="w-full lg:my-2 md:w-3/5 lg:w-1/3 bg-[#dbdbdb85] backdrop-blur-3xl rounded-xl grid place-items-center py-4 px-6 gap-0 min-h-screen"
          >
            <form
              onSubmit={handleOnSumbit}
              className="w-full flex flex-col items-center mb-5"
            >
              <label
                htmlFor="name"
                className="flex flex-col text-xl w-full text-[#0E5FC0] gap-2 "
              >
                Name
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. Alax marcer"
                  onBlur={handleOnBlur}
                  onChange={handleOnChange}
                  spellCheck={false}
                  className={`h-10 w-full bg-[#ffffff] rounded-lg outline-none px-3 text-lg text-black
                  ${
                    error.find((item) => item.name === "name")
                      ? "shake-danger border-2  border-red-500"
                      : ""
                  } 
                  `}
                />
                <span
                  className={`text-red-600 w-full text-left text-base ${
                    error.find((item) => item.name === "name")
                      ? "visible"
                      : "invisible"
                  }`}
                >
                  {valid.name
                    ? "all okk"
                    : "" + error.find((item) => item.name === "name")?.error}
                </span>
              </label>
              <label
                htmlFor="username"
                className="flex flex-col text-xl w-full text-[#0E5FC0] gap-2"
              >
                @username
                <input
                  type="text"
                  id="username"
                  name="username"
                  onBlur={handleOnBlur}
                  onChange={handleOnChange}
                  spellCheck={false}
                  placeholder="e.g. AlaxMarcer09"
                  className={`h-10 w-full bg-[#ffffff] rounded-lg outline-none px-3 text-lg text-black ${
                    error.find((item) => item.name === "username")
                      ? "shake-danger border-2  border-red-500"
                      : ""
                  }  `}
                />
                <span
                  className={`text-red-600 w-full text-left text-base ${
                    error.find((item) => item.name === "username")
                      ? "visible"
                      : "invisible"
                  }`}
                >
                  {valid.username
                    ? "username has already taken"
                    : "" +
                      error.find((item) => item.name === "username")?.error}
                </span>
              </label>
              <label
                htmlFor="email"
                className="flex flex-col text-xl w-full text-[#0E5FC0] gap-2 "
              >
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  onBlur={handleOnBlur}
                  onChange={handleOnChange}
                  spellCheck={false}
                  placeholder="e.g. alexMarcer09@gamil.com"
                  className={`h-10 w-full bg-[#ffffff] rounded-lg outline-none px-3 text-lg text-black ${
                    error.find((item) => item.name === "email")
                      ? "shake-danger border-2 border-red-500"
                      : ""
                  }`}
                />
                <span
                  className={`text-red-600 w-full text-left text-base ${
                    error.find((item) => item.name === "email")
                      ? "visible"
                      : "invisible"
                  }`}
                >
                  {valid.email
                    ? "this user already exists"
                    : "" + error.find((item) => item.name === "email")?.error}
                </span>
              </label>
              <label
                htmlFor="password"
                className="flex flex-col text-[#0E5FC0] text-xl gap-2 relative w-full mb-5"
              >
                password
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onBlur={handleOnBlur}
                  placeholder="•••••••••"
                  id="password"
                  onChange={() => {
                    setError((prev) =>
                      prev.filter((item) => item.name !== "password")
                    );
                    handleOnChange();
                  }}
                  spellCheck={false}
                  className={`h-10 w-full bg-[#ffffff] rounded-lg outline-none px-3 text-lg text-black  ${
                    error.find((item) => item.name === "password")
                      ? "shake-danger border-2 border-red-500"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 bottom-[10px]"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <span>
                      <AiFillEye />
                    </span>
                  ) : (
                    <span>
                      <AiFillEyeInvisible />
                    </span>
                  )}
                </button>
              </label>
              <label
                htmlFor="cPassword"
                className="flex flex-col text-[#0E5FC0] text-xl gap-2 relative w-full mb-5"
              >
                Confirm password
                <input
                  type={showPassword ? "text" : "password"}
                  name="cPassword"
                  id="cPassword"
                  onBlur={handleOnBlur}
                  spellCheck={false}
                  className={`h-10 w-full bg-[#ffffff] rounded-lg outline-none px-3 text-lg text-black ${
                    error.find((item) => item.name === "password")
                      ? "shake-danger border-2 border-red-500"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-[46px]"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <span>
                      <AiFillEye />
                    </span>
                  ) : (
                    <span>
                      <AiFillEyeInvisible />
                    </span>
                  )}
                </button>
                <span
                  className={`text-red-600 w-full text-left text-base ${
                    error.find((item) => item.name === "password")
                      ? "visible"
                      : "invisible"
                  }`}
                >
                  Password shoud be matched 
                </span>
              </label>
              <div className="flex gap-10 mb-2 w-full justify-center">
                <label htmlFor="male" className="flex gap-1 items-center">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    className="radio"
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, gender: e.target.value }));
                    }}
                  />
                  <img src={male} alt="" className="h-10 w-10" />
                </label>
                <label htmlFor="female" className="flex gap-1 items-center">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    className="radio"
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, gender: e.target.value }));
                    }}
                  />
                  <img src={female} alt="" className="h-10 w-10" />
                </label>
              </div>
              <span
                className={`text-red-600 w-full text-left text-base my-2 ${
                  empty ? "visible" : "invisible"
                }`}
              >
                All fields needs to be filled
              </span>
              <Button type="submit" condition={isLoading}>{isLoading?<Loader/>:"Sign In"}</Button>
            </form>
            <div className="h-[2px] w-full bg-white z-50"></div>
            <span className="text-lg mt-2">
              already been here?{" "}
              <Link to="/login" className="text-[#0E5FC0] underline">
                login
              </Link>{" "}
            </span>
          </section>
        </main>
      </div>
      <Background />
    </>
  );
}
