import { useState, useRef,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Container } from "../layouts";
import { useAuthorAtom } from "../store/Authstore";
import { AiFillEdit } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineCamera } from "react-icons/hi";
import { useDailogAtom, ACTIONS } from "../store/DailogStore";
import { RxCross1 } from "react-icons/rx";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import NotFound from "./NotFound";

function ChangeProfilePic({ handleCancel }) {
  const [_, setDailog] = useDailogAtom();
  const [profilePic, setProfilePic] = useState("");
  const fileRef = useRef();
  function handleFileChange(e) {
    if (e.target.files.length === 0) {
      return;
    }

    const imageURL = URL.createObjectURL(e.target.files[0]);
    setProfilePic(imageURL);
  }
  return (
    <>
      <section className="h-screen w-screen grid place-items-center z-50 bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 p-4 ">
        <div className="bg-white  px-6 py-4 gap-5 w-full md:w-1/2 lg:w-1/3 h-8/12 items-start rounded-lg relative flex flex-col">
          <h2 className="text-[#0E5FC0] text-lg">
            Upload a good photo of yours
          </h2>
          <button
            type="button"
            onClick={() => {
              if (profilePic !== "") {
                setDailog({
                  type: ACTIONS.SET_DAILOG,
                  payload: {
                    messege: "Discard changes ?",
                    isNotConfirmed: true,
                    handleOnYes: () => {
                      handleCancel(false);
                    },
                  },
                });
                return 
              }
              handleCancel(false)
            }}
            className="absolute top-4 right-4 text-lg rounded-full bg-slate-300 lg:bg-transparent hover:bg-slate-300 h-8 w-8 grid place-items-center"
          >
            <RxCross1 />
          </button>
          <form
            className={`flex items-center justify-center min-h-[10rem] w-full object-cover  relative bg-cover bg-center ${
              profilePic === "" ? "border" : "0"
            } border-[rgba(0,0,0,0.5)] rounded-lg`}
          >
            <img
              src={`${profilePic}`}
              className="rounded-xl min-h-[5rem] max-h-[25rem]"
            />
            {profilePic === "" && (
              <label
                htmlFor="postimage"
                className=" absolute cursor-pointer bg-gray-300 px-4 py-3 rounded-lg"
              >
                Upload
              </label>
            )}
            <input
              ref={fileRef}
              type="file"
              name="uploadImage"
              id="postimage"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            {profilePic && (
              <button
                type="button"
                className="absolute right-2 top-2 p-2 bg-gray-500 text-gray-300 hover:bg-slate-500  duration-300 rounded-full"
                onClick={() => {
                  fileRef.current.value = "";
                  setProfilePic("");
                }}
              >
                <RxCross1 />
              </button>
            )}
          </form>
          <button
            type="submit"
            className="w-full bg-[#0E5FC0] text-white p-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </section>
    </>
  );
}

function NewPassword({ passwords, setPasswords }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  function handleOnBlur() {
    if (
      passwords.cPassword.length &&
      passwords.cPassword !== passwords.password
    ) {
      setError(false);
      setTimeout(() => {
        setError(true);
      }, 100);
      return;
    }
    setError(false);
  }
  function handleOnClick() {
    if (error) {
      return;
    }
    if (!passwords.cPassword.length || !passwords.password.length) {
      setEmpty(true);
    }
    console.log(passwords);
  }
  return (
    <>
      <label
        htmlFor="pass"
        className="text-[#0E5FC0] text-xl flex flex-col gap-3 w-full relative"
      >
        New Password
        <input
          id="pass"
          name="password"
          type={showPassword ? "text" : "password"}
          value={passwords.password}
          className={`bg-[#e7e7e7] outline-none h-8 p-4  rounded-lg text-black text-base ${
            error || empty ? "shake-danger border-2 border-red-500" : ""
          }`}
          onChange={(e) => {
            setEmpty(false);
            setError(false);
            setPasswords(e);
          }}
        />
        <button
          type="button"
          className="absolute bottom-2 translate-y-[0%] right-3"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
        </button>
      </label>
      <label
        htmlFor="cpass"
        className="text-[#0E5FC0] text-xl flex flex-col gap-3 w-full relative"
      >
        Confirm password
        <input
          id="cpass"
          type={showPassword ? "text" : "password"}
          name="cPassword"
          value={passwords.cPassword}
          className={`bg-[#e7e7e7] outline-none h-8 p-4  rounded-lg text-black text-base ${
            error || empty ? "shake-danger border-2 border-red-500" : ""
          }`}
          onBlur={handleOnBlur}
          onChange={(e) => {
            setEmpty(false);
            setPasswords(e);
          }}
        />
        <button
          type="button"
          className="absolute bottom-[40%] translate-y-[10%] right-3"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
        </button>
        <span
          className={`text-red-500 text-base ${
            error || empty ? "visible" : "invisible"
          }`}
        >
          {empty
            ? "All fields needs to be filled"
            : "Password should be matched"}
        </span>
      </label>
      <Button type="button" onClick={handleOnClick}>
        Change
      </Button>
    </>
  );
}

