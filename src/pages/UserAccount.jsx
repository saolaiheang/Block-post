import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function UserProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [number, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const storedEmail = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    if (storedEmail && token) {
      try {
        const response = await axios.get(
          `https://students-hackaton.vercel.app/user/profile?email=${storedEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const profileData = response.data;

        setFirstName(profileData.firstName || 'Not provided');
        setLastName(profileData.lastName || 'Not provided');
        setPhoneNumber(profileData.number || 'Not provided');
        setBio(profileData.bio || 'Not provided');
        setEmail(profileData.email || storedEmail);
        setProfileImage(profileData.profileImage || 'https://via.placeholder.com/150');
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError('Failed to load profile data.');
      }
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    try {
      const response = await axios.post('https://students-hackaton.vercel.app/user/update', {
        firstName,
        lastName,
        number,
        bio,
        email,
        profileImage: selectedImage, // You need to handle image upload logic here
      });
      setSuccessMessage('Profile updated successfully');
      console.log('Profile updated successfully', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.');
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="w-[80%] mx-auto mt-10">
        <h1 className="text-3xl font-bold">Account</h1>

        {/* View Profile Section */}
        <div className="bg-slate-400 shadow-md text-[20px] rounded-lg p-6 mt-5">
          <h2 className="text-2xl font-bold mb-4">View Profile</h2>
          <img
            src={profileImage}
            alt="Profile"
            className="w-[150px] h-[150px] rounded-full mb-4"
          />
          <p className="text-black"><strong>First Name:</strong> {firstName}</p>
          <p className="text-black"><strong>Last Name:</strong> {lastName}</p>
          <p className="text-black"><strong>Email:</strong> {email}</p>
          <p className="text-black"><strong>Phone Number:</strong> {number}</p> {/* Added phone number */}
          <p className="text-black"><strong>Bio:</strong> {bio}</p> {/* Added bio */}
        </div>

        {/* Edit Profile Section */}
        <div className="bg-slate-400 shadow-md rounded-lg p-6 text-[20px] mt-5">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700 text-[18px] font-bold mb-2">
                Profile Image
              </label>
              <input
                type="file"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-[18px] font-bold mb-2">
                Phone Number
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg"
                type='number'
                value={number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-[18px] font-bold mb-2">
                Bio
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg"
                type='text'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
