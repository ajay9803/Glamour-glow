import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ImageViewer from "./image_viewer";
import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import CustomerReviews from "./customer_reviews_section";

const ProductDetailsComp: React.FC = () => {
  const [isFixed, setIsFixed] = useState(true);
  const navigate = useNavigate();

  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;
  const errorTextColor = themeState.errorTextColor;

  useEffect(() => {
    function isElementInViewport(el: any) {
      var rect = el.getBoundingClientRect();

      return (
        rect.bottom - 90 > 0 &&
        rect.top - 90 <=
          (window.innerHeight || document.documentElement.clientHeight)
      );
    }

    const handleScroll = () => {
      const redDivElement = document.getElementById("div-red");

      if (isElementInViewport(redDivElement)) {
        console.log("Element is in the viewport");
        setIsFixed(true);
      } else {
        console.log("Element is not in the viewport");
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex flex-col w-full my-8">
      <p className="text-lg tracking-wider font-semibold text-zinc-500 mb-5">
        {" "}
        <span
          className="hover:text-purple-400 hover:cursor-pointer"
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </span>{" "}
        / Item1
      </p>
      <div className="flex flex-col md:flex-row w-full gap-y-5 gap-x-5">
        <div className="w-full md:w-2/5 ">
          <ImageViewer isFixed={isFixed}></ImageViewer>
        </div>
        <div className="w-full md:w-3/5 mt-5">
          <div
            id="div-red"
            className="flex flex-col lg:flex-row lg:items-start w-full gap-x-3 gap-y-7"
          >
            {/* mid - component */}
            <div className="flex flex-col w-full lg:w-3/5">
              <p className="text-3xl tracking-wider font-semibold">
                {" "}
                L.A Colors Neon Gel Liner
              </p>
              <Rating
                className="mt-3"
                name="simple-controlled"
                value={5}
                readOnly
                size="medium"
              />
              <p className="text-sm"> 16 reviews </p>
              <p className="text-xl font-semibold mt-5"> Description:</p>
              <p className="text-sm mt-2">
                Let me introduce you to your next beauty bag essential. Gel
                Eyeliner combines the long wear and intense color payoff of a
                gel eyeliner with the ease of applying a pencil. The creamy
                formula glides on without tugging or skipping to create smooth
                lines. Easily sharpen the soft plastic pencil, for that “new
                pencil feeling” with every application. Let’s talk versatility.
                You can wear it like a traditional eyeliner and even wing it out
                before the liner sets or smudge it out to create some smoky eye
                realness. Not to mention the eyeliner comes in metallic, neon,
                or your favorite daily wear shades to fit any mood or occasion.
                Let me introduce you to your next beauty bag essential. Gel
                Eyeliner combines the long wear and intense color payoff of a
                gel eyeliner with the ease of applying a pencil. The creamy
                formula glides on without tugging or skipping to create smooth
                lines. Easily sharpen the soft plastic pencil, for that “new
                pencil feeling” with every application. Let’s talk versatility.
                You can wear it like a traditional eyeliner and even wing it out
                before the liner sets or smudge it out to create some smoky eye
                realness. Not to mention the eyeliner comes in metallic, neon,
                or your favorite daily wear shades to fit any mood or occasion.
                Let me introduce you to your next beauty bag essential. Gel
              </p>
              <CustomerReviews></CustomerReviews>
            </div>
            {/* the end component */}
            <div
              className={`${
                isFixed ? "sticky top-44" : "static"
              } px-5 py-6 flex flex-col w-full justify-start h-auto lg:w-2/5 ${
                darkMode
                  ? "bg-zinc-800 shadow-sm shadow-gray-500"
                  : "bg-purple-50 shadow-sm shadow-gray-700"
              }`}
            >
              <p className="tracking-wide font-semibold text-xl">LA Colors</p>
              <p className="tracking-normal font-bold text-2xl mt-5">
                Rs. 20,000
              </p>
              <div onClick={() => {}} className="relative w-full mt-7">
                <button
                  className={` w-full rounded-xl bg-gray-300 text-gray-300 px-5 py-3 font-semibold tracking-wider transition-all ease-in-out `}
                >
                  Add to Cart
                </button>
                <button
                  className={`diagonal-translate w-full absolute rounded-xl -top-2 -left-2 font-semibold tracking-wider  ${
                    darkMode ? "bg-purple-500" : "bg-black"
                  } ${errorTextColor} px-5 py-3 transition-all ease-in-out rounded-sm`}
                >
                  {" "}
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsComp;