function Verify({ password, setPassword, verifed, setVerifed }) {
  const [showPassword, setShowPassword] = useState(false);
  function handleOnClick() {
    if (!verifed) {
      let target = { name: "password", value: "" };
      setPassword({ target });
      setVerifed(true);
    }
  }
  return (
    <>
      <label
        htmlFor="pass"
        className="text-[#0E5FC0] text-xl flex flex-col gap-5 w-full relative"
      >
        Enter Your Password
        <input
          id="pass"
          type={showPassword ? "text" : "password"}
          name="password"
          value={password.password}
          placeholder="⁎⁎⁎⁎⁎⁎⁎⁎⁎"
          className="bg-[#e7e7e7] outline-none h-8 p-4  rounded-lg text-black text-base"
          onChange={setPassword}
        />
        <button
          type="button"
          className="absolute bottom-2 translate-y-[10%] right-3"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
        </button>
      </label>
      <Button type="Button" onClick={handleOnClick}>
        Verfiy
      </Button>
    </>
  );
}

function Password({ onCancel }) {
  const [_, setDailog] = useDailogAtom();
  const [verifed, setVerifed] = useState(false);
  const [passwords, setPasswords] = useState({
    password: "",
    cPassword: "",
  });

  function handleChange({ target }) {
    setPasswords((prev) => ({ ...prev, [target.name]: target.value }));
  }
  return (
    <section className="h-screen w-screen grid place-items-center z-50 bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 p-4 ">
      <form className="bg-white flex flex-col px-8 py-6 gap-5 w-full md:w-1/4 items-center rounded-lg relative">
        <button
          type="button"
          className="absolute top-4 right-4 text-lg rounded-full bg-slate-300 lg:bg-transparent hover:bg-slate-300 h-8 w-8 grid place-items-center"
          onClick={() => {
            if (verifed) {
              setDailog({
                type: ACTIONS.SET_DAILOG,
                payload: {
                  messege: "Discard changes ?",
                  isNotConfirmed: true,
                  handleOnYes: () => {
                    onCancel(false);
                  },
                },
              });
              return;
            }
            onCancel(false);
          }}
        >
          <RxCross1 />
        </button>
        {!verifed ? (
          <Verify
            password={passwords}
            verifed={verifed}
            setVerifed={setVerifed}
            setPassword={handleChange}
          />
        ) : (
          <NewPassword passwords={passwords} setPasswords={handleChange} />
        )}
      </form>
    </section>
  );
}

const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{5,13}$/;
const nameRegex = {
  firstChar: /^[A-Z]/,
  wholeName: /^[A-Z][a-z]+\s[A-Za-z]+\s?$/,
};

function Input({ name, value, onChange }) {
  const [editOn, setEditOn] = useState(false);
  const [error, setError] = useState({ error: "", has: false });
  const [empty, setEmpty] = useState(false);

  function handleOnBlur({ target }) {
    if (target.name !== "bio") {
      target.value.length < 5 ? setEmpty(true) : setEmpty(false);
    }
    if (target.name === "username") {
      if (!usernameRegex.test(target.value)) {
        setError({
          has: true,
          error: "Should only contain letters,numbers and underscore(_)",
        });
        return;
      }
      setError({ error: "", has: false });
      return;
    }
    if (target.name === "name") {
      if (!nameRegex.firstChar.test(target.value)) {
        setError({
          has: true,
          error: "Name should be start with uppercase letter",
        });
        return;
      }
      if (!nameRegex.wholeName.test(target.value)) {
        setError({
          has: true,
          error: "Should only contain letters  and one whitespace beteween",
        });
        return;
      }
      setError({
        has: false,
        error: true,
      });
    }
  }
  return (
    <>
      <div className="relative">
        <input
          type="text"
          value={value}
          name={name}
          readOnly={!editOn}
          spellCheck={false}
          onChange={onChange}
          onBlur={handleOnBlur}
          placeholder={
            name === "bio"
              ? "Say something about yourself"
              : `maximum ${name === "name" ? 25 : 13} charcters`
          }
          maxLength={name === "username" ? 13 : name === "name" ? 25 : ""}
          minLength={name !== "bio" ? 5 : 0}
          className={`text-lg text-slate-500 mb-0 outline-none relative after:content-[""] after:h-[2px] after:absolute after:duration-300 after:bg-black after:bottom-0 after:left-0 after:z-10 ${
            editOn ? "after:w-full" : "after:w-0"
          } w-full`}
        />
        <span
          className={`h-[1px] absolute duration-300 bg-black bottom-0 left-0 z-10 ${
            editOn ? "w-full" : "w-0"
          }`}
        ></span>
        <button
          className="absolute right-3 bottom-1"
          onClick={() => {
            if (name === "bio") return setEditOn((prev) => !prev);
            if (!empty && !error.has) {
              setEditOn((prev) => !prev);
            }
          }}
        >
          {!editOn ? <AiFillEdit /> : <BsCheck2 />}
        </button>
      </div>
      {name !== "bio" && (
        <span
          className={`text-red-500 text-sm mb-4 leading-normal  ${
            error.has || empty ? "visible" : "invisible"
          }`}
        >
          {empty
            ? `${
                name.charAt(0).toUpperCase() + name.slice(1)
              } can't be less than 5 or empty`
            : error.has
            ? error.error
            : "All Okk"}
        </span>
      )}
    </>
  );
}

