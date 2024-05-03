import { useAppSelector } from "../hooks/hooks";

const LoginPopup: React.FC<{ toggleLoginPopup: () => void }> = (props) => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;
  const errorTextColor = themeState.errorTextColor;
  return (
    <div className="w-full flex flex-col gap-y-3 justify-start items-start  ">
      <p className="font-semibold tracking-wider"> Login </p>
      <input
        onChange={(e) => {}}
        placeholder="Email"
        className={`px-2 py-1.5 rounded-2xl w-full shadow-sm shadow-black placeholder-gray-500 ${
          darkMode
            ? "bg-zinc-800 border border-solid border-gray-400"
            : "bg-white"
        }`}
      />
      <input
        onChange={(e) => {}}
        placeholder="Password"
        className={`px-2 py-1.5 rounded-2xl w-full shadow-sm shadow-black placeholder-gray-500 ${
          darkMode
            ? "bg-zinc-800 border border-solid border-gray-400"
            : "bg-white"
        }`}
      />
      <div className="relative w-full mt-3">
        <button
          className={` w-full rounded-xl bg-gray-300 text-gray-300 px-4 py-2 font-semibold tracking-wider transition-all ease-in-out `}
        >
          {" "}
          Login
        </button>
        <button
          className={`diagonal-translate w-full absolute rounded-xl -top-2 -left-2 font-semibold tracking-wider  ${
            darkMode ? "bg-purple-500" : "bg-black"
          } ${errorTextColor} px-4 py-2 transition-all ease-in-out rounded-sm`}
        >
          {" "}
          Login
        </button>
      </div>
      <p className="text-sm underline decoration-1 w-full text-center">
        {" "}
        Forgot your password ?
      </p>
      <p
        onClick={props.toggleLoginPopup}
        className="text-sm underline decoration-1 w-full text-center cursor-pointer"
      >
        {" "}
        Create Account
      </p>
    </div>
  );
};

export default LoginPopup;
