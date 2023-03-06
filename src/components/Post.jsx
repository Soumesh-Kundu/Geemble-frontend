import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useAuthorAtom } from "../store/Authstore";
import { ACTIONS as DAILOGACTONS, useDailogAtom } from "../store/DailogStore";
import { ACTIONS as POSTACTIONS, usePostAtom } from "../store/CurrentPost";

const likedstyle = "";
const nonLikedStyle = "";

export default function Post({
  _id,
  username,
  time,
  caption,
  postedImage,
  likes,
  comments,
}) {
  const [{ username: user }] = useAuthorAtom();
  const [, setDailog] = useDailogAtom();
  const [, setCurrentPost] = usePostAtom();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const navigate = useNavigate();
  const date = new Date(time);
  function handleOnClick() {
    setDailog({
      type: DAILOGACTONS.SET_DAILOG,
      payload: {
        messege: "Are you sure ?",
        isNotConfirmed: true,
        handleOnYes: () => {
          console.log("post deleted");
        },
        handleOnNo: () => {},
      },
    });
    setOptionsOpen(false);
  }

  return (
    <div className="bg-[#DDDDDD] w-full tracking-wide min-h-min p-4 rounded-3xl flex flex-col gap-3">
      <div id="author" className="flex h-14 gap-5 relative">
        <div id="profilepicture">
          <div className="-z-10 w-10 h-10 rounded-full bg-pink-400"></div>
        </div>
        <div className="flex-grow font-semibold">
          <div id="username" className="text-[#0E5FC0] text-md">
            @{username}
          </div>
          <div id="Date" className="text-slate-500 text-sm">
            {date.toDateString().slice(3, 10)} at
            {date.toTimeString().slice(0, 5)}
          </div>
        </div>
        <div
          className="rounded-full hover:bg-slate-300 flex items-center justify-center w-10 h-10 cursor-pointer duration-300"
          onClick={() => {
            setOptionsOpen((prev) => !prev);
          }}
        >
          <span className="material-symbols-outlined text-gray-700">
            more_horiz
          </span>
        </div>
        {optionsOpen && (
          <div className="px-2 py-4 bg-gray-300 rounded-xl w-24 h-20 flex flex-col justify-center absolute right-2 translate-y-[50%]">
            <div
              className="hover:bg-slate-200 box-border text-black px-2 py-1 rounded-md cursor-pointer"
              onClick={() => {
                setCurrentPost({
                  type: POSTACTIONS.SET_POST,
                  payload: {
                    _id,
                    username,
                    caption,
                    postedImage,
                    activeFor:'Edit'
                  },
                });
                setOptionsOpen(false);
              }}
            >
              Edit
            </div>
            <div
              className="hover:bg-slate-200 text-black px-2 py-1 box-border rounded-md cursor-pointer"
              onClick={handleOnClick}
            >
              Delete
            </div>
          </div>
        )}
      </div>
      <div id="caption" className="w-full text-black text-lg">
        {caption}
      </div>
      {postedImage && (
        <div className=" object-cover max-h-[60%] flex justify-center">
          <img
            src={`http://192.168.0.103:5500/api/${postedImage}`}
            className="rounded-xl max-h-[60]"
            alt=""
          />
        </div>
      )}
      <div id="counts" className="flex justify-between items-center">
        <div className="flex gap-2 items-center justify-center text-[#64748b] text-lg cursor-pointer">
          <AiOutlineLike />
          <div className="underline lg:no-underline hover:underline">
            {likes.length}
          </div>
        </div>
        <div className="flex gap-2 items-center text-[#64748b] text-lg cursor-pointer ">
          <div className="underline lg:no-underline hover:underline">
            {comments.length}
          </div>
          <FaRegComment />
        </div>
      </div>
      <div className="flex gap-3 ">
        <button
          type="button"
          className="flex justify-center items-center text-2xl h-10 w-24  bg-[#fcfcfc] rounded-3xl text-[#4783cc]"
          onClick={() => {}}
        >
          {likes.length && likes.find((data) => data.user === user) ? (
            <AiFillLike />
          ) : (
            <AiOutlineLike />
          )}
        </button>
        <button
          type="button"
          className="flex-grow h-10 rounded-3xl flex gap-5 text-xl justify-center items-center bg-[#fcfcfc] text-[#4783cc]"
          onClick={() => {
            setCurrentPost({
              type: POSTACTIONS.SET_POST,
              payload: {
                _id,
                time,
                caption,
                username,
                postedImage,
                likes,
                comments,
                activeFor:'Show'
              },
            });
            setOptionsOpen(false);
          }}
        >
          <FaRegComment />
          Comment
        </button>
      </div>
    </div>
  );
}