export default function EditProfile() {
  const [{ username:user, name, email, bio,profilePicture }] = useAuthorAtom();
  const {username}=useParams()
  const [displayPicChange, setDisplayPicChange] = useState(false);
  const [_, setDailog] = useDailogAtom();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name,
    bio,
    username,
  });
  const [passwordChange, setPasswordChange] = useState(false);

  function handleChange({ target }) {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  }
  if(user!==username){
    return <NotFound/>
  }
  
  return (
    <>
      <Container
        Y={"translate-y-[20vh] flex justify-center"}
        height="h-auto md:h-4/5"
      >
        <section
          className="flex flex-col lg:flex-row items-center  duration-[400ms] justify-start p-5 gap-10 md:gap-16 h-full relative -top-28 lg:top-0 md:px-28 md:py-5 w-full flex-grow md:h-4/5"
          id="authorData"
        >
          <div className="lg:-translate-y-[20vh] flex flex-col items-center">
            <div
              className="h-48 w-48 bg-[hsla(0,0%,100%,0)] mb-4 mx-7 rounded-full flex items-center justify-center backdrop-blur-[34.5px] relative "
              id="profilePic"
            >
              <div className="h-[10.5rem] w-[10.5rem]  rounded-full ">
              <img src={profilePicture} alt="" className="w-full  rounded-full" />
              </div>
              <div className="absolute h-12 w-12 bg-[#A7A4A4] right-2 bottom-2 rounded-full grid place-items-center cursor-pointer">
                <button
                  type="button"
                  onClick={() => {
                    setDisplayPicChange(true);
                  }}
                  className="h-10 w-10 bg-secondary rounded-full grid place-items-center text-2xl text-gray-700"
                >
                  <HiOutlineCamera />
                </button>
              </div>
            </div>
            <div
              className=" text-3xl mb-4 text-[#0E5FC0] font-semibold text-center"
              id="username"
            >
              @{data.username}
            </div>
            <span className="flex items-center gap-1 text-gray-500">
              <HiOutlineMail />
              Email: {email}
            </span>
          </div>
          <div className="flex flex-col flex-grow w-full ">
            <label className="text-2xl text-[#0e5fc0]">
              @username
              <Input
                value={data.username}
                name="username"
                onChange={handleChange}
              />
            </label>
            <label className="text-2xl text-[#0e5fc0]">
              Name
              <Input value={data.name} name="name" onChange={handleChange} />
            </label>
            <label className="text-2xl text-[#0e5fc0]">
              Bio
              <Input value={data.bio} name="bio" onChange={handleChange} />
            </label>
          </div>
          <div className=" flex flex-col gap-8 items-center flex-grow">
            <Button
              width="w-auto"
              onClick={() => {
                setPasswordChange(true);
              }}
            >
              Change Password
            </Button>
            <div className="flex gap-6">
              <Button>Save</Button>
              <Button
                reverse={true}
                onClick={() => {
                  setDailog({
                    type: ACTIONS.SET_DAILOG,
                    payload: {
                      messege: "Discard changes",
                      isNotConfirmed: true,
                      handleOnYes: () => {
                        navigate(`/profile/${user}`);
                      },
                    },
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </section>
      </Container>
      {passwordChange && <Password onCancel={setPasswordChange} />}
      {displayPicChange && (
        <ChangeProfilePic handleCancel={setDisplayPicChange} />
      )}
    </>
  );
}
