import { useParams, useNavigate} from "react-router-dom";
import Button from "../components/Button";
import { Container } from "../layouts";
import { dummyPost } from "../data/data";
import Post from "../components/Post";
import { useAuthorAtom } from "../store/Authstore";
import { useEffect, useState } from "react";
import { usePostAtom,ACTIONS } from "../store/CurrentPost";
import CreatePost from "./CreatePost";

export default function UserProfile() {
  const [{ username: user, name }] = useAuthorAtom();
  const [{activeFor},setCurrentPost]=usePostAtom()
  const { username } = useParams();
  const navigate = useNavigate();
  const [isCrossed, setIsCrossed] = useState(false);
  const changeProfilePosition = () => {
    if (document.querySelector(".App").scrollTop <= 100) {
      setIsCrossed(true);
    } else {
      setIsCrossed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeProfilePosition, true);
    return () => {
      window.removeEventListener("scroll", changeProfilePosition);
    };
  }, []);
  return (
    <>
      <Container
        Y={"translate-y-[30vh]"}
        md_Y={"md:translate-y-[20vh] lg:translate-y-[25vh]"}
        padding={""}
      >
        <div
          onScroll={(e) => {
            console.log("hello");
          }}
          id="profile"
          className="mx-2 md:mx-16 lg:mx-60  flex flex-col md:gap-10 lg:gap-28 md:flex-row items-center md:justify-center md:items-start"
        >
          <section
            className={`md:sticky -top-14 flex flex-col items-center duration-[400ms] justify-start -translate-y-[20%] ${
              isCrossed ? "md:-translate-y-[20%]" : "md:-translate-y-0"
            }`}
            id="authorData"
          >
            <div
              className="h-48 w-48 bg-[rgba(255,255,255,0.1)] mb-4 mx-7 rounded-full flex items-center justify-center backdrop-blur-[34.5px]"
              id="profilePic"
            >
              <div className="h-[10.5rem] w-[10.5rem] bg-purple-500 rounded-full "></div>
            </div>
            <div
              className=" text-3xl mb-4 text-[#0E5FC0] font-semibold"
              id="username "
            >
              @{user}
            </div>
            <div id="name" className="text-xl text-slate-500 mb-4">
              {name}
            </div>
            <div id="bio" className="text-lg mb-8">
              bio
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
                        type:ACTIONS.SET_POST,
                        payload:{
                          activeFor:'create'
                        }
                      });
                    }}
                  />
                </div>
              </>
            )}
          </section>
          <section
            className=" w-full md:w-1/2 remove-scrollbar md:overflow-y-scroll  text-white md:mt-5 flex flex-col gap-5 items-center"
            id="posts"
          >
            {dummyPost.map((item, index) => (
              <Post key={index} {...item} />
            ))}
          </section>
        </div>
      </Container>
      {activeFor==='create' && <CreatePost user={username}/>}
    </>
  );
}
