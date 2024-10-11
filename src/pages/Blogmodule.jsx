

import React, { useEffect, useState } from 'react';
import BlogCard from '../components/Blogcards';
import { useBlogStore } from '../components/Store';
import { Swiper, SwiperSlide } from 'swiper/react';
import Btn from '../components/Btn';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Navbar from '../components/Navbar';
import Createformnew from '../components/Createformnew';
import Updateblog from '../components/Updateblog';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';

function Blogmodule() {
    const { blogs, fetchBlogs, deleteBlog, createBlog, updateBlog } = useBlogStore();
    const [publicBlogs, setPublicBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [publicPage, setPublicPage] = useState(1);  // Pagination for public blogs
    const itemsPerPage = 4;
    const publicItemsPerPage = 4; // Public blogs per page
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    useEffect(() => {
        const getBlogs = async () => {
            try {
                await fetchBlogs();
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        getBlogs();
    }, [fetchBlogs]);

    useEffect(() => {
        const fetchPublicBlogs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/blog/get-all-blog-public`);
                setPublicBlogs(response.data.blogs);
            } catch (error) {
                console.error('Error fetching public blogs:', error);
                alert('Failed to load public blogs. Please try again.');
            }
        };
        fetchPublicBlogs();
    }, []);

    const handleCreateBlog = async (blogData) => {
        try {
            await createBlog(blogData);
            fetchBlogs();
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    const handleDelete = async (blogId) => {
        try {
            await deleteBlog(blogId, token);
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handleUpdate = async (blogId, updatedData) => {
        try {
            await updateBlog(blogId, updatedData, token);
            await fetchBlogs();
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    const openEditModal = (blog) => {
        setCurrentBlog(blog);
        setIsEditModalOpen(true);
    };

    const onView = (blog) => {
        navigate(`/blog/${blog._id}`);
    };

    const totalPages = Math.ceil(blogs.length / itemsPerPage);
    const currentBlogs = blogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const publicTotalPages = Math.ceil(publicBlogs.length / publicItemsPerPage); 
    const currentPublicBlogs = publicBlogs.slice((publicPage - 1) * publicItemsPerPage, publicPage * publicItemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPublicPage = () => {
        if (publicPage < publicTotalPages) setPublicPage(publicPage + 1);
    };

    const handlePreviousPublicPage = () => {
        if (publicPage > 1) setPublicPage(publicPage - 1);
    };

    return (
        <>
            <div className="bg-slate-300 overflow-hidden">
                <Navbar />

                <div className="sliderimage">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={60}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {blogs.map((blog) => (
                            <SwiperSlide key={blog._id}>
                                <div
                                    className="w-full h-[700px] bg-cover bg-center object-cover"
                                    style={{ backgroundImage: `url(${blog.thumbnail})` }}
                                ></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <h1 className="text-center text-blue-600 text-xl mt-10 font-bold">Your Blogs</h1>
                <div className="w-full mt-10">
                    {blogs && blogs.length > 0 ? (
                        <div className="w-full flex flex-wrap lg:flex-row md:flex-col max-sm:flex-col lg:justify-center md:justify-center max-sm:justify-center">
                            {currentBlogs.map((blog) => (
                                <BlogCard
                                    key={blog._id}
                                    title={blog.title}
                                    author={`${blog.createdBy.firstName} ${blog.createdBy.lastName}`}
                                    date={new Date(blog.createdAt).toLocaleDateString()}
                                    desc={blog.desc}
                                    image={blog.thumbnail}
                                    avatar={blog.createdBy.avatar}
                                    onDelete={() => handleDelete(blog._id)}
                                    onEdit={() => openEditModal(blog)}
                                    onView={() => onView(blog)}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>Loading your blogs...</p>
                    )}
                </div>
                <div className="flex justify-between mt-5 px-10">
                    <button
                        onClick={handlePreviousPage}
                        className={`mx-1 px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-400 text-white' : 'bg-white text-blue-600'}`}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        className={`mx-1 px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-400 text-white' : 'bg-white text-blue-600'}`}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>

                <h1 className="text-center text-blue-600 text-xl mt-10 font-bold">Public Blogs</h1>
                <div className="w-full mt-10">
                    {publicBlogs && publicBlogs.length > 0 ? (
                        <div className="w-full flex flex-wrap lg:flex-row md:flex-col max-sm:flex-col lg:justify-center md:justify-center max-sm:justify-center">
                            {currentPublicBlogs.map((blog) => (
                                <BlogCard
                                    key={blog._id}
                                    title={blog.title}
                                    author={`${blog.createdBy.firstName} ${blog.createdBy.lastName}`}
                                    date={new Date(blog.createdAt).toLocaleDateString()}
                                    desc={blog.desc}
                                    image={blog.thumbnail}
                                    avatar={blog.createdBy.avatar}
                                    onView={() => onView(blog)}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No public blogs available.</p>
                    )}
                </div>

                <div className="flex justify-between mt-5 px-10">
                    <button
                        onClick={handlePreviousPublicPage}
                        className={`mx-1 px-3 py-1 border rounded ${publicPage === 1 ? 'bg-gray-400 text-white' : 'bg-white text-blue-600'}`}
                        disabled={publicPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPublicPage}
                        className={`mx-1 px-3 py-1 border rounded ${publicPage === publicTotalPages ? 'bg-gray-400 text-white' : 'bg-white text-blue-600'}`}
                        disabled={publicPage === publicTotalPages}
                    >
                        Next
                    </button>
                </div>

                <Btn name="Create New Blog" onClick={() => setIsModalOpen(true)} />

                <Createformnew
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreateBlog}
                />

                <Updateblog
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    blogData={currentBlog}
                    onUpdate={handleUpdate}
                />

                <Footer />
            </div>
        </>
    );
}

export default Blogmodule;
