import { create } from "zustand";

const useStore = create((set) => ({
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
}));

export default useStore;
