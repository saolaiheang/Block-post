import { useNavigate, Link } from "react-router-dom";
import useStore from "../components/useStore";
import Btn from "../components/Btn";

function SignUp() {
  const navigate = useNavigate(); 
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
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("firstame", firstName);
        localStorage.setItem("email", email);
 
        navigate("/blogmodule");

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
    <div className="bg-slate-300 h-[100vh] max-sm:h-[140vh] max-sm:flex-col">
      <div className="justify-between mx-auto  flex  max-sm:flex-col h-[80vh] w-[70%]">
        <div className="w-full justify-center flex flex-col space-y-10">
          <h1 className="text-[40px] font-bold">Welcome!</h1>
          <p className="text-[25px]  w-[60%] max-sm:w-[100%]">
            Don't have an account? Create one now!
          
            Fill in your details below.
          </p>
          <Link to="/" className="bg-blue-700 font-bold text-white h-[5vh] w-[22%] max-sm:h-[6vh] max-sm:w-[32%]  max-sm:text-[15px] items-center flex justify-center">
            Go to Log in
          </Link>
        </div>

        <div className="w-full h-full flex items-center justify-center max-sm:mt-10">
          <div className="bg-slate-400 h-[70vh] max-sm:w-[100%] max-sm:h-[80vh] w-[70%] flex flex-col items-center justify-center mx-auto bg-opacity-25 space-y-4 p-4">
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

      
            <div onClick={handleSignUp}>
                <Btn name="              Sign Up
" />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
