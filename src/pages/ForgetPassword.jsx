import Background from "../components/Background";
import Geemble from "../assets/Geemble.png";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  const [error, setError] = useState(false);
  const [data, setData] = useState({ email: "" });

  function handleOnBlur({ target }) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (target.value === "") {
      setError(false);
      setData({ email: target.value });
      return;
    }
    if (regex.test(target.value)) {
      setError(false);
      setData({ email: target.value });
    } else {
      setError(false);
      setTimeout(() => {
        setError(true);
      }, 10);
    }
  }

  function handleOnSumbit(e) {
    e.preventDefault();
    //do something
  }

  return (
    <div>
      <div className="flex justify-center items-center h-screen w-screen z-50">
        <main className="flex flex-col md:flex-row h-4/5 items-center gap-6 md:gap-16 w-full justify-start md:justify-center">
          <section
            id="hero"
            className="flex flex-col w-4/5 md:w-1/4 gap-5 justify-center items-center"
          >
            <img src={Geemble} alt="" className="w-3/4" />
            <h2 className="text-white text-center  whitespace-normal">
              Seems like something lost!! But wait we gotta your back
            </h2>
          </section>
          <div className="md:w-[1px] md:h-4/5 bg-[#e4e3e3] z-50"></div>
          <section
            id="login"
            className="h-[70%] md:h-full w-10/12  md:w-1/3 bg-[#dbdbdb85] backdrop-blur-3xl rounded-xl flex flex-col justify-center p-6 md:p-8 gap-8 items-center"
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
                    error ? "shake-danger" : ""
                  }  ${error ? "border-2  border-red-500" : ""}`}
                />
                <span
                  className={`text-red-600 w-full text-left text-base ${
                    error ? "visible" : "invisible"
                  }`}
                >
                  email is invalid
                </span>
              </label>

              <Button type="submit">Verify</Button>
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
