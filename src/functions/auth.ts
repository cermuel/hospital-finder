import axios from "axios";
import toast from "react-hot-toast";

//@ts-ignore
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const LoginFunc = async ({ loginDetails, setIsLoading, navigate }) => {
  setIsLoading(true);
  if (loginDetails.email === "") {
    toast.error("Email is required");
    setIsLoading(false);
  } else if (loginDetails.password === "") {
    toast.error("Password is required");
    setIsLoading(false);
  } else {
    try {
      const user = await axios.post(`${BASE_URL}/auth/login`, loginDetails);
      console.log(user.data);
      localStorage.setItem("amaka_token", user.data.token);
      localStorage.setItem("amaka_user", JSON.stringify(user.data.user));
      toast.success(user.data.message);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
      setIsLoading(false);
    } catch (error) {
      let message =
        error?.response?.data?.message || error?.message || "An error occurred";
      toast.error(message);
      console.log(error);
      setIsLoading(false);
    }
  }
};

export const RegisterFunc = async ({
  registerDetails,
  setIsLoading,
  navigate,
}) => {
  setIsLoading(true);
  if (registerDetails.name === "") {
    toast.error("Name is required");
    setIsLoading(false);
  } else if (registerDetails.email === "") {
    toast.error("Email is required");
    setIsLoading(false);
  } else if (registerDetails.password === "") {
    toast.error("Password is required");
    setIsLoading(false);
  } else {
    try {
      const user = await axios.post(
        `${BASE_URL}/auth/register`,
        registerDetails
      );
      toast.success(user.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
      setIsLoading(false);
    } catch (error) {
      let message =
        error?.response?.data?.message || error?.message || "An error occurred";
      toast.error(message);
      console.log(error);
      setIsLoading(false);
    }
  }
};

export const LogoutFunc = ({ navigate }) => {
  localStorage.removeItem("amaka_user");
  navigate("/");
};
