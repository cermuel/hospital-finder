import Input from "../components/Input";
import React, { useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { RegisterFunc } from "../functions/auth";

const Register = () => {
  const [registerDetails, changeRegisterDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("amaka_user"));

  useLayoutEffect(() => {
    console.log(user);
    if (user !== null) {
      navigate("/home");
      window.location.reload();
    }
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-dark">
      <section className="h-full w-full max-w-[700px] flex justify-center items-center flex-col md:px-40 px-4">
        <h2 className="text-2xl w-full text-white text-left font-semibold mb-1">
          Sign Up
        </h2>
        <p className="text-xs w-full text-left mb-4 text-light">
          Already have an account?{" "}
          <Link to={"/"} className="text-pry underline">
            Login
          </Link>
        </p>
        <Input
          props={{
            type: "text",
            label: "Name",
            onChange: (e) => {
              changeRegisterDetails({
                ...registerDetails,
                name: e.target.value,
              });
            },
          }}
        />{" "}
        <Input
          props={{
            type: "email",
            label: "Email",
            onChange: (e) => {
              changeRegisterDetails({
                ...registerDetails,
                email: e.target.value,
              });
            },
          }}
        />
        <Input
          props={{
            type: "password",
            label: "Password",
            onChange: (e) => {
              changeRegisterDetails({
                ...registerDetails,
                password: e.target.value,
              });
            },
          }}
        />
        <Button
          props={{
            title: "Register",
            isLoading: isLoading,
            onClick: () =>
              RegisterFunc({ registerDetails, setIsLoading, navigate }),
          }}
        />
      </section>
    </div>
  );
};

export default Register;
