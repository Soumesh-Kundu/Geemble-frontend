import { RxCross1 } from "react-icons/rx";

export default function Liked({likes,cancelFunction}) {
    return (
      <section className="h-screen w-screen grid place-items-center z-50 bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 p-4 text-black overflow-x-hidden">
        <div className="bg-white p-4 flex flex-col items-center relative w-full lg:w-1/3 h-auto rounded-lg gap-2">
          <h2 className="text-lg text-[#0E5FC0]">Likes</h2>
          <button
            type="button"
            className="absolute top-3 right-3 lg:bg-transparent duration-300 lg:hover:bg-slate-300 bg-slate-300 rounded-full p-2 text-lg text-black"
            onClick={() => {
              cancelFunction()
            }}
          >
            <RxCross1 />
          </button>
          <div className="w-full h-[1px] bg-gray-400"></div>
          {likes.length <= 0 ? (
            <div className="p-2 w-full text-center text-lg text-gray-500">No likes yet</div>
          ) : (
            likes.map((item) =>(
              <div key={item._id} className="p-2 w-full flex gap-3 items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                <img src={/firebasestorage/.test(item.profilePicture)?item.profilePicture:`${import.meta.env.VITE_BASE_URL}/api/${item.profilePicture}`} alt="dp picture" className="w-full rounded-full h-full object-cover" />
                </div>
                <div className="text-[#0E5FC0] text-lg">@{item.user}</div>
              </div>
            ))
          )}
        </div>
      </section>
    );
  }