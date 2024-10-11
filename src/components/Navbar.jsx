
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

function Navbar() {
  const email = localStorage.getItem("email"); 

  return (
    <>
      <div className="bg-blue-800">
        <div className="justify-between w-[80%] mx-auto items-center flex h-[100px] ">
          <div className="items-center flex ">
            <h1 className="text-[30px] font-serif font-bold text-white">BugBlaster</h1>
          </div>
          <div>
            <Link to={{ pathname: "/user", state: { email } }}>
              <CgProfile size={40} color="white" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
