import React, { useState } from 'react';
import useStore from "../components/useStore";
import { Link, useNavigate } from "react-router-dom";
import Btn from '../components/Btn';

function Login() {
  const { email, password, setEmail, setPassword } = useStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const credentials = { email, password };
  
    try {
      console.log("Attempting to log in with:", { email });
  
      const response = await fetch("https://students-hackaton.vercel.app/user/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please check your credentials.");
        return;
      }
  
      const data = await response.json();
      console.log("Login successful", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("firstName", data.user.firstName || ""); 
      localStorage.setItem("lastName", data.user.lastName || ""); 
      
      if (data.isNewAccount) {
        navigate("/signup");
      } else {
        navigate("/blogmodule");
      }
  
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };
  
  return (
    <div>
      <div className="bg-slate-300 h-[100vh] max-sm:h-[110vh]">
        <div className="justify-between mx-auto flex h-[80vh] w-[70%]  l max-sm:flex-col max-md:flex-row">
          <div className="w-full max-sm:mt-10 justify-center max-sm:flex-col flex flex-col space-y-10">
            <h1 className="text-[40px] font-bold">Welcome!</h1>
            <p className="text-[25px] w-[60%] max-sm:w-[100%]">
              Already have an account?
              
              Log in with your credentials.
            </p>
            <Link to="/signup" className="bg-blue-700 font-bold text-white h-[5vh] w-[22%] max-sm:h-[6vh] max-sm:w-[32%]  max-sm:text-[15px] items-center flex justify-center">
              Go to Sign Up
            </Link>
          </div>

          <div className="w-full h-full flex items-center max-sm:flex-col justify-center">
            <div className="bg-slate-400 mt-10 h-[50vh] max-sm:w-[100%] w-[70%] max-sm:flex-col flex flex-col items-center justify-center mx-auto bg-opacity-25 space-y-4 p-4">
              <h1 className="text-[30px] text-center font-bold w-full">Log In</h1>

              <label className="w-[70%] max-sm:w-[100%] max-sm:text-[15px] text-[20px]">Email</label>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 w-[70%] max-sm:w-[100%] bg-white text-black border border-gray-300"
              />

              <label className="w-[70%] max-sm:w-[100%] max-sm:text-[15px] text-[20px]">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 w-[70%] max-sm:w-[100%] bg-white text-black border border-gray-300"
              />

           
              <div onClick={handleLogin}>
                <Btn name="Log In" />
              </div>

              {error && <p className="text-red-500">{error}</p>} 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
