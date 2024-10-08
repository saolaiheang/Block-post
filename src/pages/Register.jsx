import useStore from "../components/useStore";
import { Link } from "react-router-dom";

function SignUp() {
  const {
    setEmail,
    setPassword,
    setFirstName,
    setLastName,
    email,
    password,
    firstName,
    lastName,
  } = useStore();

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const userDetails = { firstName, lastName, email, password };

    try {
      const response = await fetch("https://students-hackaton.vercel.app/user/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign up successful!");
        console.log("Sign Up successful", data);
        localStorage.setItem("token", data.token);
      } else {
        alert("Sign up failed: " + data.message);
        console.error("Sign up failed", data);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="bg-purple-400 h-[100vh]">
      <div className="justify-between mx-auto flex h-[80vh] w-[70%]">
        <div className="w-full justify-center flex flex-col space-y-10">
          <h1 className="text-[40px] font-bold">Welcome!</h1>
          <p className="text-[20px]">
            Don't have an account? Create one now!
            <br />
            Fill in your details below.
          </p>
          <Link to="/" className="bg-blue-700 text-white h-[5vh] items-center flex justify-center w-[20%]">
            Go to Log in
          </Link>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-gray-100 h-[60vh] w-[70%] flex flex-col items-center justify-center mx-auto bg-opacity-25 space-y-4 p-4">
            <h1 className="text-[30px] text-center font-bold w-full">Sign Up</h1>

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
              onClick={handleSignUp}
              className="mt-10 bg-blue-700 text-white p-3 w-[70%]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
