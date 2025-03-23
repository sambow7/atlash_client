import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard/Dashboard.css";
import API from '../../utils/api'; // Axios instance

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
    } else {
      API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [navigate]);

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  if (!user) return <h2 className="dashboard-loading">Loading...</h2>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user.username}!</h2>
      </div>
      <div className="dashboard-user-info">
        <p>Email: {user.email}</p>
      </div>
      <div className="dashboard-posts">
        <h3>Recent Posts</h3>
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post._id}>
                <strong>{post.title}</strong> by {post.author?.username || "Unknown"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;