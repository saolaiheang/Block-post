// // BlogDetail.js
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useBlogStore } from '../components/Store';

// const BlogDetail = () => {
//     const { id } = useParams(); // Get the blog ID from URL parameters
//     const { fetchBlogById } = useBlogStore(); // Function to fetch blog by ID
//     const [blog, setBlog] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate(); // To navigate back

//     useEffect(() => {
//         const getBlog = async () => {
//             setLoading(true);
//             try {
//                 const fetchedBlog = await fetchBlogById(id); // Fetch blog data
//                 setBlog(fetchedBlog);
//             } catch (error) {
//                 console.error('Error fetching blog:', error);
//                 // Optionally, navigate back or show an error message
//                 navigate('/blogmodule');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         getBlog();
//     }, [id, fetchBlogById, navigate]);

//     if (loading) return <p>Loading blog details...</p>;

//     if (!blog) return <p>Blog not found.</p>;

//     return (
//         <div className="blog-detail">
//             <h1 className="text-2xl font-bold">{blog.title}</h1>
//             <h2 className="text-lg">By {blog.createdBy.firstName} {blog.createdBy.lastName}</h2>
//             <p className="text-gray-600">{new Date(blog.createdAt).toLocaleDateString()}</p>
//             <img src={blog.thumbnail} alt={blog.title} className="w-full h-64 object-cover" />
//             <p className="mt-4">{blog.desc}</p>
//             {/* Add any other details you want to display */}
//         </div>
//     );
// };

// export default BlogDetail;


import React, { useEffect } from 'react';
import { useBlogStore } from '../components/Store'; 

const BlogDetail = ({ blogId }) => {
  const { fetchBlogById, selectedBlog, loading, error } = useBlogStore();

  useEffect(() => {
    fetchBlogById(blogId); 
  }, [fetchBlogById, blogId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {selectedBlog && (
        <>
          <h1>{selectedBlog.title}</h1>
          <img src={selectedBlog.thumbnail} alt={selectedBlog.title} />
          <p>{selectedBlog.desc}</p>
        </>
      )}
    </div>
  );
};

export default BlogDetail;
