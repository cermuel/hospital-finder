import React from "react";

const Error = ({ message }) => {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-pry-light">
      <h1 className="text-white font-bold text-2xl">{message}</h1>
    </main>
  );
};

export default Error;
