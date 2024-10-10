import React, { useEffect } from 'react';
import BlogCard from '../components/Blogcards';
import { useBlogStore } from '../components/Store';
import { Swiper, SwiperSlide } from 'swiper/react';
import Btn from '../components/Btn';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Navbar from '../components/Navbar';

function Blogmodule() {
    const { blogs, fetchBlogs, deleteBlog } = useBlogStore();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDM1NThjODYzMGY4ZTRjNmNhNDNmZCIsImVtYWlsIjoic2FvbGFpaGVhbmdAZ21haWwuY29tIiwiaWF0IjoxNzI4MzQ3NjQyLCJleHAiOjE3MzA5Mzk2NDJ9.Je4cTv-te59S_pBLL8eQgE8YwVhSMFsrQHs4QA-yPxk';
    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);
    console.log('Blogs in Blogmodule:', blogs);



    const handleDelete = (blogId) => {
        deleteBlog(blogId, token);
    };



    return (
        <>
            <div className="bg-slate-300 overflow-hidden">
                <Navbar></Navbar>
                <div className="sliderimage">
                    <div className='mt-10'>
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={60}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            
                        >
                            {blogs.map((blog) => (
                                <SwiperSlide key={blog._id}>
                                    <div className='w-full h-[700px] bg-cover bg-center object-cover' style={{ backgroundImage: `url(${blog.thumbnail})` }}></div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <h1 className=' text-center text-blue-600 text-xl mt-10 font-bold'>Welcome Your Blogs</h1>

                <div className='w-[100%]  mt-[50px] '>
                    {blogs && blogs.length > 0 ? (
                        <div className="w-full flex flex-wrap lg:flex-row md:flex-col max-sm:flex-col lg:justify-center md:justify-center max-sm:justify-center ">
                            {blogs.slice(0, 10).map((blog) => (
                                <BlogCard
                                    key={blog._id}
                                    title={blog.title}
                                    author={`${blog.createdBy.firstName} ${blog.createdBy.lastName}`}
                                    date={new Date(blog.createdAt).toLocaleDateString()}
                                    desc={blog.desc}
                                    image={blog.thumbnail}
                                    onDelete={() => handleDelete(blog._id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No blogs available.</p>
                    )}
                </div>
                <Btn name="Create New Blog" />
            </div>
        </>
    );
}


export default Blogmodule;
