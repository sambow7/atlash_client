import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css"; // Ensure styling is applied
import Navbar from "../components/Navbar";
import profilePlaceholder from "../assets/profile-placeholder.png";

console.log("Profile Placeholder Image:", profilePlaceholder);


function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user?.username || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");
  const [editedBio, setEditedBio] = useState(user?.bio || "");
  const [editedProfilePic, setEditedProfilePic] = useState(user?.profilePicture || "");
  const [profilePic, setProfilePic] = useState(""); // ✅ Initialize profilePic state
  const [selectedFile, setSelectedFile] = useState(null);

  const defaultProfilePic = "/profile-placeholder.png";
  const profilePicSrc = user?.profilePicture || profilePic || defaultProfilePic;
  <img src={profilePicSrc} alt="Profile" />;



  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("⚠️ No token found, user may not be authenticated.");
      alert("Unauthorized! Please log in.");
      navigate("/login");
    } else {
      fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth/me`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [navigate]);
  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to update your profile.");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ username: editedUsername, email: editedEmail, bio: editedBio, profilePicture: editedProfilePic }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        setEditing(false);
        alert("Profile updated successfully!");

        // ✅ Force a full UI refresh
        window.location.reload();
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong.");
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Ensure this is used in file uploads
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile); // Use "profilePic" to match backend

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/profile/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setProfilePic(data.profilePic); // Update profile picture state
        localStorage.setItem("profilePic", data.profilePic);

        // 🌟 Force UI refresh by updating the `user` state
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: data.profilePic
        }));

        alert("Profile picture updated successfully!");
      } else {
        console.error("Upload failed:", data.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <>
      <div className="profile-container">
        <div className="profile-header">
          <img
            src={user.profilePicture || profilePlaceholder}
            alt="Profile"
            className="profile-picture"
          />
          <h2>{user.username}'s Profile</h2>
          <p>Email: {user.email}</p>
          <p>Bio: {user.bio || "No bio available."}</p>
        </div>

        <div className="user-posts">
          <h3>My Posts</h3>
          {user.posts && user.posts.length > 0 ? (
            <ul>
              {user.posts.map((post) => (
                <li key={post._id}>
                  <strong>{post.title}</strong> - {post.content.substring(0, 50)}...
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts yet.</p>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <div className="form-group">
              <label>Username:</label>
              <input type="text" value={editedUsername} onChange={(e) => setEditedUsername(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Bio:</label>
              <textarea value={editedBio || ""} onChange={(e) => setEditedBio(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Profile Picture URL:</label>
              <input type="text" value={editedProfilePic || ""} onChange={(e) => setEditedProfilePic(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Upload Profile Picture:</label>
              <input type="file" onChange={handleFileChange} />
              <button type="button" onClick={handleUpload}>Upload</button>
            </div>

            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
          </form>
        ) : (
          <button className="edit-profile-btn" onClick={() => setEditing(true)}>Edit Profile</button>
        )}
      </div>
    </>
  );
}

export default Profile;