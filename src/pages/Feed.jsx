import { Container } from "../layouts";
import { dummyData } from "../data/feed";
import Post from "../components/Post";
import { Outlet } from "react-router-dom";

export default function Feed() {
  
  return (
    <div >
      <Container padding={"p-2 md:p-6 lg:px-8 lg:py-3"}>
        <div className="w-full  text-white md:mt-5 flex flex-col gap-10
         items-center" id="feed">
          {dummyData?.map((item, index) => (
            <div className="w-full md:w-8/12 lg:w-[35%]" key={index}>
              <Post {...item} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
