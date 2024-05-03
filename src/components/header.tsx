import {
  faBars,
  faMicrophone,
  faMoon,
  faSearch,
  faShoppingBag,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { themeSliceActions } from "../slices/theme_slice";
import ThePulseLoader from "./pulse-loader";
import SearchItem from "../pages/home/search_item";
import HeaderAuthPopUp from "./header_auth_popup";
import { useNavigate } from "react-router-dom";
import useSpeechRecognition from "../hooks/speech_recognition_hook";

const TheHeader: React.FC = () => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });
  const darkMode = themeState.darkMode;
  const primaryColor = themeState.primaryColor;
  const primaryTextColor = themeState.primaryTextColor;

  const cartState = useAppSelector((state) => {
    return state.cart;
  });

  let totalItemCount = cartState.totalItemCount;
  let totalPrice = cartState.totalPrice;

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAuthPopup, setShowAuthPopup] = useState<boolean>(false);

  const toggleAuthPopup = () => {
    setShowAuthPopup(!showAuthPopup);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const dispatch = useAppDispatch();
  let products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const navigate = useNavigate();

  const {
    text,
    startListening,
    isListening,
    hasRecognitionSupport,
    setTextValue,
  } = useSpeechRecognition();

  return (
    <div className="flex flex-col sticky top-0 z-30">
      {(showSearchBar || showAuthPopup) && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
          }}
          className="fixed top-24 right-0 h-full w-screen bg-black bg-opacity-80 z-20"
          onClick={() => {
            setShowSearchBar(false);
            setShowAuthPopup(false);
          }}
        ></div>
      )}
      <div className="w-full flex flex-row items-center justify-between px-10 py-8 bg-zinc-950 text-white gap-x-6">
        <div className="flex lg:hidden mt-1.5 pr-4 ">
          <FontAwesomeIcon
            icon={faBars}
            className="text-2xl cursor-pointer transition-transform duration-500 ease-in-out"
            style={{
              transform: showMenu ? "rotate(90deg) " : "rotate(0deg)",
            }}
            onClick={toggleMenu}
          />
        </div>
        <p
          onClick={() => {
            navigate("/home");
          }}
          style={{
            textShadow: "2px 2px purple",
          }}
          className="font-semibold text-xl tracking-wider cursor-pointer"
        >
          {" "}
          PRETTYCLICK
        </p>
        <div className="relative hidden lg:flex w-2/4">
          <input
            onClick={() => {
              setShowSearchBar(true);
            }}
            onChange={(e) => {
              setTextValue(e.target.value);
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 3000);
            }}
            value={text}
            placeholder="What are you looking for ?"
            className="px-3 py-2 rounded-3xl  bg-zinc-900  w-full pl-10 pr-14"
          />
          <FontAwesomeIcon
            onClick={() => {}}
            className="absolute top-3 left-3"
            icon={faSearch}
          ></FontAwesomeIcon>
          <p
            className="absolute top-1.5 right-12 cursor-pointer "
            onClick={() => {
              setTextValue("");
              setShowSearchBar(false);
            }}
          >
            {" "}
            Clear{" "}
          </p>
          <FontAwesomeIcon
            onClick={() => {
              if (isListening) {
                return;
              }
              startListening();
            }}
            className="absolute top-3 right-5 cursor-pointer"
            icon={faMicrophone}
          ></FontAwesomeIcon>
          {showSearchBar && (
            <div
              style={{
                scrollbarWidth: "none",
              }}
              className={`z-30 max-h-96 rounded-xl absolute overflow-y-scroll top-11 left-0 right-0 py-10 shadow-md shadow-black ${primaryColor} ${primaryTextColor}`}
            >
              {isLoading && (
                <div className="flex flex-row justify-center">
                  <ThePulseLoader />
                </div>
              )}
              {!isLoading && (
                <div className="flex flex-col px-6">
                  <p className="mb-3 text-sm font-semibold tracking-wider">
                    Products
                  </p>
                  <div className=" grid grid-cols-1 md:grid-cols-2  gap-3">
                    {products.map((product) => (
                      <SearchItem></SearchItem>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-row gap-x-5 items-center">
          <FontAwesomeIcon
            className="cursor-pointer text-lg hidden lg:flex"
            onClick={() => {
              dispatch(themeSliceActions.toggleDarkMode());
            }}
            icon={darkMode ? faSun : faMoon}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className="cursor-pointer text-2xl flex lg:hidden"
            onClick={() => {
              setShowSearchBar(!showSearchBar);
            }}
            icon={faSearch}
          ></FontAwesomeIcon>
          <div className="relative">
            <FontAwesomeIcon
              onClick={() => {
                setShowAuthPopup(!showAuthPopup);
              }}
              className="cursor-pointer  text-lg hidden lg:flex"
              icon={faUser}
            ></FontAwesomeIcon>
            <HeaderAuthPopUp
              show={showAuthPopup}
              setShow={toggleAuthPopup}
            ></HeaderAuthPopUp>
          </div>
          <div
            onClick={() => {
              navigate("/my-cart");
            }}
            className="relative w-full flex flex-row items-center gap-x-3 border border-solid border-white px-4 py-2 rounded-md shadow-md shadow-white cursor-pointer"
          >
            <FontAwesomeIcon
              className="text-lg"
              icon={faShoppingBag}
            ></FontAwesomeIcon>
            {totalItemCount > 0 && (
              <p className="font-semibold tracking-widest hidden md:flex">
                {" "}
                Rs. {totalPrice}
              </p>
            )}
            {totalItemCount > 0 && (
              <p
                style={{
                  fontSize: "11px",
                }}
                className="text-white shadow-sm shadow-white absolute -top-2 -right-2 bg-purple-500 rounded-full flex py-0.5 px-1.5"
              >
                {totalItemCount}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* search results */}
      {showSearchBar && (
        <div
          className={`${primaryColor} max-h-96 z-30 overflow-y-scroll fixed flex lg:hidden flex-col top-28 right-0 left-0 py-10 rounded-b-2xl shadow-sm shadow-black mb-20 `}
          style={{
            scrollbarWidth: "none",
          }}
        >
          <div className="relative shadow-md shadow-black my-7 mx-6">
            <input
              value={text}
              onChange={(e) => {
                setTextValue(e.target.value);
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                }, 3000);
              }}
              placeholder="What are you looking for ?"
              className={`px-3 py-3 rounded-sm  w-full pl-10 pr-16  ${primaryColor} ${primaryTextColor}`}
            />
            <FontAwesomeIcon
              className="absolute top-4 left-3"
              icon={faSearch}
            />

            <p
              onClick={() => {
                setTextValue("");
                setShowSearchBar(false);
              }}
              className="absolute top-3 right-12 hover:cursor-pointer"
            >
              {" "}
              Clear{" "}
            </p>
            <FontAwesomeIcon
              onClick={() => {
                if (isListening) {
                  return;
                }
                startListening();
              }}
              className="absolute top-4 right-5 cursor-pointer"
              icon={faMicrophone}
            ></FontAwesomeIcon>
          </div>
          {isLoading && (
            <div className="flex flex-row justify-center">
              <ThePulseLoader />
            </div>
          )}
          {!isLoading && (
            <div className="flex flex-col px-6">
              <p className="mb-3 text-sm font-semibold tracking-wider">
                Products
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {products.map((product) => (
                  <SearchItem></SearchItem>
                ))}
              </div>
            </div>
          )}
          <div className="h-10"></div>
        </div>
      )}

      {/* general categories */}
      <div
        className={`flex-row  hidden lg:flex ${
          darkMode ? "bg-black" : "bg-slate-100"
        }`}
      >
        <p className="font-semibold cursor-pointer hover:bg-purple-700 px-5 py-4 transition-all duration-200 ease-in">
          {" "}
          Makeup +
        </p>
        <p className="font-semibold cursor-pointer hover:bg-purple-700 px-5 py-4 transition-all duration-200 ease-in">
          {" "}
          Skincare +
        </p>
        <p className="font-semibold cursor-pointer hover:bg-purple-700 px-5 py-4 transition-all duration-200 ease-in">
          {" "}
          Body +
        </p>
        <p className="font-semibold cursor-pointer hover:bg-purple-700 px-5 py-4 transition-all duration-200 ease-in">
          {" "}
          Accessories +
        </p>
      </div>
    </div>
  );
};

export default TheHeader;
