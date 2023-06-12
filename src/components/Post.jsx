import { useEffect, useState } from "react";
import { useLocation, useNavigate,useParams } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useAuthorAtom } from "../store/Authstore";
import { ACTIONS as DAILOGACTONS, useDailogAtom } from "../store/DailogStore";
import { ACTIONS as POSTACTIONS, usePostAtom } from "../store/CurrentPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Delete, liked } from "../api/post";
import { cloneDeep } from "lodash";
import { useAlertAtom, ACTIONS as ALERT_ACTIONS } from "../store/AlertStore";

export default function Post({
  _id,
  username,
  Date: time,
  profilePicture:userDp,
  caption,
  postedImage,
  likes,
  comments,
}) {
  const [{ username: user, profilePicture }] = useAuthorAtom();
  const [, setDailog] = useDailogAtom();
  const location=useLocation()
  const navigator=useNavigate()
  const [, setCurrentPost] = usePostAtom();
  const [, setAlert] = useAlertAtom();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [hasLiked, setLiked] = useState(
    likes.map((data) => data.user).includes(user)
  );
  const queryClient = useQueryClient();
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
      const previousValue = location.pathname===`/profile/${username}`?queryClient.getQueryData(["posts",username]):queryClient.getQueryData(["posts"])
      console.log(previousValue)
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
        newData.likes = newData.likes.filter((item) => item.user !== user);
      } else {
        newData.likes.push({
          _id: Math.floor(0 + Math.random() * 10000),
          user: user,
          profilePicture,
        });
      }

      if(location.pathname===`/profile/${username}`)
      {
        queryClient.setQueryData(["posts",username], (old) => allpages);
      }
      else{
        queryClient.setQueryData(["posts"], (old) => allpages);
      }

      // Return a context object with the snapshotted value
      return { previousValue };
    },
    onError: (err, newTodo, context) => {
      if(location.pathname===`/profile/${username}`)
      {
        queryClient.setQueryData(["posts",username], context.previousValue);
      }
      else{
        queryClient.setQueryData(["posts"], context.previousValue);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      if(location.pathname===`/profile/${username}`)
      {
        queryClient.invalidateQueries({ queryKey: ["posts",username] });
      }
      else{
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      }
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () => Delete(_id),
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
            messege: "Post can't be deleted",
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
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const date = new Date(time);
  function handleOnClick() {
    setDailog({
      type: DAILOGACTONS.SET_DAILOG,
      payload: {
        messege: "Are you sure ?",
        isNotConfirmed: true,
        handleOnYes: () => {
          deleteMutate();
        },
        handleOnNo: () => {},
      },
    });
    setOptionsOpen(false);
  }

  useEffect(() => {
    if (likes.map((data) => data.user).includes(user)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes]);

  return (
    <div className="bg-[#DDDDDD] w-full tracking-wide min-h-min p-4 rounded-3xl flex flex-col gap-3 ">
      <div id="author" className="flex h-14 gap-5 relative">
        <div id="profilepicture">
          <div className="-z-10 w-10 h-10 rounded-full overflow-hidden">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/api/${userDp}`}
              alt="profilePicture"
              className="w-full rounded-full overflow-hidden"
            />
          </div>
        </div>
        <div className="flex-grow font-semibold">
          <div id="username" className="text-[#0E5FC0] text-md cursor-pointer" onClick={()=>navigator(`/profile/${username}`)}>
            @{username}
          </div>
          <div id="Date" className="text-slate-500 text-sm">
            {date.toDateString().slice(3, 10)} at
            {date.toTimeString().slice(0, 5)}
          </div>
        </div>
        {user === username && (
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
        )}
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
                    profilePicture:userDp,
                    postedImage,
                    activeFor: "Edit",
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
            src={`${import.meta.env.VITE_BASE_URL}/api/${postedImage}`}
            className="rounded-xl max-h-[60]"
            alt=""
          />
        </div>
      )}
      <div id="counts" className="flex justify-between items-center">
        <div
          className="flex gap-2 items-center justify-center text-[#64748b] text-lg cursor-pointer"
          onClick={() => {
            setCurrentPost({
              type: POSTACTIONS.SET_POST,
              payload: {
                _id,
                time,
                caption,
                username,
                postedImage,
                profilePicture:userDp,
                likes,
                comments,
                activeFor: "likes",
              },
            });
            setOptionsOpen(false);
          }}
        >
          <AiOutlineLike />
          <div className="underline lg:no-underline hover:underline">
            {likes.length}
          </div>
        </div>
        <div
          className="flex gap-2 items-center text-[#64748b] text-lg cursor-pointer "
          onClick={() => {
            setCurrentPost({
              type: POSTACTIONS.SET_POST,
              payload: {
                _id,
                time,
                caption,
                username,
                profilePicture:userDp,
                postedImage,
                likes,
                comments,
                activeFor: "Show",
              },
            });
            setOptionsOpen(false);
          }}
        >
          <div className="underline lg:no-underline hover:underline">
            {comments.length}
          </div>
          <FaRegComment />
        </div>
      </div>
      <div className="flex gap-3 ">
        <button
          type="button"
          className="flex justify-center items-center text-2xl h-10 w-24 bg-[#fcfcfc] rounded-3xl text-[#4783cc]"
          onClick={() => {
            likeMutate();
          }}
        >
          {hasLiked ? <AiFillLike /> : <AiOutlineLike />}
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
                profilePicture:userDp,
                postedImage,
                likes,
                comments,
                activeFor: "Show",
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
