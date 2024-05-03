import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import Rating from "@mui/material/Rating";

const ProductDetailsSidebar: React.FC<{
  isOpen: boolean;
  toggleSidebar: () => void;
}> = (props) => {
  const images = [
    "https://media.glamour.com/photos/65512d4c24522f9dbd630bb5/4:3/w_2035,h_1526,c_limit/Lux-Makeup-Beauty-Awards.jpg",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-iugAQV5fmEY2kGWi7XPFpdrwRU99ackxP6KZNeHmP9uademLaY4YyIYcm8XnvaLT1OFjlGitmJXkoKp1uDAgL0c151kIoFEInsKcCcpDe8boiHWyiYnZFgF8AaXabrA2uIqwAM2Ka7Q/s640/HEADDER.jpg",
    "https://www.lizzieinlace.com/wp-content/uploads/2020/06/2-pink-beauty-products.jpg",
    "https://media.glamour.com/photos/65512d4c24522f9dbd630bb5/4:3/w_2035,h_1526,c_limit/Lux-Makeup-Beauty-Awards.jpg",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-iugAQV5fmEY2kGWi7XPFpdrwRU99ackxP6KZNeHmP9uademLaY4YyIYcm8XnvaLT1OFjlGitmJXkoKp1uDAgL0c151kIoFEInsKcCcpDe8boiHWyiYnZFgF8AaXabrA2uIqwAM2Ka7Q/s640/HEADDER.jpg",
    "https://www.lizzieinlace.com/wp-content/uploads/2020/06/2-pink-beauty-products.jpg",
  ];

  const themeSlice = useAppSelector((state) => {
    return state.theme;
  });

  const primaryColor = themeSlice.primaryColor;
  const errorColor = themeSlice.errorColor;
  const errorTextColor = themeSlice.errorTextColor;
  const darkMode = themeSlice.darkMode;
  return (
    <div
      style={{
        scrollbarWidth: "thin",
      }}
      className={` ${primaryColor} ${
        props.isOpen ? "mx-5 my-5" : "my-5 mx-0"
      } fixed flex flex-row gap-x-5 z-50  w-full md:w-3/4 lg:w-4/6 top-0 bottom-0  right-0 transition-transform duration-1000 ${
        props.isOpen ? "translate-x-0" : "translate-x-full"
      } px-4 py-4 rounded-xl`}
    >
      <div
        style={{
          scrollbarWidth: "thin",
        }}
        className="flex flex-col overflow-y-scroll w-full gap-y-5"
      >
        {images.map((image) => {
          return (
            <img
              className="h-72 w-full rounded-xl border border-solid border-black"
              src={image}
              alt="product"
            />
          );
        })}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-end">
          <div
            onClick={props.toggleSidebar}
            className={`cursor-pointer flex flex-row justify-center items-center h-10 w-10 rounded-full ${errorColor} ${errorTextColor}`}
          >
            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
          </div>
        </div>
        <p className="text-2xl font-semibold mb-3 tracking-widest">
          {" "}
          L.A. Colors Color Vibe 12 Color Eyeshadow Palette{" "}
        </p>
        <p className="text-gray-500 text-lg"> 707 Rose</p>
        <Rating
          className="my-3"
          name="simple-controlled"
          value={5}
          readOnly
          size="small"
        />
        <p className="font-semibold text-xl tracking-wider my-5">
          {" "}
          Rs. 432,000
        </p>
        <div className="relative w-full mt-7">
          <button
            className={` w-full rounded-xl bg-gray-300 text-gray-300 px-5 py-3 font-semibold tracking-wider transition-all ease-in-out `}
          >
            {" "}
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
  );
};

export default ProductDetailsSidebar;
