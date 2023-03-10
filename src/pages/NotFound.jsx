import {useNavigate} from "react-router-dom";
import Background from "../components/Background";

export default function NotFound() {
  const navigate=useNavigate()
  return (
    <>
      <div className="flex flex-col  justify-center items-center -translate-y-16 overflow-hidden h-full w-full">
        <h2 className="w-full rounded-xl text-9xl translate-y- text-white text-center flex justify-center gap-5">
          <span
            className="float"
            style={{
              "--delay": 0,
            }}
          >
            4
          </span>
          <span
            className="float"
            style={{
              "--delay": 1,
            }}
          >
            0
          </span>
          <span
            className="float"
            style={{
              "--delay": 2,
            }}
          >
            4
          </span>
        </h2>
        <h3 className="text-white  text-3xl mt-3 flex gap-5">
          <div className="flex gap-0">
            <span
              className="float"
              style={{
                "--delay": 0,
              }}
            >
              N
            </span>
            <span
              className="float"
              style={{
                "--delay": 0.4,
              }}
            >
              o
            </span>
            <span
              className="float"
              style={{
                "--delay": 0.8,
              }}
            >
              t
            </span>
          </div>
          <div className="flex gap-0">
            <span
              className="float"
              style={{
                "--delay": 1.2,
              }}
            >
              F
            </span>
            <span
              className="float"
              style={{
                "--delay": 1.6,
              }}
            >
              o
            </span>
            <span
              className="float"
              style={{
                "--delay": 2.0,
              }}
            >
              u
            </span>
            <span
              className="float"
              style={{
                "--delay": 2.4,
              }}
            >
              n
            </span>
            <span
              className="float"
              style={{
                "--delay": 2.8,
              }}
            >
              d
            </span>
          </div>
        </h3> 
        <button type='button' onClick={()=>{
          navigate(-1)
        }} className="text-white px-6 py-2 mt-8 border-2 border-white duration-300 lg:hover:bg-white lg:hover:text-[#5e8dc7]">Go Back</button>
      </div>
      <Background />
    </>
  );
}
