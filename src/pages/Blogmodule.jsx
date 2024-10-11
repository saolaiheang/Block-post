
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


function Blogmodule() {
    const { blogs, fetchBlogs, deleteBlog, createBlog, updateBlog, fetchBlogById } = useBlogStore();

    console.log(blogs, "===bog")
    const token = localStorage.getItem('token');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentBlog, setCurrentBlog] = useState(null);
    const navigate = useNavigate();


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

    return (
        <>
            <div className="bg-slate-300 overflow-hidden">
                <div className='w-full h-5 bg-slate-500'></div>

                <Navbar></Navbar>
                <div className="sliderimage">
                    <div className=''>
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
                                        className='w-full h-[700px] bg-cover bg-center object-cover'
                                        style={{ backgroundImage: `url(${blog.thumbnail})` }}
                                    ></div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <h1 className='text-center text-blue-600 text-xl mt-10 font-bold'>Welcome to Your Blogs</h1>

                <div className='w-full mt-10'>
                    {blogs && blogs.length > 0 ? (
                        <div className="w-full flex flex-wrap lg:flex-row md:flex-col max-sm:flex-col lg:justify-center md:justify-center max-sm:justify-center">
                            {blogs.slice(0, 10).map((blog) => (
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
                        <p>loading.....</p>
                    )}
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

                <Footer/>
            </div>
        </>
    );
}

export default Blogmodule;

