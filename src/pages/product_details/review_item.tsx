import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { Rating } from "@mui/material";

const ReviewItem: React.FC = () => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;
  const errorColor = themeState.errorColor;

  return (
    <div className={`w-full flex flex-col `}>
      <div className="flex flex-row gap-x-5">
        <div
          className={`h-12 w-12 flex flex-col items-center justify-center shadow-sm shadow-black rounded-full ${
            darkMode
              ? "border border-solid border-white"
              : "border border-solid border-black"
          }`}
        >
          {" "}
          <p> P</p>
        </div>
        <div className="flex flex-col">
          <p> Alisha</p>
          <div className="flex flex-row items-center gap-x-7">
            <Rating
              className=""
              name="simple-controlled"
              value={5}
              readOnly
              size="small"
            />
            <p className="text-sm text-gray-600 tracking-wider"> 16 March, 2024 </p>
          </div>
        </div>
      </div>
      <p className="my-3"> This is my comment. 😊</p>
      <div style={{
        height: "0.5px"
      }} className={`${errorColor}`}></div>
    </div>
  );
};

export default ReviewItem;
