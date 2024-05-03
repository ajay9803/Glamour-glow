import React from "react";
import { PulseLoader } from "react-spinners";

const ThePulseLoader: React.FC = () => {
  return (
    <PulseLoader
      color={"purple"}
      
      //   cssOverride={override}
      size={12}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default ThePulseLoader;
