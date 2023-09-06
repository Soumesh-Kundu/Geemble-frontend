import { RxCross1 } from "react-icons/rx";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { usePostAtom, ACTIONS } from "../store/CurrentPost";
import { useAuthorAtom } from "../store/Authstore";
import { IoIosSend } from "react-icons/io";
import { BsDot } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useState, useRef } from "react";
import { useDailogAtom, ACTIONS as dailogACTIONS } from "../store/DailogStore";
import Liked from "../components/Liked";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cloneDeep } from "lodash";
import { liked, createComment, deleteComment } from "../api/post";
import { useAlertAtom, ACTIONS as ALERT_ACTIONS } from "../store/AlertStore";
import Spinner from "../components/Spinner";

function Comment({
  username,
  profilePicture,
  deleteComment,
  comment,
  _id,
  Date: time,
}) {
  const date = new Date(time);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [{ username: user }] = useAuthorAtom();

  const [, setDailog] = useDailogAtom();
  return (
    <div className="flex gap-3 items-center mb-4">
      <div className="h-12 w-12 rounded-full overflow-hidden">
        <img
          src={/firebasestorage/.test(profilePicture)?profilePicture:`${import.meta.env.VITE_BASE_URL}/api/${profilePicture}`}
          alt="profilePicture"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
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
      {username === user && (
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
                      deleteComment(_id);
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
      )}
    </div>
  );
}

