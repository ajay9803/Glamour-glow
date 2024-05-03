import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageSelectors from "../../components/image-selector";
import { useAppSelector } from "../../hooks/hooks";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "../../styles/diagonal-transition.css";
import "../../styles/home.css";

const CarouselProductItem: React.FC<{ index: number }> = (props) => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;
  const errorTextColor = themeState.errorTextColor;

  const [quantity, setQuantity] = useState<number>(0);
  return (
    <div
      key={props.index}
      className={`slick-slide w-full mt-10 border border-solid   rounded-lg ${
        darkMode ? "bg-zinc-800 border-white" : "bg-violet-50 border-black"
      }   `}
    >
      <div className="w-full flex flex-col md:flex-row gap-x-5 gap-y-5">
        <div className="w-full md:w-2/3 ">
          <ImageSelectors
            images={[
              "https://media.glamour.com/photos/65512d4c24522f9dbd630bb5/4:3/w_2035,h_1526,c_limit/Lux-Makeup-Beauty-Awards.jpg",
              "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-iugAQV5fmEY2kGWi7XPFpdrwRU99ackxP6KZNeHmP9uademLaY4YyIYcm8XnvaLT1OFjlGitmJXkoKp1uDAgL0c151kIoFEInsKcCcpDe8boiHWyiYnZFgF8AaXabrA2uIqwAM2Ka7Q/s640/HEADDER.jpg",
              "https://www.lizzieinlace.com/wp-content/uploads/2020/06/2-pink-beauty-products.jpg",
            ]}
          ></ImageSelectors>
        </div>
        <div className="flex flex-col">
          <p className="text-2xl tracking-wider">
            {" "}
            Skin1003 Centella Travel Kit
          </p>
          <p className="pt-6 font-semibold text-xl"> Rs. 42,000</p>
          <p className="text-xm pt-1">
            {" "}
            Tax included. <span className="text-purple-500">Shipping</span>{" "}
            calculated at checkout.
          </p>
          <p className="pt-7 font-semibold text-lg tracking-wider"> Quantity</p>
          <div className="flex flex-row items-center gap-x-4 pt-2">
            <div
              onClick={() => {
                if (quantity > 0) {
                  setQuantity(quantity - 1);
                }
              }}
              className={`cursor-pointer border border-solid ${
                darkMode
                  ? "bg-zinc-900 border-white text-white"
                  : "bg-white border-black text-black "
              } h-11 w-11 rounded-xl text-center flex flex-row justify-center items-center`}
            >
              <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
            </div>
            <p className="font-semibold"> {quantity} </p>
            <div
              onClick={() => {
                setQuantity(quantity + 1);
              }}
              className={`cursor-pointer border border-solid ${
                darkMode
                  ? "bg-zinc-900 border-white text-white"
                  : "bg-white border-black text-black "
              } h-11 w-11 rounded-xl text-center flex flex-row justify-center items-center`}
            >
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </div>
          </div>
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
    </div>
  );
};

export default CarouselProductItem;
