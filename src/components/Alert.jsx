import React, { useEffect, useState } from "react";
import { useAlertAtom, ACTIONS } from "../store/AlertStore";
import { RxCross1 } from "react-icons/rx";

const colorPalette = new Map(
 [ ["success", "green"],
  ["danger", "red"],
  ["warning", "amber"]]
);
export default function Alert() {
  const [{ messege, isActive, alertType }, setAlert] = useAlertAtom();
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
      className={`fixed bottom-3 left-2 md:left-4 md:bottom-4 lg:bottom-8 lg:left-8 var-width md:w-1/2 lg:w-3/12 bg-${
        colorPalette.get(alertType)
      }-300 duration-500 text-${
        colorPalette.get(alertType)
      }-800 h-14 max-w-full flex flex-col justify-end rounded-lg overflow-hidden z-[100] ${
        !isActive ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      <div className="flex items-center flex-grow mx-3">
        <div className="flex-grow w-[20vw] text-center">{messege}</div>
        <button
          type="button"
          onClick={() => {
            setAlert({
              type: ACTIONS.CLEAR,
            });
          }}
          className={`lg:hover:bg-${colorPalette.get(alertType)}-400 duration-200 h-8 w-8 grid place-items-center rounded-full`}
        >
          <RxCross1 />{" "}
        </button>
      </div>
      <div
        className={`h-1.5 bg-${colorPalette.get(alertType)}-600`}
        style={{
          width: `${dynamicWidth}%`,
        }}
      ></div>
    </div>
  );
}
