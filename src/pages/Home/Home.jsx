import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import "./Home.css";


function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = "Atlash | Explore Travel Stories";

    API.get("/api/posts")
      .then((res) => {
        console.log("Fetched posts:", res.data);
        // Ensure res.data is an array
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          console.error("Unexpected response format: ", res.data);
          setPosts([]); // Fallback to an empty array
        }
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setPosts([]); // Fallback to avoid map error
      });
  }, []);

  console.log("Posts state:", posts);

  return (
    <div className="home-container">
      <h1 className="home-title">Explore Travel Stories</h1>
      <p className="home-subtitle">Discover personal travel experiences and unique locations.</p>

      {posts.length === 0 ? (
        <p className="no-posts">No posts available. Be the first to share your journey!</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-preview">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-meta">By {post.author?.username || "Unknown Author"}</p>
              <p className="post-content">{post.content.substring(0, 100)}...</p>
              <p className="post-likes">❤️ {post.likes.length} Likes</p>
              <Link to={`/post/${post._id}`} className="read-more">Read More</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;