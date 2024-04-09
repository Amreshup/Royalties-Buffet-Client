import React from "react";
import buffer from "../../public/logo.png"

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
   <img src={buffer} className="w-72"/>
  </div>
  );
};

export default LoadingSpinner;
