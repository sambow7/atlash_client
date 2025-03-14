import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
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

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Dashboard;