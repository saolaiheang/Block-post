
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Updateblog = ({ isOpen, onClose, blogData = null, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (blogData) {
            setTitle(blogData.title);
            setDesc(blogData.desc);
            setThumbnail(blogData.thumbnail);
            setPreviewUrl(blogData.thumbnail);
        } else {
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
        const token = localStorage.getItem('token');

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
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/blog/update-blog/${blogData._id}`, blogDataToSubmit, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                onUpdate(response.data);
                onClose(); // Close the modal after updating
            } else {
                setError(response.data.message || 'Failed to update blog');
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
                <h2 className="text-2xl mb-4">Edit Blog</h2>
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
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Updateblog;
