import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostDetails.css";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedLocationUrl, setEditedLocationUrl] = useState("");
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  console.log("Retrieved userId from localStorage:", userId);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/posts/${id}`);
        const data = await res.json();
        if (res.ok) {
          setPost(data);
          setEditedTitle(data.title || "");
          setEditedContent(data.content || "");
          setEditedLocationUrl(data.locationUrl || "");
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setPost(null);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to update this post.");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ title: editedTitle, content: editedContent, locationUrl: editedLocationUrl }),
      });

      if (res.ok) {
        const updatedPost = await res.json();
        setPost(updatedPost);
        setEditing(false);
        alert("Post updated successfully.");
      } else {
        alert("Failed to update post.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Something went wrong.");
    }
  };

  const handleDeletePost = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to delete this post.");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (res.ok) {
        alert("Post deleted successfully.");
        navigate("/"); // Redirect after deletion
      } else {
        alert("Failed to delete post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Something went wrong.");
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId: id, text: newComment }),
      });

      if (res.ok) {
        const createdComment = await res.json();
        setPost((prev) => ({
          ...prev,
          comments: [...prev.comments, createdComment],
        }));
        setNewComment("");
      } else {
        setError("Failed to add comment.");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Something went wrong.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to delete this comment.");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/comments/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setPost((prev) => ({
          ...prev,
          comments: prev.comments.filter((comment) => comment._id !== commentId),
        }));
        alert("Comment deleted successfully.");
      } else {
        alert("Failed to delete comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Something went wrong.");
    }
  };

  const handleLikePost = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to like a post.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/posts/${id}/like`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (res.ok) {
        const updatedPost = await res.json();
        setPost(updatedPost);
      } else {
        alert("Failed to like post.");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!post) return <h2>Post not found.</h2>;

  console.log("Logged-in User ID:", userId);
  console.log("Post Author ID:", post.author?._id);
  console.log("Liking Post ID:", id);

  return (
    <div className="container">
      {editing ? (
        <form onSubmit={handleUpdatePost}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            required
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            required
          ></textarea>
          <input
            type="text"
            placeholder="Location URL"
            value={editedLocationUrl}
            onChange={(e) => setEditedLocationUrl(e.target.value)}
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <button onClick={() => navigate("/")} className="back-btn">
            ← Back to Home
          </button>
          <div className="post-details-container">
            <h2>{post.title}</h2>
            <p><strong>By {post.author?.username}</strong></p>
            <p>{post.content}</p>
            {post.location && <p><strong>Location:</strong> {post.location}</p>}
            {post.weatherData && (
              <p>
                <strong>Weather:</strong> {post.weatherData.temperature}°C, {post.weatherData.conditions} {post.weatherData.icon}
              </p>
            )}
          </div>
          {post.author?._id && userId && post.author._id === userId && (
            <>
              <button className="delete-btn" onClick={() => handleDeletePost()}>Delete Post</button>
              <button className="edit-btn" onClick={() => setEditing(true)}>Edit Post</button>
            </>
          )}
          {post.locationUrl && (
            <a href={post.locationUrl} target="_blank" rel="noopener noreferrer" className="view-location-btn">
              📍 View Location
            </a>
          )}
        </>
      )}
      <div className="comments-section">
        <button onClick={handleLikePost} className="like-btn">
          ❤️ {post.likes.length} Likes
        </button>
        <h3>Comments</h3>
        {post.comments && post.comments.length > 0 ? (
          <ul>
            {post.comments.map((comment) => (
              <li key={comment._id} className="comment">
                <strong>{comment.author?.username || "Fetching..."}</strong>: {comment.text}
                {comment.author?._id === userId && (
                  <button onClick={() => handleDeleteComment(comment._id)}>🗑 Delete</button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}

        {/* Comment Input */}
        <div>
          <textarea
            className="comment-input"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Submit</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default PostDetails;