import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogStore } from '../components/Store';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const BlogDetail = () => {
  const { id } = useParams();
  const { selectedBlog, fetchBlogById, loading, error } = useBlogStore();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id && token) {
      fetchBlogById(id, token);
    }
  }, [id, fetchBlogById, token]);

  if (loading) {
    return <p className="text-center">Loading blog...</p>;
  }

  if (error) {
    return <p className="text-red-600">Error fetching blog: {error}</p>;
  }

  return (
    <div className="bg-slate-300 h-[100%]">
      <div className='w-full h-5 bg-slate-500'></div>
      <Navbar/>
      {selectedBlog ? (
        <div className='w-[100%] h-auto  max-sm:flex-col p-10 max-sm:justify-center'>
          <div className='w-[50%] h-[400px] px-[90px]'>
            <img
              src={selectedBlog.thumbnail}
              alt={selectedBlog.title}
              className="w-full h-[100%] mt-4 object-cover overflow-hidden rounded-lg shadow-lg"
            />
          </div>
          <div className='px-[90px] w-[100%]'>
            <h1 className="text-[35px]  text-amber-600 font-semibold mt-5" style={{ fontFamily: "'Roboto', sans-serif" }}>{selectedBlog.title}</h1>
            {/* <p className="mt-2">
              <strong>Author:</strong> {selectedBlog?.firstName} {selectedBlog?.lastName}
            </p> */}
            <p className="mt-4 text-[32px]" style={{ fontFamily: "'Roboto', sans-serif" }}>{selectedBlog.desc}</p>
            <p className="mt-2">
              <p>Date Create: {new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
            </p>
            <p className="mt-2">
              <p>Date Update: {new Date(selectedBlog.updatedAt).toLocaleDateString()}</p>
            </p>
            
          </div>

        </div>

      ) : (
        <p>Loading blog...</p>
      )}

      <Footer/>
    </div>
  );
};

export default BlogDetail;
