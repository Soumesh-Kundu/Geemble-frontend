import { RxCross1 } from "react-icons/rx";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { usePostAtom, ACTIONS } from "../store/CurrentPost";
import { useAuthorAtom } from "../store/Authstore";
import { IoIosSend } from "react-icons/io";
import { BsDot } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useState,useRef } from "react";
import { useDailogAtom, ACTIONS as dailogACTIONS } from "../store/DailogStore";
import Liked from "../components/Liked";

function Comment({ username, profilePicture, comment, _id, time }) {
  const date = new Date(time);
  const [optionsOpen, setOptionsOpen] = useState(false);
  
  const [, setDailog] = useDailogAtom();
  return (
    <div className="flex gap-3 items-center mb-4">
      <div className="h-12 w-12 bg-green-300 rounded-full"></div>
      <div className="bg-[#e6e6e6] max-w-full px-4 py-2 rounded-2xl flex flex-col  ">
        <div className="flex gap-2 items-center">
          <span className="text-[#0E5FC0] text-base md:text-lg font-semibold">
            @{username}
          </span>
          <span className="text-slate-500 text-base flex items-center">
            {<BsDot />}
            {date.toDateString().slice(3, 10)}
          </span>
        </div>
        <div className="text-lg">{comment}</div>
      </div>
      <button
        type="button"
        className="text-2xl relative"
        onClick={() => {
          setOptionsOpen((prev) => !prev);
        }}
      >
        <BiDotsHorizontalRounded />
        {optionsOpen && (
          <button
            type="button"
            className="absolute px-6 py-2 right-0 text-base bg-[#f3f2f2] rounded-lg"
            onClick={() => {
              console.log("hello");
              setDailog({
                type: dailogACTIONS.SET_DAILOG,
                payload: {
                  messege: "Are you sure ?",
                  isNotConfirmed: true,
                  handleOnYes: () => {
                    console.log("comment deleted");
                  },
                  handleOnNo: () => {},
                },
              });
            }}
          >
            Delete
          </button>
        )}
      </button>
    </div>
  );
}

export default function Post() {
  const [
    { _id, username, time, caption, postedImage, comments, likes },
    setCurrentPost,
  ] = usePostAtom();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const inputRef=useRef(null)
  const [{ username: user }] = useAuthorAtom();
  const date = new Date(time);
  return (
    <>
      <section
        id="Post"
        className="h-screen w-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] grid place-items-center px-4 py-20 md:p-4 z-30 overflow-y-auto"
      >
        <div className=" w-full md:w-3/4 lg:w-[45%] bg-white  rounded-xl py-6 px-4  flex flex-col gap-5 md:py-8 md:px-6">
          <div id="author" className="flex h-14 gap-5 relative">
            <div id="profilepicture">
              <div className="-z-10 w-12 h-12 rounded-full bg-pink-400"></div>
            </div>
            <div className="flex-grow font-semibold">
              <div id="username" className="text-[#0E5FC0] text-lg">
                @{username}
              </div>
              <div id="Date" className="text-slate-500 text-md">
                {date.toDateString().slice(3, 10)}
                {" @ "}
                {date.toTimeString().slice(0, 5)}
              </div>
            </div>
            <div
              className="rounded-full bg-slate-300 lg:bg-transparent hover:bg-slate-300 flex items-center justify-center w-10 h-10 cursor-pointer duration-300"
              onClick={() => {
                setCurrentPost({ type: ACTIONS.CLEAR });
              }}
            >
              <span className="material-symbols-outlined text-gray-700">
                <RxCross1 />
              </span>
            </div>
          </div>
          <div id="caption" className="w-full text-black text-lg">
            {caption}
          </div>
          {postedImage && (
            <div className="h-full bg-gray-300  object-cover flex justify-center rounded-xl">
              <img
                className="h-full lg:max-h-[65vh] rounded-xl "
                src={`http://192.168.0.103:5500/api/${postedImage}`}
                alt=""
              />
            </div>
          )}
          <div id="counts" className="flex justify-between items-center">
            <div
              className="flex gap-2 items-center justify-center text-[#64748b] text-lg cursor-pointer"
              onClick={() => {
                setLiked(true);
              }}
            >
              <AiOutlineLike />
              <div className="underline lg:no-underline hover:underline">
                {likes.length}
              </div>
            </div>
            <div className="flex gap-2 items-center text-[#64748b] text-lg cursor-pointer" onClick={()=>{
              inputRef.current?.focus()
            }}>
              <div className="underline lg:no-underline hover:underline">
                {comments.length}
              </div>
              <FaRegComment />
            </div>
          </div>
          <div className="flex gap-3 ">
            <button
              type="button"
              className="flex justify-center items-center text-2xl h-10 md:h-12 w-24 md:w-32  bg-[#e6e6e6] rounded-3xl text-[#4783cc]"
              onClick={() => {}}
            >
              {likes.length && likes.find((data) => data.user === user) ? (
                <AiFillLike />
              ) : (
                <AiOutlineLike />
              )}
            </button>
            <label
              className="flex-grow h-10 md:h-12 rounded-3xl flex gap-5 text-xl justify-center items-center bg-[#e6e6e6] text-[#4783cc]"
              htmlFor="comment-input"
            >
              <FaRegComment />
              Comment
            </label>
          </div>
          <div className="h-[2px] w-full bg-[#e6e6e6]"></div>
          <div id="comment-box" className="flex w-full justify-between gap-18">
            <input
              className="flex-grow bg-[#e6e6e6] px-4 outline-none rounded-3xl"
              id="comment-input"
              ref={inputRef}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              type="button"
              className="h-12 w-12 text-[#4783cc] text-3xl grid place-items-center"
              onClick={() => {}}
            >
              <IoIosSend />
            </button>
          </div>
          <div id="comment-section">
            {comments.map((item, index) => (
              <Comment key={index} {...item} />
            ))}
          </div>
        </div>
      </section>
      {liked && (
        <Liked
          likes={likes}
          cancelFunction={() => {
            setLiked(false);
          }}
        />
      )}
    </>
  );
}
