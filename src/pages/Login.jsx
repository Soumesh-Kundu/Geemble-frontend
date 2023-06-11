import Background from "../components/Background";
import Geemble from "../assets/Geemble.png";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { ACTIONS, useAlertAtom } from "../store/AlertStore";
import Loader from "../components/Loader";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [, setAlert] = useAlertAtom();
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });
  const { isLoading, mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
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
      if (error.response.status === 400) {
        setError(false);
        setError(true);
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
        return;
      }
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        localStorage.setItem("authToken", data.data.authToken);
        navigate("/",{replace:true});
        setAlert({
          type:ACTIONS.SET_ALERT,
          payload:{
            messege:"Welcome!! 🎉🎉",
            alertType:'success'
          }
        })
      }
    },
  });
  const welcomeTexts = [
    "Hey! everyone is missing you",
    "Hello, fast!! everyone is wating",
    "Peww! nice to get you back",
  ];
  let [WelcomeText, setWelcomeText] = useState("");

  function handleOnChange(e) {
    setError(false);
    setEmpty(false)
    setData(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  function handleOnSumbit(e) {
    e.preventDefault();
    if(!data.username.length || !data.password.length)
    {
      setEmpty(true)
      return 
    }
    mutate(data);
  }

  useEffect(() => {
    let random = Math.round(Math.random() * (welcomeTexts.length - 1));
    setWelcomeText(welcomeTexts[random]);
  }, []);
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen z-50 overflow-y-hidden">
        <main className="flex flex-col lg:flex-row h-4/5 items-center gap-6 lg:gap-16 w-full justify-start lg:justify-center">
          <section
            id="hero"
            className="flex flex-col w-4/5 md:w-2/5 lg:w-1/3 gap-2 justify-center items-center"
          >
            <img src={Geemble} alt="" className="w-3/4 lg:w-3/5" />
            <h2 className="text-white text-center  whitespace-normal">
              {`${WelcomeText}`}
            </h2>
          </section>
          <div className="md:w-[1px]  lg:h-4/5 bg-[#e4e3e3] z-50"></div>
          <section
            id="login"
            className="h-[70%] md:h-4/6 lg:h-full w-10/12 md:w-6/12 lg:w-1/3 bg-[#dbdbdb85] backdrop-blur-3xl rounded-xl grid place-items-center md:items-center px-6 py-2 md:p-8"
          >
            <form
              onSubmit={handleOnSumbit}
              className="w-full flex flex-col items-center"
            >
              <span
                className={`text-red-600 w-full text-left ${
                  error || empty ? "visible" : "invisible"
                }`}
              >
                {empty?'Something left to be filled':'username or password is invalid'}
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
                  placeholder="e.g. Alex Marcer"
                  onChange={handleOnChange}
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
                  onChange={handleOnChange}
                  placeholder="*******"
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
              <Button type="submit" condition={isLoading}>
                {isLoading?<Loader />:"Log In"}
              </Button>
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
              <Link to="/register" replace className="text-[#0E5FC0] underline">
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
