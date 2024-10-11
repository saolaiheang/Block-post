import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogStore } from '../components/Store';
import Btn from '../components/Btn';

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
    return <p className="text-center">Loading blog...</p>; // Optional: Add some styling
  }

  if (error) {
    return <p className="text-red-600">Error fetching blog: {error}</p>; // Optional: Add some styling
  }

  return (
    <div className="bg-slate-300 h-screen">
      {selectedBlog ? (
        <div className='flex justify-evenly max-sm:flex-col p-10 max-sm:justify-center'>
          <div className='w-[50%] h-[400px] '>
          <img
            src={selectedBlog.thumbnail}
            alt={selectedBlog.title}
            className="w-full h-[100%] mt-4 object-cover overflow-hidden rounded-lg shadow-lg"
          />
          </div>
          <div className='px-[100px]'>
          <h1 className="text-2xl font-bold">{selectedBlog.title}</h1>
          <p className="mt-4">{selectedBlog.desc}</p>
          <p className="mt-2">
            <strong>Author:</strong> {selectedBlog?.firstName} {selectedBlog?.lastName}
          </p>
          <p className="mt-2">
            <strong>Date Create:</strong> {new Date(selectedBlog.createdAt).toLocaleDateString()}
          </p>
          <p className="mt-2">
            <strong>Date Update:</strong> {new Date(selectedBlog.updatedAt).toLocaleDateString()}
          </p>
      
          </div>
        </div>

      ) : (
        <p>No blog found</p>
      )}
    </div>
  );
};

export default BlogDetail;
