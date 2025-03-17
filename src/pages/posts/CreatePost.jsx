import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CreatePost.css";


function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState(""); // New field
  const [latitude, setLatitude] = useState(""); // New field
  const [longitude, setLongitude] = useState(""); // New field
  const navigate = useNavigate();
  const [locationUrl, setLocationUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to create a post.");
      return;
    }

    const userId = localStorage.getItem("userId"); // Retrieve user ID
    const postData = {
      title,
      content,
      location,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      author: userId,  // Add user ID
    };

    console.log("Sending postData:", postData); // Debugging line

    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, location, latitude, longitude, locationUrl }),
      });

      if (res.ok) {
        alert("Post created successfully!");
        navigate("/");
      } else {
        alert("Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="create-post-container"><button onClick={() => navigate("/")} className="back-btn">
      ← Back to Home
    </button>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        <input type="text" placeholder="Location (City, Country)" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input type="text" placeholder="Latitude (optional)" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        <input type="text" placeholder="Longitude (optional)" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        <div className="form-group">
          <label>Travel Location URL:</label>
          <input
            type="text"
            value={locationUrl}
            onChange={(e) => setLocationUrl(e.target.value)}
            placeholder="Enter a Google Maps or travel link"
          />
        </div>
        <button type="submit">Create Post</button>
      </form>

      {/* Comments Placeholder */}
      <div>
        <h3>Comments</h3>
        <p>No comments yet.</p>
      </div>
    </div>
  );
}

export default CreatePost;