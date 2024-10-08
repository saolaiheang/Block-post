import { create } from "zustand";

const useStore = create((set) => ({
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
}));

export default useStore;
