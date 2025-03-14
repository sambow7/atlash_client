import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/posts`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched posts:", data); // Debugging log
        setPosts(data);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="container">
      <h2>Latest Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              {/* Ensure post.author exists before accessing username */}
              <p>By {post.author?.username || "Unknown Author"}</p>
              <p>{post.content.substring(0, 100)}...</p>
              <Link to={`/post/${post._id}`}>Read More</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;