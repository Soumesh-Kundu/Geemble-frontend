import Geemble from "../assets/Geemble.png";
import Button from "../components/Button";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Background from "../components/Background";

export default function NewPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [passwords, setPassword] = useState({ password: "", cPass: "" });

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log("Hello2");
    if (error) {
      return;
    }
    if (!passwords.password.length || !passwords.cPass.length) {
      setEmpty(true);
    }
    console.log(passwords);
    //do some task
    navigate("/login", { replace: true });
  }

  return (
    <section className="w-full h-full">
      <div
        id="verfiy"
        className="flex flex-col justify-start items-center h-full
    w-full gap-10 pt-28 lg:pt-14 px-3 "
      >
        <div className="flex w-full  lg:w-1/2 flex-col items-center gap-4">
          <img src={Geemble} alt="" className="w-3/5 md:w-2/5" />
          <h2 className="text-white text-lg text-center ">
            now just change your password and you are good to go!!
            <br />
            <span className="text-xl">Have a nice day !!</span>
          </h2>
        </div>
        <section
          id="password"
          className="w-full md:w-3/5 lg:w-1/3  bg-[#c7c7c74f] backdrop-blur-3xl p-4 rounded-lg flex flex-col items-center gap-10 "
        >
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col items-center w-full gap-5"
          >
            <label
              htmlFor="password"
              className="flex flex-col text-[#0E5FC0] text-xl gap-2 relative w-full"
            >
              New password
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={({ target }) => {
                  setEmpty(false);
                  setError(false);
                  setPassword((prev) => ({
                    ...prev,
                    [target.name]: target.value,
                  }));
                }}
                onBlur={(e) => {
                  if (
                    passwords.cPass.length &&
                    passwords.cPass !== e.target.value
                  ) {
                    setError(false);
                    setTimeout(() => {
                      setError(true);
                    }, 100);
                    return;
                  }
                  setError(false);
                  return 
                }}
                className={`h-10 w-full bg-[#ffffff] rounded-lg outline-none px-3 text-lg text-black ${
                  error || empty ? "shake-danger border-2 border-red-500" : ""
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
              htmlFor="password"
              className="flex flex-col text-[#0E5FC0] text-xl gap-2 relative w-full mb-5"
            >
              Confirm password
              <input
                type={showPassword ? "text" : "password"}
                name="cPass"
                onChange={({ target }) => {
                  setEmpty(false);
                  setPassword((prev) => ({
                    ...prev,
                    [target.name]: target.value,
                  }));
                }}
                onBlur={() => {
                  console.log("hello 1");
                  if (
                    passwords.cPass.length &&
                    passwords.cPass !== passwords.password
                  ) {
                    setError(false);
                    setTimeout(() => {
                      setError(true);
                    }, 100);
                    return;
                  }
                  setError(false);
                }}
                className={`h-10 w-full bg-[#ffffff] rounded-lg outline-none px-3 text-lg text-black ${
                  error || empty ? "shake-danger border-2 border-red-500" : ""
                }`}
              />
              <span
                className={`text-red-500 text-base ${
                  error || empty ? "visible" : "invisible"
                }`}
              >
                {empty
                  ? "All fields needs to be filled"
                  : "Password should be matched"}
              </span>
              <button
                type="button"
                className="absolute right-3 top-[42%]"
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
            <Button type="submit">Confirm</Button>
          </form>
        </section>
      </div>
      <Background />
    </section>
  );
}
