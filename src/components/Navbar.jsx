import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

function Navbar() {
  const email = localStorage.getItem("email");
  const navigate = useNavigate(); 

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      navigate("/signup");
    }
  };

  return (
    <>
      <div className="bg-blue-800">
        <div className="justify-between w-[80%] mx-auto items-center flex h-[100px]">
          <div className="items-center flex">
            <h1 className="text-[30px] font-serif font-bold text-white">BugBlaster</h1>
          </div>
          <div className="flex-row flex space-x-10">
            <Link to={{ pathname: "/user", state: { email } }}>
              <CgProfile size={40} color="white" />
            </Link>
            <button onClick={handleLogout} className="focus:outline-none">
              <IoLogOutOutline size={40} color="red" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
