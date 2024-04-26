import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Loader = () => {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-pry-light">
      <AiOutlineLoading3Quarters className="animate-spin text-white text-4xl" />
    </main>
  );
};

export default Loader;
