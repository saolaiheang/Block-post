



import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <div className="bg-red-200">
        <div className="justify-between w-[80%] mx-auto items-center flex h-[100px] ">
          <div className="items-center flex ">
            <h1 className="text-[30px] font-serif font-bold text-blue-700">BugBlaster </h1>
          </div>
          <div className="flex-row flex space-x-10">
          <Link to="/user"><CgProfile  size={40} /></Link>
            <Link to="/"> <IoLogOutOutline   size={40} color="red" /></Link>
         
           
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
