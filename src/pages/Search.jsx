import { Container } from "../layouts";
import { Link } from "react-router-dom";
import { dummyData } from "../data/user";
import Searchbar from "../components/Searchbar";

function UserDiv({name,username,profilePicture}){
  return (
    <Link to={`/profile/${username}`} className="bg-gray-100 hover:bg-gray-300 duration-300 w-full px-4 py-2 rounded-xl md:py-3 flex gap-5 items-center justify-start" >
        <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-pink-600" >
          
        </div>
        <div className="flex flex-col justify-start">
          <div className="text-[#0e5fc0] text-xl ">@{username}</div>
          <div className=" text-slate-500 text-md">{name}</div>
        </div>
    </Link>
  )
} 

export default function search() {
  return (
    <>
      {window.innerWidth<1080 && <Searchbar styling="py-4 px-4 md:p-4 bg-nav-gradient sticky top-[4.8rem] md:top-[4.73rem] z-10 rounded-b-3xl -translate-y-2 md:translate-y-0"/>}
      <section id="users" className="h-full overflow-y-auto ">
        <Container padding="py-12 px-2 md:px-28 lg:px-36 flex flex-col items-center gap-6">
            {dummyData.map((item,index)=><UserDiv key={index} {...item}/>)}
        </Container>
      </section>
    </>
  );
}
