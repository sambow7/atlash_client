import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home"; 
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/Dashboard";
import CreatePost from "../pages/posts/CreatePost";
import PostDetails from "../pages/posts/PostDetails";
import Layout from "../layouts/Layout";
import Profile from "../pages/Profile";

export default function AppRoutes() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}