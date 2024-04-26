import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Button = ({ props }) => {
  return (
    <button
      //   disabled={props.isLoading}
      onClick={props.onClick}
      className={`w-full py-3 mt-10 text-center flex justify-center ${
        props.isLoading == true && "cursor-not-allowed"
      } rounded-lg font-bold tracking-wider text-white bg-pry
    `}
      disabled={props.isLoading}
    >
      {props.isLoading ? (
        <AiOutlineLoading className="text-xl text-center animate-spin" />
      ) : (
        props.title
      )}
    </button>
  );
};

export default Button;
