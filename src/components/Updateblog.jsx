import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Updateblog = ({ isOpen, onClose, onCreate, blogData = null, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Populate the form fields if blogData is provided (for editing)
    useEffect(() => {
        if (blogData) {
            setTitle(blogData.title);
            setDesc(blogData.desc);
            setThumbnail(blogData.thumbnail);
            setPreviewUrl(blogData.thumbnail); // Set preview URL for the existing thumbnail
        } else {
            // Reset fields if creating a new blog
            setTitle('');
            setDesc('');
            setThumbnail('');
            setPreviewUrl(null);
        }
    }, [blogData]);

    const handleImageChange = async (event) => {
        console.log("Image upload initiated");
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        const file = event.target.files[0];

        if (!file) {
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload/upload-image`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = response.data;
            setThumbnail(imageUrl.url);
            setPreviewUrl(imageUrl.url);
            console.log("Image uploaded successfully:", imageUrl);
        } catch (error) {
            setError('Image upload failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !desc.trim() || !thumbnail) {
            setError('All fields are required.');
            return;
        }

        const blogDataToSubmit = {
            title,
            desc,
            thumbnail,
        };

        setLoading(true);
        setError(null);

        try {
            let response;
            if (blogData) {
                // Update existing blog
                response = await fetch(`${import.meta.env.VITE_API_URL}/blog/update-blog/${blogData._id}`, {
                    method: 'PUT', // Use PUT for updates
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(blogDataToSubmit),
                });
            } else {
                // Create new blog
                response = await fetch(`${import.meta.env.VITE_API_URL}/blog/create-blog`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(blogDataToSubmit),
                });
            }

            const newBlog = await response.json();

            if (response.ok) {
                if (blogData) {
                    onUpdate(newBlog); // Call the onUpdate function if updating
                } else {
                    onCreate(newBlog); // Call onCreate if creating a new blog
                }
                // Reset form fields
                setTitle('');
                setDesc('');
                setThumbnail('');
                setPreviewUrl(null);
                onClose();
            } else {
                setError(newBlog.message || 'Failed to process request');
            }
        } catch (error) {
            setError('An error occurred: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4">{blogData ? 'Edit Blog' : 'Create New Blog'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 w-full mb-4"
                        required
                    />
                    <label>Description</label>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="border p-2 w-full mb-4"
                        required
                    />
                    <label>Thumbnail</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border p-2 w-full mb-4"
                    />
                    {previewUrl && (
                        <img src={previewUrl} alt="Image Preview" className="mt-4 mb-4 w-[100px] h-[100px] h-auto" />
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-end space-x-4">
                        <button type="button" className="bg-red-500 text-white px-4 py-2" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2" disabled={loading}>
                            {loading ? 'Processing...' : (blogData ? 'Update' : 'Create')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Updateblog;
