import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthorAtom } from "../store/Authstore";
import { AiOutlineSearch } from "react-icons/ai";
import { ACTIONS, useDailogAtom } from "../store/DailogStore";
import Searchbar from "./Searchbar";
import Geemble from "../assets/Geemble.png";

export default function Navbar({ isCrossed }) {
  const [{ username }] = useAuthorAtom();
  const [, setDailog] = useDailogAtom();
  const [DropBoxOpen, setDropBoxOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let navRef = useRef();
  useEffect(() => {
    setDropBoxOpen(false);
  }, [location.pathname]);

  return (
    <nav
      ref={navRef}
      className={`flex  items-center fixed duration-500 justify-between px-4 md:px-6 py-3 top-0 md:before:mr-[10px]  w-full z-30  rounded-b-3xl before:content-[""] before:top-0 before:right-0 before:left-0 before:bottom-0 before:z-0 before:absolute before:bg-nav-gradient before:duration-300 ${
        location.pathname === "/search" && window.innerWidth < 1080
          ? ""
          : "before:rounded-b-3xl"
      } ${
        location.pathname === "/search" && window.innerWidth < 1080
          ? "before:opacity-100"
          : ""
      } ${isCrossed ? "before:opacity-100" : "before:opacity-0"}`}
    >
      <div className="flex items-center gap-3 z-20">
        {location.pathname !== "/" && (
          <span
            className="material-symbols-outlined text-white text-3xl md:text-[35px] cursor-pointer"
            onPointerDown={() => {
              navigate(-1);
            }}
          >
            keyboard_backspace
          </span>
        )}
        <Link to="/" className="font-segoe text-white ">
          <img src={Geemble} className="w-28 md:w-32" />
        </Link>
      </div>
      {window.innerWidth > 1080 && location.pathname === "/search" && (
        <Searchbar styling="-translate-x-14" />
      )}
      <div className="flex items-center gap-3 cursor-pointer duration-300 z-30">
        {location.pathname !== "/search" && (
          <Link
            to="search"
            className="bg-white h-12 w-12 md:h-14 md:w-14 flex items-center rounded-full justify-center"
          >
            <div className="text-black text-2xl">
              <AiOutlineSearch />
            </div>
          </Link>
        )}
        <div
          className="bg-gray-200 relative  md:h-14 md:w-14 rounded-full flex justify-center items-center h-12 w-12"
          onPointerDown={(e) => {
            e.preventDefault();
            setDropBoxOpen((prev) => !prev);
          }}
        >
          P
          <div>
            <span className="material-symbols-outlined md:h-8 md:w-8 rounded-full flex items-center justify-center absolute h-7 w-7 bg-red-300 text-zl md:text-2xl -right-1 -bottom-2 scale-75 text-black">
              expand_{DropBoxOpen ? "less" : "more"}
            </span>
          </div>
        </div>
      </div>
      <div
        className={` overflow-hidden absolute box-border right-4  -bottom-1 w-36 md:w-44 rounded-2xl px-6 py-4  duration-300 translate-y-full ${
          DropBoxOpen ? "translate-x-0" : "translate-x-full"
        } opacity-${DropBoxOpen ? "100" : "0"}
      ${DropBoxOpen ? "opacity-100" : "opacity-0"} bg-secondary `}
      >
        <div>
          {location.pathname !== `/profile/${username}` && (
            <Link
              to={`profile/${username}`}
              className="flex items-center relative lg:after:conternt-[''] cursor-pointer lg:after:duration-300 lg:after:absolute lg:after:left-1  lg:after:-bottom-[0.15rem] lg:after:w-0 lg:after:hover:w-5/12 lg:after:h-[2px] lg:after:bg-[#427ABE] text-[#427ABE] text-md md:text-lg gap-2 mb-4"
            >
              <span className="material-symbols-outlined">person</span>
              Profile
            </Link>
          )}
          <div
            className="flex items-center text-[#427ABE] relative lg:after:content-[''] cursor-pointer lg:after:duration-300 lg:after:absolute lg:after:left-1  lg:after:-bottom-[0.15rem] lg:after:w-0 lg:after:hover:w-6/12 lg:after:h-[2px] lg:after:bg-[#427ABE] text-sm md:text-lg gap-2"
            onClick={() => {
              setDailog({
                type: ACTIONS.SET_DAILOG,
                payload: {
                  messege: "Really want to leave ?",
                  isNotConfirmed: true,
                  handleOnYes: () => {
                    navigate('/login')
                    console.log("You have been logged out");
                  },
                  handleOnNo: () => {
                    setDropBoxOpen(false);
                  },
                },
              });
            }}
          >
            <span className="material-symbols-outlined">logout</span>
            Log Out
          </div>
        </div>
      </div>
    </nav>
  );
}
