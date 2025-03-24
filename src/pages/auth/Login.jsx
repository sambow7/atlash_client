import { useState } from "react";
import "./Login.css";
import API from "../../utils/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("auth/login", {
        email,
        password,
      });

      const data = res.data;
      console.log("Login API response:", data);

      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        console.log("Stored userId:", data.user.id);
        console.log("Stored token:", data.token);
        alert("Login successful!");
        window.location.href = "/dashboard";
      } else {
        alert("Login failed. Missing token or user.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;