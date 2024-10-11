
import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";

const BlogCard = ({ title, author,avatar, date, desc, image, onView, onEdit, onDelete }) => {
  const truncateDesc = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleMenuClick = (action) => {
    toggleMenu();
    if (action === 'view') onView();
    if (action === 'edit') onEdit();
    if (action === 'delete') onDelete();
  };

  return (
    <div className="w-[20%] h-[500px] drop-shadow-2xl max-sm:w-[85%] mx-8 my-5 h-auto bg-slate-100 rounded-lg overflow-hidden transition-transform duration-500 hover:scale-105">
      {image ? (
        <div className="relative h-[50%] w-full">
          <img src={image} alt={title} className="h-[100%] w-full object-cover" />
          <button 
            onClick={toggleMenu} 
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow" 
            aria-label="Menu"
          >
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
        <div className="h-[50%] w-full bg-gray-300 flex items-center justify-center text-gray-600">No Image Available</div>
      )}
      <div className="mt-5 space-y-1">
        <span className='flex justify-between'>
        <h3 className='text-[20px] text-left font-bold p-2 uppercase text-amber-600 hover:text-amber-700 transition-colors'>{title}</h3>
        <img
          src={avatar}  
          alt={`${author}'s avatar`}
          className="w-[50px] h-[50px] rounded-full mx-2" 
        />
        </span>
        <span className='flex justify-between text-black font-bold px-2 uppercase'>
          <p>By {author}</p>
          <p>{date}</p>
        </span>
        <p className='text-[18px] p-2'>{truncateDesc(desc, 90)}</p>
        <p onClick={() => handleMenuClick('view')} className='text-blue-600 p-2 hover:underline'>Read More</p>
      </div>
    </div>
  );
};

export default BlogCard;
