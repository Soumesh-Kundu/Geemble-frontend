import { Container } from "../layouts";
import { dummyData } from "../data/feed";
import Post from "../components/Post";
import { Outlet } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPosts } from "../api/post";
import Loader2 from "../components/Loader2";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { isLoading, isSuccess, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
      getNextPageParam: (prevData) => prevData.nextPage,
      refetchOnWindowFocus: false,
      enabled:localStorage.getItem('authToken')!==null
    });

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setPosts(data?.pages?.flatMap(item=>item.posts));
    }
  }, [data]);

  if (isLoading && posts.length === 0) {
    return <Loader2 />;
  }

  return (
    <div  >
      {
        <Container padding={"p-2 md:p-6 lg:px-8 lg:py-3"}>
          <InfiniteScroll
            hasMore={hasNextPage}
            dataLength={posts.length}
            next={fetchNextPage}
            loader={<Loader2 />}
            scrollableTarget='scrollableDiv'
          >
            <div
              className="w-full  text-white md:mt-5 flex flex-col gap-10
         items-center"
              id="feed"
            >
              {posts?.map((item, index) => (
                <div className="w-full md:w-8/12 lg:w-[35%]" key={index}>
                  <Post {...item} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </Container>
      }
    </div>
  );
}
