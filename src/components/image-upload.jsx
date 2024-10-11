import React, { useState, useRef, useEffect } from "react";
import image from "../assets/profile.jpg"; 
import edit from "../assets/editicon.png"; 
function ImgProfile() {
  const [imageURL, setImageURL] = useState(image); 
  const fileUploadRef = useRef(); 
  const [token, setToken] = useState("");
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    const savedToken = localStorage.getItem("token");
    
    if (savedImage) {
      setImageURL(savedImage); 
    }
    
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = async (event) => {
    event.preventDefault(); 
    try {
      const uploadedFile = fileUploadRef.current.files[0]; 
      if (!uploadedFile) return;

      const formData = new FormData();
      formData.append("file", uploadedFile);

      const response = await fetch("https://students-hackaton.vercel.app/upload/upload-image", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) { 
        const data = await response.json();
        console.log("Upload response data:", data);
        const imageUrl = data?.secure_url || data?.location || image;
        setImageURL(imageUrl);
        
        localStorage.setItem("profileImage", imageUrl);
        console.log("Saved image URL:", imageUrl);
      } else {
        console.error("Upload failed:", response.statusText);
        setImageURL(image);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="relative h-96 w-96 m-8">
      <img src={imageURL} alt="Profile" className="h-full w-full rounded-full object-cover" />
      <form id="form" encType="multipart/form-data">
        <button
          type="button" 
          onClick={handleImageUpload}
          className="absolute bottom-12 right-10 h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center"
        >
          <img src={edit} alt="Edit" className="object-cover" />
        </button>
        <input
          type="file"
          ref={fileUploadRef}
          onChange={uploadImageDisplay}
          hidden
        />
      </form>
    </div>
  );
}

export default ImgProfile;
