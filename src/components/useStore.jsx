import { create } from "zustand";

const useStore = create((set, get) => ({
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),

  profileImage: null,
  name: "",
  phoneNumber: "",
  bio: "",
  
  setProfileImage: (image) => set({ profileImage: image }),
  setName: (name) => set({ name }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setBio: (bio) => set({ bio }),

  loadProfile: () => {
    const storedProfileImage = localStorage.getItem('profileImage');
    const storedName = localStorage.getItem('name');
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const storedBio = localStorage.getItem('bio');

    set({
      profileImage: storedProfileImage,
      name: storedName || "",
      phoneNumber: storedPhoneNumber || "",
      bio: storedBio || "",
    });
  },

  saveProfile: () => {
    const { profileImage, name, phoneNumber, bio } = get();
    localStorage.setItem('profileImage', profileImage);
    localStorage.setItem('name', name);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('bio', bio);
  }
}));

export default useStore;
