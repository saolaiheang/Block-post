import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ImgProfile from "../components/image-upload";

function UserProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const storedEmail = localStorage.getItem("email");
    const token = localStorage.getItem("token");

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

        setFirstName(profileData.firstName || "Not provided");
        setLastName(profileData.lastName || "Not provided");
        setEmail(profileData.email || storedEmail);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data.");
      }
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="w-[80%] mx-auto mt-10">
        <div className="bg-blue-400 shadow-md text-[20px] rounded-lg p-6 mt-5">
          <h2 className="text-[30px] font-bold mb-4 text-center">View Profile</h2>
          <div className="flex justify-center">
            <ImgProfile></ImgProfile>
          </div>
          <div className="text-center">
            <p className="text-black">
              <strong>First Name:</strong> {firstName}
            </p>
            <p className="text-black">
              <strong>Last Name:</strong> {lastName}
            </p>
            <p className="text-black">
              <strong>Email:</strong> {email}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserProfile;
