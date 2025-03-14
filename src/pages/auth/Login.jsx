import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      console.log("Login API response:", data);
  
      if (res.ok) {
        localStorage.setItem("token", data.token);  // ✅ Store the token
        localStorage.setItem("userId", data.user.id);  // ✅ Store the user ID
        console.log("Stored userId:", data.user.id);
        console.log("Stored token:", data.token);
        alert("Login successful!");
        window.location.href = "/dashboard"; // Redirect after login
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;