import { useEffect, useState } from "react";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    const email = localStorage.getItem("email");

    if (!email) {
      setError("No email found. Please log in.");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`https://students-hackaton.vercel.app/user/profile?email=${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      <div className="bg-white p-6 shadow-lg rounded-lg w-[60%]">
        <h2 className="text-xl mb-4">Profile Information</h2>
        <p><strong>First Name:</strong> {profile.firstName}</p>
        <p><strong>Last Name:</strong> {profile.lastName}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>
    </div>
  );
}

export default UserProfile;
