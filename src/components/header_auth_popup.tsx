import React, { useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import LoginPopup from "./login_pop_up";
import RegisterPopup from "./register_pop_up";

const HeaderAuthPopUp: React.FC<{ show: boolean; setShow: () => void }> = (
  props
) => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const primaryColor = themeState.primaryColor;
  const primaryTextColor = themeState.primaryTextColor;

  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(true);

  const toggleLoginPopupType = () => {
    setShowLoginPopup(!showLoginPopup);
  };
  return (
    <div
      style={{
        transition: "all 0.6s ease",
        height: props.show ? showLoginPopup ? "300px": "350px" : "0px",
      }}
      className={`${primaryTextColor} ${
        props.show ? "py-5" : "py-0"
      } ${primaryColor} z-30 overflow-hidden  w-80 flex flex-col gap-y-3 justify-start items-start   absolute top-16 -right-10 shadow-md shadow-black  px-5  rounded-md transition-all duration-200 ease-in-out`}
    >
      {showLoginPopup ? (
        <LoginPopup toggleLoginPopup={toggleLoginPopupType}></LoginPopup>
      ) : (
        <RegisterPopup toggleLoginPopup={toggleLoginPopupType}></RegisterPopup>
      )}
    </div>
  );
};

export default HeaderAuthPopUp;
