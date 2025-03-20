import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Ensure styles are applied

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = "Atlash | Explore Travel Stories"; // ✅ Update tab title

    fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/posts`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched posts:", data); // Debugging log
        setPosts(data);
      })
      .catch((err) => console.error("Error fetching posts:", err));
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