import Input from "../components/Input";
import React, { useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Toaster } from "react-hot-toast";
import { LoginFunc } from "../functions/auth";

const Login = () => {
  const [loginDetails, changeLoginDetails] = useState({
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
      <Toaster />
      <section className="h-full w-full max-w-[700px] flex justify-center items-center flex-col md:px-40 px-4">
        <h2 className="text-2xl w-full text-white text-left font-semibold mb-1">
          Sign In
        </h2>
        <p className="text-xs w-full text-left mb-4 text-light">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-pry underline">
            Register
          </Link>
        </p>
        <Input
          props={{
            type: "email",
            label: "Email",
            onChange: (e) => {
              changeLoginDetails({ ...loginDetails, email: e.target.value });
            },
          }}
        />
        <Input
          props={{
            type: "password",
            label: "Password",
            onChange: (e) => {
              changeLoginDetails({
                ...loginDetails,
                password: e.target.value,
              });
            },
          }}
        />
        <Button
          props={{
            title: "Login",
            isLoading: isLoading,
            onClick: () => {
              LoginFunc({ loginDetails, navigate, setIsLoading });
            },
          }}
        />
      </section>
    </div>
  );
};

export default Login;
