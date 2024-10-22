import React from "react";

const Skeleton = () => {
  return (
    <div className="flex items-center h-screen justify-center">
  <span className="loading loading-ring loading-lg"></span>
    </div>
  );
};

export default Skeleton;