export default function Post() {
  let [
    {
      _id,
      username,
      time,
      caption,
      postedImage,
      profilePicture: userDp,
      comments,
      likes,
    },
    setCurrentPost,
  ] = usePostAtom();
  const queryClient = useQueryClient();
  const [likedClick, setLikedClick] = useState(false);
  const [totalLikes, setTotalLikes] = useState(likes);
  const [comment, setComment] = useState("");
  const [allComments, setallComments] = useState(comments);
  const [, setAlert] = useAlertAtom();
  const inputRef = useRef(null);
  const [{ username: user, profilePicture }] = useAuthorAtom();
  const date = new Date(time);
  const navigator = useNavigate();

  const { mutate: likeMutate } = useMutation({
    mutationFn: () =>
      liked(_id, {
        username: user,
        profilePicture,
      }),

    onMutate: async () => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Snapshot the previous value
      const previousValue = queryClient.getQueryData(["posts"]);
      const allpages = cloneDeep(previousValue);
      const allposts = previousValue.pages.flatMap((item) => item.posts);

      // Optimistically update to the new value

      const currentPostIndexAll = allposts.findIndex(
        (data) => data._id === _id
      );

      const pageIndex = Math.floor(currentPostIndexAll / 5);
      const currentPostIndex = allpages.pages[pageIndex].posts.findIndex(
        (item) => item._id === _id
      );

      let newData = allpages.pages[pageIndex].posts[currentPostIndex];
      if (
        allposts[currentPostIndexAll].likes.find((data) => data.user === user)
      ) {
        console.log(likes);
        newData.likes = newData.likes.filter((item) => item.user !== user);
        setTotalLikes((likes) => likes.filter((item) => item.user !== user));
      } else {
        const newLikeData = {
          _id: Math.floor(0 + Math.random() * 10000),
          user: user,
          profilePicture,
        };
        newData.likes.push(newLikeData);
        setTotalLikes((likes) => [...likes, newLikeData]);
        console.log(likes);
      }

      queryClient.setQueryData(["posts"], (old) => allpages);

      // Return a context object with the snapshotted value
      return { previousValue };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["posts"], context.previousValue);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: commentMutate, isLoading } = useMutation({
    mutationFn: (body) => createComment(_id, body),
    onError({ response }) {
      if (response === undefined) {
        setAlert({
          type: ALERT_ACTIONS.SET_ALERT,
          payload: {
            messege: "Oops! Server is Down, Sorry for inconvinence",
            alertType: "error",
          },
        });
        return;
      }
      if (response.status === 500) {
        setAlert({
          type: ALERT_ACTIONS.SET_ALERT,
          payload: {
            messege: "Oops! Some error has occured, Sorry for inconvinence",
            alertType: "error",
          },
        });
        return;
      }
    },
    onSuccess({ data }) {
      queryClient.invalidateQueries(["posts"]);
      console.log(data.comments);
      setallComments(data.comments.sort((a, b) => a.Date - b.Date));
      setComment("");
    },
  });
  const { mutate: deleteComMutate } = useMutation({
    mutationFn: (comment_id) => deleteComment(_id, comment_id, user),
    onError({ response }) {
      if (response === undefined) {
        setAlert({
          type: ALERT_ACTIONS.SET_ALERT,
          payload: {
            messege: "Oops! Server is Down, Sorry for inconvinence",
            alertType: "error",
          },
        });
        return;
      }
      if (response.status === 401) {
        setAlert({
          type: ALERT_ACTIONS.SET_ALERT,
          payload: {
            messege: "Can't Delete Comment",
            alertType: "error",
          },
        });
        return;
      }
      if (response.status === 500) {
        setAlert({
          type: ALERT_ACTIONS.SET_ALERT,
          payload: {
            messege: "Oops! Some error has occured, Sorry for inconvinence",
            alertType: "error",
          },
        });
        return;
      }
    },
    onSuccess({ data }) {
      queryClient.invalidateQueries(["posts"]);
      setallComments(
        data.comments.toSorted((item1, item2) => item1.Date - item2.Date)
      );
    },
  });

  return (
    <>
      <section
        id="Post"
        className="h-screen w-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] grid place-items-center px-4 py-20 md:p-4 z-30 overflow-y-auto"
      >
        <div className=" w-full md:w-3/4 lg:w-[45%] bg-white  rounded-xl py-6 px-4  flex flex-col gap-5 md:py-8 md:px-6">
          <div id="author" className="flex h-14 gap-5 relative">
            <div id="profilepicture">
              <div className="-z-10 w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={/firebasestorage/.test(userDp)?userDp:`${import.meta.env.VITE_BASE_URL}/api/${userDp}`}
                  alt="profilePicture"
                  className="w-full h-full object-cover rounded-full overflow-hidden"
                />
              </div>
            </div>
            <div className="flex-grow font-semibold">
              <div
                id="username"
                className="text-[#0E5FC0] text-lg cursor-pointer"
                onClick={() => {
                  setCurrentPost({ type: ACTIONS.CLEAR });
                  navigator(`/profile/${username}`);
                }}
              >
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
                className="h-full lg:max-h-[65vh] rounded-xl"
                src={/firebasestorage/.test(postedImage)?postedImage:`${import.meta.env.VITE_BASE_URL}/api/${postedImage}`}
                alt=""
              />
            </div>
          )}
          <div id="counts" className="flex justify-between items-center">
            <div
              className="flex gap-2 items-center justify-center text-[#64748b] text-lg cursor-pointer"
              onClick={() => {
                setLikedClick(true);
              }}
            >
              <AiOutlineLike />
              <div className="underline lg:no-underline hover:underline">
                {totalLikes.length}
              </div>
            </div>
            <div
              className="flex gap-2 items-center text-[#64748b] text-lg cursor-pointer"
              onClick={() => {
                inputRef.current?.focus();
              }}
            >
              <div className="underline lg:no-underline hover:underline">
                {allComments.length}
              </div>
              <FaRegComment />
            </div>
          </div>
          <div className="flex gap-3 ">
            <button
              type="button"
              onClick={likeMutate}
              className="flex justify-center items-center text-2xl h-10 md:h-12 w-24 md:w-32  bg-[#e6e6e6] rounded-3xl text-[#4783cc]"
            >
              {totalLikes.map((item) => item.user).includes(user) ? (
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
              disabled={isLoading}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              type="button"
              disabled={isLoading}
              className="h-12 w-12 text-[#4783cc] text-3xl grid place-items-center"
              onClick={() => {
                commentMutate({ username: user, profilePicture, comment });
              }}
            >
              {isLoading?<Spinner />:<IoIosSend />}
            </button>
          </div>
          <div id="comment-section">
            {allComments.map((item, index) => (
              <Comment key={index} {...item} deleteComment={deleteComMutate} />
            ))}
          </div>
        </div>
      </section>
      {likedClick && (
        <Liked
          likes={totalLikes}
          cancelFunction={() => {
            setLikedClick(false);
          }}
        />
      )}
    </>
  );
}
