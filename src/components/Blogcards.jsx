import React,{useState} from 'react';
import { IoMenu } from "react-icons/io5";
import { Link } from 'react-router-dom';
const BlogCard = ({ title, author, date, desc, image, onView, onEdit, onDelete }) => {
  const truncateDesc = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
      setMenuOpen((prev) => !prev);
  };
  const handleMenuClick = (action) => {
      toggleMenu();
      if (action === 'view') onView();
      if (action === 'edit') onEdit();
      if (action === 'delete') onDelete();
  };
  const handleDelete = () => {
    onDelete(blogId);
    toggleMenu(); // Close the menu after action
};
  return (
    <>
    
    <div className="w-[25%] h-[550px] max-sm:w-[85%] mx-8 my-5 h-auto bg-slate-100   rounded-lg overflow-hidden  transition-transform duration-500 hover:scale-105">
      {image ? (
      
        <div className="relative h-[50%] w-full">
          
          <img src={image} alt={title} className="h-[100%] w-full object-cover " />
          <button onClick={toggleMenu} className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
            <IoMenu />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-9 bg-white border border-gray-300 shadow-lg rounded">
              <ul className="flex flex-col">
                <li onClick={() => handleMenuClick('view')} className="p-2 hover:bg-gray-200 cursor-pointer">View</li>
                <li onClick={() => handleMenuClick('edit')} className="p-2 hover:bg-gray-200 cursor-pointer">Edit</li>
                <li onClick={() => handleMenuClick('delete')} className="p-2 hover:bg-gray-200 cursor-pointer">Delete</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="placeholder-image">No Image Available</div>
      )}
      <div className="mt-5 space-y-1">
        <h3 className='text-[28px] text-left font-bold p-2 text-amber-600'>{title}</h3>
        <span className='flex justify-between text-black font-bold px-2 uppercase'>
          <p>By {author}</p>
          <p>{date}</p>
        </span>
        <p className='text-[18px] p-2'>{truncateDesc(desc, 120)} </p>
        
        <Link to="" className='text-blue-600 p-2'>Read More</Link>
        
        
      </div>
    </div>
    </>
  );
};

export default BlogCard;
