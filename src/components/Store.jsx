import { create } from 'zustand';
import axios from 'axios';
export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  token: null,
  setToken: (token) => set({ isAuthenticated: !!token, token }),
  logout: () => set({ isAuthenticated: false, token: null })
}));

// blogStore.js (for blog fetching)

export const useBlogStore = create((set) => ({
  apiUrl: import.meta.env.VITE_API_URL,
  token : localStorage.getItem('token'),
  blogs: [],
  loading: false,
  error: null,

  fetchBlogs: async (page, limit) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/get-all-blogs?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${useBlogStore.getState().token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Fetched blogs:', data);
      if (Array.isArray(data.blogs)) {
        set({ blogs: data.blogs, loading: false });
      } else {
        console.error('Invalid data structure:', data);
        set({ error: 'Invalid data structure', loading: false });
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      set({ error: error.message, loading: false });
    }
  },


  deleteBlog: async (blogId, token) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/blog/delete-blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog._id !== blogId),
      }));
      console.log('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  },



  createBlog: async (title, desc,thumbnail) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/blog/create-blog`, {
        headers: {
          'Authorization': `Bearer ${useBlogStore.getState().token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title,desc,thumbnail }),
      });

      const newBlog = await response.json();

      if (response.ok) {
        set((state) => ({
          blogs: [newBlog, ...state.blogs],
          loading: false,
        }));
        console.log('Blog created successfully:', newBlog);
      } else {
        set({ error: 'Failed to create blog', loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateBlog: async (blogId, title, desc, thumbnail) => {
    const token = localStorage.getItem('token');
    set({ loading: true, error: null });

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/blog/update-blog/${blogId}`,
        { title, desc, thumbnail },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const updatedBlog = response.data; 

      if (response.status === 200) {
        set((state) => ({
          blogs: state.blogs.map((blog) =>
            blog._id === blogId ? updatedBlog : blog
          ),
          loading: false,
        }));

        console.log('Blog updated successfully:', updatedBlog);
      } else {
        set({ error: 'Failed to update blog', loading: false });
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      set({ error: error.message, loading: false });
    }
  },


  fetchBlogById: async (blogId, token) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blog/get-blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',

        },
      });
  
      if (response.status === 200) {
        set({ selectedBlog: response.data });
        console.log('Fetched blog successfully:', response.data);
      } else {
        console.error('Failed to fetch blog');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  },
  



}));

