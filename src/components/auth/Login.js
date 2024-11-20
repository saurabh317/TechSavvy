import React, { useCallback, useState } from "react";
import { CircularProgress } from '@mui/material';
import { MailIcon, LockClosedIcon } from "@heroicons/react/solid";
import logo from "../../assests/TechSavvyLogo.png"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = ({ SetIsLoggedIn }) => {
  const [inLogInProcess, setInLogInProcess] = useState(false)

  // once user is loggin in set token and email address to the session storage
  const postLogin = (data) => {
    sessionStorage.setItem("token", data.token)
    sessionStorage.setItem("email", data.userDetails.email)
  }

  // seding a post req to the server and collection jwt token in response
  const loginUser = useCallback(() => {
    fetch("https://coreapi.hectorai.live/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@dev.com",
        password: "#Test@123",
        isLoggedInHere: 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success('✅ Login successfull!');
        postLogin(data)
        setInLogInProcess(false)
        SetIsLoggedIn(true)
      })
      .catch((error) => {
        toast.error('❌ Failed to login!');
        setInLogInProcess(false)
        console.error("Error:", error)
      });
  }, [SetIsLoggedIn]);

  //Hanles the submittion of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    setInLogInProcess(true)
    loginUser()
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
    <div className="flex items-center justify-center flex-col gap-5 min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-blue-200 ">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Company Logo"
          className="w-30 h-20"
        />
        <h2 className="text-5xl tracking-wider text-center">TECHSAVVY</h2>
      </div>
      <div className="w-[90%] max-w-[500px] p-16 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <MailIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              <input
                type="email"
                id="email"
                className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="test@dev.com"
                readOnly
                value={"test@dev.com"}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              <input
                type="password"
                id="password"
                className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="********"
                readOnly
                value={'#Test@123'}
              />
              <p className="absolute text-pink-500 right-4 top-2.5 text-xs">
                Forgot Password?
              </p>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-end mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700"
          >
            {!inLogInProcess && <p>SIGN IN</p>}
            {inLogInProcess && <CircularProgress/>}
          </button>

        </form>
      </div>
    </div>
    </>
  );
}

export default LoginPage;
