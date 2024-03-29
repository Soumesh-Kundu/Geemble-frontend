import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Container } from "../layouts";
import { dummyPost } from "../data/data";
import Post from "../components/Post";
import { useAuthorAtom } from "../store/Authstore";
import { useEffect, useMemo, useState } from "react";
import { usePostAtom, ACTIONS } from "../store/CurrentPost";
import CreatePost from "./CreatePost";
import { useInfiniteQuery, useQuery,useQueryClient } from "@tanstack/react-query";
import { getUser } from "../api/user";
import { getUsersPosts } from "../api/post";
import Loader2 from "../components/Loader2";
import InfiniteScroll from "react-infinite-scroll-component";

export default function UserProfile() {
  const queryClient=useQueryClient()
  const [{ username: user, name, bio, profilePicture }] = useAuthorAtom();
  const [{ activeFor }, setCurrentPost] = usePostAtom();
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const {
    data: userData,
    isLoading: userLoading,
    status,
  } = useQuery(["user", username], () => getUser(username), {
    enabled: user !== username,
  });
  const currentProfile = useMemo(() => {
    if (user !== username && userData !== undefined) {
      return {
        user: userData?.data.user.username,
        name: userData?.data.user.name,
        profilePicture: userData?.data.user.profilePicture,
        bio: userData?.data.user.hasOwnProperty("bio")
          ? userData.data.user.bio
          : "",
      };
    } else {
      return {
        user,
        name,
        bio,
        profilePicture,
      };
    }
  }, [userData]);
  const { data: userPosts, isLoading: postLoading,hasNextPage,fetchNextPage } = useInfiniteQuery(
    ["posts", username],
    ({ pageParam = 1 }) => getUsersPosts(username, pageParam),
    {
      getNextPageParam: (prevData) => prevData.nextPage,
      refetchOnWindowFocus: false,
      refetchOnMount:true
    }
  );

  const navigate = useNavigate();
  const [isCrossed, setIsCrossed] = useState(false);

  const changeProfilePosition = () => {
    if (document.querySelector(".App").scrollTop >= 80) {
      setIsCrossed(true);
    } else {
      setIsCrossed(false);
    }
  };
  document.title=`Geemble  |  ${username}`
  useEffect(() => {
    window.addEventListener("scroll", changeProfilePosition, true);
    queryClient.invalidateQueries(['posts',username])
    return () => {
      document.title="Geemble"
      window.removeEventListener("scroll", changeProfilePosition);
    };
  }, []);

  useEffect(() => {
    if (!postLoading && userPosts !== undefined) {
      setPosts(userPosts?.pages?.flatMap((item) => item.posts));
    }
  }, [userPosts]);
  return (
    <>
      <Container
        Y={"translate-y-[30vh]"}
        md_Y={"md:translate-y-[20vh] lg:translate-y-[25vh]"}
        padding={""}
      >
        <div
          onScroll={(e) => {}}
          id="profile"
          className="mx-2 md:mx-16 lg:mx-60  flex flex-col md:gap-10 lg:gap-28 md:flex-row items-center md:justify-center md:items-start"
        >
          <section
            className={`md:sticky -top-14 flex flex-col items-center duration-[400ms] justify-start -translate-y-[20%] ${
              isCrossed ? "md:-translate-y-0" : "md:-translate-y-[25%]"
            }`}
            id="authorData"
          >
            <div
              className="h-48 w-48 bg-[rgba(255,255,255,0.1)] mb-4 mx-7 rounded-full flex items-center justify-center backdrop-blur-[34.5px]"
              id="profilePic"
            >
              <div className="h-[10.5rem] w-[10.5rem] rounded-full object-cover overflow-hidden">
                <img
                  src={/firebasestorage/.test(currentProfile.profilePicture)?currentProfile.profilePicture:`${import.meta.env.VITE_BASE_URL}/api/${
                    currentProfile.profilePicture
                  }`}
                  alt="displayPicute"
                  className=" w-full h-full object-cover  rounded-full"
                />
              </div>
            </div>
            <div
              className=" text-3xl mb-4 text-[#0E5FC0] font-semibold"
              id="username "
            >
              @{currentProfile.user}
            </div>
            <div id="name" className="text-xl text-slate-500 mb-4">
              {currentProfile.name}
            </div>
            <div id="bio" className="text-lg text-[#0E5FC0] text mb-8">
              {currentProfile.bio ?? ""}
            </div>
            {user === username && (
              <>
                <div className="">
                  <Button
                    content="Edit Profile"
                    onClick={() => {
                      navigate(`/editprofile/${username}`);
                    }}
                  />
                </div>
                <div className="mt-4">
                  <Button
                    content="Create Post"
                    color=""
                    onClick={() => {
                      setCurrentPost({
                        type: ACTIONS.SET_POST,
                        payload: {
                          activeFor: "create",
                        },
                      });
                    }}
                  />
                </div>
              </>
            )}
          </section>
          <section
            className=" w-full md:w-1/2 remove-scrollbar md:overflow-y-scroll justify-center text-white md:mt-5 flex flex-col gap-10 items-center "
            id="posts"
          >
            {posts.length ? (
              <InfiniteScroll
                hasMore={hasNextPage}
                dataLength={posts.length}
                next={fetchNextPage}
                loader={<Loader2 />}
                scrollableTarget="scrollableDiv"
              >
                {posts?.map((item, index) => (
                  <div className="mb-5" key={index}>
                    <Post {...item} />
                  </div>
                ))}
              </InfiniteScroll>
            ) : postLoading ? (
              <Loader2 />
            ) : (
              <div className="w-full text-gray-400 text-5xl tracking-wider h-56 grid place-items-center font-bold ">
                No Posts Yet
              </div>
            )}
          </section>
        </div>
      </Container>
      {activeFor === "create" && <CreatePost user={username} />}
    </>
  );
}
