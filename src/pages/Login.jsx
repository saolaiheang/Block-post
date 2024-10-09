import React, { useState } from 'react';
import useStore from "../components/useStore";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { email, password, setEmail, setPassword } = useStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const credentials = { email: email, password };
  
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
  

      if (data.isNewAccount) {
        navigate("/signup");
      }
      
  
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };
  

  return (
    <div className="bg-purple-400 h-[100vh]">
      <div className="justify-between mx-auto flex h-[80vh] w-[70%]">
        <div className="w-full justify-center flex flex-col space-y-10">
          <h1 className="text-[40px] font-bold">Welcome!</h1>
          <p className="text-[20px]">
            Already have an account?
            <br />
            Log in with your credentials.
          </p>
          <Link to="/signup" className="bg-blue-700 text-white h-[5vh] w-[20%] items-center flex justify-center">
            Go to Sign Up
          </Link>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-gray-100 h-[60vh] w-[70%] flex flex-col items-center justify-center mx-auto bg-opacity-25 space-y-4 p-4">
            <h1 className="text-[30px] text-center font-bold w-full">Log In</h1>

            <label className="w-[70%] text-[20px]">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 w-[70%] bg-white text-black border border-gray-300"
            />

            <label className="w-[70%] text-[20px]">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 w-[70%] bg-white text-black border border-gray-300"
            />

            <button
              onClick={handleLogin}  
              className="mt-10 bg-blue-700 text-white p-3 w-[70%]"
            >
              Log In
            </button>


          </div>
        </div>
      </div>
    </div>
  ); 
       
}

export default Login;



