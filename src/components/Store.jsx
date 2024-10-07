// Store.js
import create from 'zustand';
const useStore = create((set) => ({
  isAuthenticated: false, 
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));
export default useStore;


const fetchBlog = create((set) => ({
    apiUrl: import.meta.env.VITE_API_URL, // Access the environment variable for the API URL
    blogs: [], // Initial state for blogs
    fetchBlogs: async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/get-all-blog`); // Use env variable for API URL
        const data = await response.json(); // Parse JSON response
        set({ blogs: data.blogs }); // Update state with fetched blogs
      } catch (error) {
        console.error('Error fetching blogs:', error); // Log any errors
      }
    }
  }));
  
  export default fetchBlog; 