import Background from "../components/Background";
import Geemble from "../assets/Geemble.png";
import male from "../assets/male.gif";
import female from "../assets/female.gif";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useState, useRef } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [valid, setValid] = useState(true);
  const [error, setError] = useState([]);
  const [data, setData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    gender:""
  });

  function handleOnBlur(e) {
    if (e.target.name === "email") {
      console.log("hello1");
      handleEmail(e.target.value);
      console.log("valid" + ":" + valid);
      console.log(error);
      return;
    }
    if (!error.includes(e.target.name)) {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      return;
    }
    if (data[e.target.name] !== e.target.value) {
      setError((prev) => prev.filter((item) => item !== e.target.name));
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      return;
    }
  }
  function handleEmail(value) {
    console.log("helloo");
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(regex.test(value));
    if (regex.test(value)) {
      setValid(true);
      setError((prev) => prev.filter((item) => item !== "email"));
    } else {
      setValid(false);
      setError((prev) => prev.filter((item) => item !== "email"));
      setTimeout(() => {
        setError((prev) => [...prev, "email"]);
      }, 100);
    }
  }

  function handleOnSumbit(e) {
    e.preventDefault();
    console.log(data);
    const random = Math.round(Math.random() * 2);
    console.log(random);
    if (random === 0) {
      setError((prev) => [...prev, "username"]);
    }
    if (random === 1) {
      setError((prev) => [...prev, "email"]);
    }
    if (random === 2) {
      setError(["email", "username"]);
    }
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen z-50">
        <main className="flex flex-col md:flex-row h-full items-center gap-6 md:gap-16 w-full justify-center">
          <section
            id="hero"
            className="flex flex-col w-4/5 md:w-1/4 gap-5 justify-center items-center"
          >
            <img src={Geemble} alt="" className="w-3/4" />
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
          <div className="md:w-[1px] md:h-3/5 bg-[#e4e3e3] z-50"></div>
          <section
            id="login"
            className="w-10/12  md:w-1/3 bg-[#dbdbdb85] backdrop-blur-3xl rounded-xl grid place-items-center py-4 px-6 gap-0 "
          >
            <form
              onSubmit={handleOnSumbit}
              className="w-full flex flex-col items-center mb-5"
            >
              <label
                htmlFor="username"
                className="flex flex-col text-xl w-full text-[#0E5FC0] gap-2 mb-5"
              >
                Name
                <input
                  type="text"
                  id="name"
                  name="name"
                  onBlur={handleOnBlur}
                  className="h-10 w-full bg-[#ffffff] rounded-lg outline-none px-3 text-lg text-black"
                />
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
                  className={`h-10 w-full bg-[#ffffff] rounded-lg outline-none px-3 text-lg text-black ${
                    error.includes("username") ? "shake-danger" : ""
                  }  ${
                    error.includes("username") ? "border-2  border-red-500" : ""
                  }`}
                />
                <span
                  className={`text-red-600 w-full text-left text-base ${
                    error.includes("username") ? "visible" : "invisible"
                  }`}
                >
                  username is already taken
                </span>
              </label>
              <label
                htmlFor="email"
                className="flex flex-col text-xl w-full text-[#0E5FC0] gap-2 0"
              >
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  onBlur={handleOnBlur}
                  className={`h-10 w-full bg-[#ffffff] rounded-lg outline-none px-3 text-lg text-black ${
                    error.includes("email") ? "shake-danger" : ""
                  }  ${
                    error.includes("email") ? "border-2  border-red-500" : ""
                  }`}
                />
                <span
                  className={`text-red-600 w-full text-left text-base ${
                    error.includes("email") ? "visible" : "invisible"
                  }`}
                >
                  {valid ? "this user already exists" : "email is invalid"}
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
                  className="h-10 w-full bg-[#ffffff] rounded-lg outline-none px-3 text-lg text-black"
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
              <div className="flex gap-10 mb-2 w-full justify-center">
                <label htmlFor="male" className="flex gap-1 items-center">
                  <input type="radio" name="gender" id="male" value="male" className="radio" onChange={
                    (e)=>{
                      setData((prev)=>({...prev,gender:e.target.value}))
                    }
                  }/>
                  <img src={male} alt="" className="h-10 w-10" />
                </label>
                <label htmlFor="female" className="flex gap-1 items-center">
                  <input type="radio" name="gender" id="female" value="female" className="radio" onChange={
                    (e)=>{
                      setData((prev)=>({...prev,gender:e.target.value}))
                    }
                  }/>
                  <img src={female} alt="" className="h-10 w-10" />
                </label>
              </div>
              <Button type="submit">Sign In</Button>
            </form>
            <div className="h-[2px] w-full bg-white z-50"></div>
            <span className="text-lg">
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
