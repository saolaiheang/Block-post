
import axios from 'axios';
import React, { useState } from 'react';

const Createformnew = ({ isOpen, onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

        const blogData = {
            title,
            desc,
            thumbnail,
        };

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/create-blog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(blogData),
            });

            const newBlog = await response.json();

            if (response.ok) {
                onCreate(newBlog);
                setTitle('');
                setDesc('');
                setThumbnail('');
                setPreviewUrl(null);
                onClose();
            } else {
                setError(newBlog.message || 'Failed to create blog');
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
                <h2 className="text-2xl mb-4">Create New Blog</h2>
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
                        onChange={handleImageChange} // Corrected to call the handleImageChange function
                        className="border p-2 w-full mb-4"
                        required
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
                            {loading ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Createformnew;
