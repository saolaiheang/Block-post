import React, { useState } from "react";
import useStore from "../components/useStore";

function Login() {
  const {
    username, password, firstName, lastName,
    setUsername, setPassword, setFirstName, setLastName
  } = useStore();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = () => {
    console.log("Login", { username, password });
  };

  const handleSignUp = () => {
    console.log("Sign Up", { firstName, lastName, username, password });
  };

  return (
    <div className="bg-purple-400 h-[100vh]">
      <div className="justify-between mx-auto flex h-[80vh] w-[70%]">
        <div className="w-full justify-center flex flex-col space-y-10">
          <h1 className="text-[40px] font-bold">Welcome!</h1>
          <p className="text-[20px]">
            {isSignUp ? (
              <>
                Don't have an account? Create one now!
                <br />
                Fill in your details below.
              </>
            ) : (
              <>
                Already have an account?
                <br />
                Log in with your credentials.
              </>
            )}
          </p>
          <button
            className="bg-blue-700 text-white h-[5vh] w-[20%]"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Go to Log In" : "Go to Sign Up"}
          </button>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-gray-100 h-[60vh] w-[70%] flex flex-col items-center justify-center mx-auto bg-opacity-25 space-y-4 p-4">
            <h1 className="text-[30px] text-center font-bold w-full">
              {isSignUp ? "Sign Up" : "Log In"}
            </h1>

            {isSignUp && (
              <>
                <label className="w-[70%] text-[20px]">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-3 w-[70%] bg-white text-black border border-gray-300"
                />

                <label className="w-[70%] text-[20px]">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="p-3 w-[70%] bg-white text-black border border-gray-300"
                />
              </>
            )}

            <label className="w-[70%] text-[20px]">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              onClick={isSignUp ? handleSignUp : handleLogin}
              className="mt-10 bg-blue-700 text-white p-3 w-[70%]"
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
