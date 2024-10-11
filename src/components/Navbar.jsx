
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

function Navbar() {
  const email = localStorage.getItem("email"); 

  return (
    <>
      <div className="bg-white mt-5">
        <div className="justify-between w-[85%] mx-auto items-center flex h-[100px] ">
          <div className="items-center flex ">
           <Link to="/blogmodule"> <h1 className="text-[35px] font-serif font-bold text-blue-500">BugBlaster</h1></Link>
          </div>
          <div>
            <Link to={{ pathname: "/user", state: { email } }}>
              <CgProfile size={40} color="blue" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
