import { Container } from "../layouts";
import { Link, useSearchParams } from "react-router-dom";
import { dummyData } from "../data/user";
import Searchbar from "../components/Searchbar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../api/user";
import { useAlertAtom, ACTIONS } from "../store/AlertStore";
import Loader2 from "../components/Loader2";

function UserDiv({ name, username, profilePicture }) {
  return (
    <Link
      to={`/profile/${username}`}
      className="bg-gray-100 hover:bg-gray-300 duration-300 w-full px-4 py-2 rounded-xl md:py-3 flex gap-5 items-center justify-start"
    >
      <div className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden">
        <img
          src={`${import.meta.env.VITE_BASE_URL}/api/${profilePicture}`}
          alt="dp"
          className="w-full overflow-hidden rounded-full"
        />
      </div>
      <div className="flex flex-col justify-start">
        <div className="text-[#0e5fc0] text-xl ">@{username}</div>
        <div className=" text-slate-500 text-md">{name}</div>
      </div>
    </Link>
  );
}

export default function search() {
  const [searchParams, setSearchParams] = useSearchParams({
    username: "",
  });

  let regex = new RegExp("^" + searchParams.get("username"));
  const [, setAlert] = useAlertAtom();

  const { data: res, isLoading } = useQuery({
    queryKey: ["users", searchParams.get("username")],
    queryFn: () => searchUsers(searchParams.get("username")),
    onError(error) {
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
      if (error.response.status === 500) {
        setAlert({
          type: ACTIONS.SET_ALERT,
          payload: {
            messege: "Oops! Some error has occured, Sorry for inconvinence",
            alertType: "error",
          },
        });
      }
    },
  });

  if (isLoading) {
    return (
      <>
        <Searchbar
          handleChange={handleChange}
          name={searchParams.get("username")}
        />
        <section id="users" className="h-full overflow-y-auto ">
          <Container
            padding="py-12 px-2 md:px-28 lg:px-36 flex flex-col items-center gap-6"
            height={"h-full"}
          >
            <Loader2 />
          </Container>
        </section>
      </>
    );
  }
  if (res?.data?.result === null) {
    return (
      <>
        <Searchbar
          handleChange={handleChange}
          name={searchParams.get("username")}
        />
        <section id="users" className="h-full overflow-y-auto ">
          <Container
            padding="py-12 px-2 md:px-28 lg:px-36 flex flex-col items-center"
            height={"h-full"}
          >
            <h1 className="text-[#0E5FC0] sm:text-3xl lg:text-4xl">
              Nothing found '@{searchParams.get("username")}'
            </h1>
            <img
              src="notfound2.jpg"
              alt="not found photo"
              className="w-5/6 lg:w-6/12 "
            />
          </Container>
        </section>
      </>
    );
  }
  function handleChange(value) {
    regex = new RegExp("^" + searchParams.get("username"));
    setSearchParams({ username: value });
    if (regex.test(searchParams.get("username"))) {
      console.log("hello");
      return;
    }
    console.log("bye");
  }

  return (
    <>
      <Searchbar
        handleChange={handleChange}
        name={searchParams.get("username")}
      />
      <section id="users" className="h-full overflow-y-auto ">
        <Container
          padding="py-12 px-2 md:px-28 lg:px-36 flex flex-col items-center gap-6"
          height={"h-full"}
        >
          {!searchParams.get("username") ? (
            <div className="flex flex-col items-center">
              <h1 className="text-[#0E5FC0] sm:text-3xl lg:text-4xl">
                Write Their usernames to get Connected
              </h1>
              <img
                src="search1.jpg"
                alt="search Photo"
                className="w-5/6 lg:w-1/2 my-5"
              />
            </div>
          ) : (
            res?.data?.result.map((item, index) => (
              <UserDiv key={index} {...item} />
            ))
          )}
        </Container>
      </section>
    </>
  );
}
