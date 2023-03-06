import Background from "../components/Background";
import Geemble from "../assets/Geemble.png";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({ username: "", password: "" });
  const welcomeTexts = [
    "Hey! everyone is missing you",
    "Hello, fast!! everyone is wating",
    "Peww! nice to get you back",
  ];
  let [WelcomeText, setWelcomeText] = useState("");

  function handleOnBlur(e) {
    if (!error) {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      return;
    }
    if (data[e.target.name] !== e.target.value) {
      setError(false);
      setData((prev) => ({ ...prev, [e.target]: e.target.value }));
      return;
    }
  }

  function handleOnSumbit(e) {
    e.preventDefault();
    setError(true);
  }

  useEffect(() => {
    let random = Math.round(Math.random() * (welcomeTexts.length - 1));
    setWelcomeText(welcomeTexts[random]);
  }, []);
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen z-50 overflow-y-hidden">
        <main className="flex flex-col md:flex-row h-4/5 items-center gap-6 md:gap-16 w-full justify-start md:justify-center">
          <section
            id="hero"
            className="flex flex-col w-4/5 md:w-1/4 gap-5 justify-center items-center"
          >
            <img src={Geemble} alt="" className="w-3/4" />
            <h2 className="text-white text-center  whitespace-normal">
              {`${WelcomeText}`}
            </h2>
          </section>
          <div className="md:w-[1px] md:h-4/5 bg-[#e4e3e3] z-50"></div>
          <section
            id="login"
            className="h-[70%] md:h-full w-10/12  md:w-1/3 bg-[#dbdbdb85] backdrop-blur-3xl rounded-xl grid place-items-center md:items-center px-6 py-2 md:p-8"
          >
            <form
              onSubmit={handleOnSumbit}
              className="w-full flex flex-col items-center"
            >
              <span
                className={`text-red-600 w-full text-left ${
                  error ? "visible" : "invisible"
                }`}
              >
                username or password is invalid
              </span>
              <label
                htmlFor="username"
                className="flex flex-col text-xl w-full text-[#0E5FC0] gap-3 mb-10"
              >
                @username
                <input
                  type="text"
                  id="username"
                  name="username"
                  onBlur={handleOnBlur}
                  className={`h-10 w-full bg-[#ffffff] rounded-lg outline-none px-3 text-lg text-black ${
                    error ? "shake-danger" : ""
                  }  ${error ? "border-2  border-red-500" : ""}`}
                />
              </label>
              <label
                htmlFor="password"
                className="flex flex-col text-[#0E5FC0] text-xl gap-3 relative w-full mb-10 md:mb-10"
              >
                password
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onBlur={handleOnBlur}
                  className={`h-10 w-full bg-[#ffffff] rounded-lg outline-none px-3 text-lg text-black ${
                    error ? "shake-danger" : ""
                  }  ${error ? "border-2  border-red-500" : ""}`}
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
              <Button type="submit">Log In</Button>
            </form>
            <Link
              to="/forgetpassword"
              className="text-[#0E5FC0] underline text-lg"
            >
              forget password?
            </Link>
            <div className="h-[2px] w-full bg-white z-50"></div>
            <span className="text-lg">
              New here?{" "}
              <Link to="/register" className="text-[#0E5FC0] underline">
                Sign In
              </Link>{" "}
            </span>
          </section>
        </main>
      </div>
      <Background />
    </>
  );
}
