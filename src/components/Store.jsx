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
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDM1NThjODYzMGY4ZTRjNmNhNDNmZCIsImVtYWlsIjoic2FvbGFpaGVhbmdAZ21haWwuY29tIiwiaWF0IjoxNzI4MzQ3NjQyLCJleHAiOjE3MzA5Mzk2NDJ9.Je4cTv-te59S_pBLL8eQgE8YwVhSMFsrQHs4QA-yPxk',
  blogs: [],
  loading: false,
  error: null,

  fetchBlogs: async () => {
    set({ loading: true, error: null }); // Set loading state before fetch
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/get-all-blog`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${useBlogStore.getState().token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Fetched blogs:', data);
      if (Array.isArray(data)) {
        set({ blogs: data, loading: false });
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/delete-blog/${blogId}`, {
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
}));

