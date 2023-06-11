import React, { useEffect, useState } from "react";
import { useAlertAtom, ACTIONS } from "../store/AlertStore";
import { RxCross1 } from "react-icons/rx";

const amberPallete=['bg-amber-300','text-amber-800','bg-amber-400','bg-amber-600']
const greenPallete=['bg-green-300','text-green-800','bg-green-400','bg-green-600']
const redPallete=['bg-red-300','text-red-800','bg-red-400','bg-red-600']
const colorPalette = {
  "success":greenPallete,
  "error": redPallete,
  "warning": amberPallete
};
export default function Alert() {
  const [{messege,isActive,alertType}, setAlert] = useAlertAtom();
  const [dynamicWidth, setDynamicWidth] = useState(0);
  useEffect(() => {
    setDynamicWidth(0);
    setDynamicWidth(100);
    const TimeInterval = setInterval(() => {
      if (dynamicWidth > 0) {
        setDynamicWidth((prev) => prev - 0.1);
      }
    }, 8);
    const TimeOut = setTimeout(() => {
      clearInterval(TimeInterval);
      setAlert({
        type: ACTIONS.CLEAR,
      });
    }, 8200);
    return () => {
      clearTimeout(TimeOut);
    };
  }, [isActive]);
  return (
    <div
      className={`fixed bottom-3 left-2 md:left-4 md:bottom-4 lg:bottom-8 lg:left-8 var-width md:w-1/2 lg:w-3/12 ${
        colorPalette[alertType]?.at(0)
      } duration-500 ${
        colorPalette[alertType]?.at(1)
      } h-auto max-w-full flex flex-col justify-end rounded-lg overflow-hidden z-[100] ${
        !isActive ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      <div className="flex items-center flex-grow mx-3 my-2">
        <div className="flex-grow w-[20vw] text-center">{messege}</div>
        <button
          type="button"
          onClick={() => {
            setAlert({
              type: ACTIONS.CLEAR,
            });
          }}
          className={`${alertType==='success'?"lg:hover:bg-green-400":alertType==='error'?'lg:hover:bg-red-400':'lg:hover:bg-amber-400'} duration-300 h-8 w-8 grid place-items-center rounded-full`}
        >
          <RxCross1 />{" "}
        </button>
      </div>
      <div
        className={`h-1.5 ${colorPalette[alertType]?.at(3)}`}
        style={{
          width: `${dynamicWidth}%`,
        }}
      ></div>
    </div>
  );
}
