import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

function Navbar() {
  const [profileImage, setProfileImage] = useState(null);
  const email = localStorage.getItem("email");
  const navigate = useNavigate(); 

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }

    const handleStorageChange = () => {
      const updatedImage = localStorage.getItem("profileImage");
      setProfileImage(updatedImage);
    };

    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Clean up the event listener on unmount
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      localStorage.removeItem("profileImage");
      navigate("/signup");
    }
  };

  return (
    <>

      <div className="bg-white mt-5">
        <div className="justify-between w-[85%] mx-auto items-center flex h-[100px] ">
          <div className="items-center flex ">
           <Link to="/blogmodule"> <h1 className="text-[35px] font-serif font-bold text-blue-500">BugBlaster</h1></Link>

          </div>

          <div className="flex-row flex space-x-10 items-center">
            <Link to="/user">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover cursor-pointer"
                />
              ) : (
                <CgProfile size={40} color="white" />
              )}

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
