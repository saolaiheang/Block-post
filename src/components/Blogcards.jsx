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
    
    <div className="w-[25%] max-sm:w-[85%] m-10 h-auto bg-slate-100   rounded-lg overflow-hidden">
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
      <div className="mt-5 space-y-5">
        <h3 className='text-[28px] text-center font-bold text-amber-600'>{title}</h3>
        <p className='text-[18px] p-2'>{truncateDesc(desc, 120)} </p>
        <span className='flex justify-between p-2'>
          <p>By {author}</p>
          <p>{date}</p>
        </span>
        <Link to="" className='text-blue-600 p-2'>Read More</Link>
        
        
      </div>
    </div>
    </>
  );
};

export default BlogCard;
