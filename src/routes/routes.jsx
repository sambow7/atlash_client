import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home"; 
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreatePost from "../pages/Posts/CreatePost";
import PostDetails from "../pages/Posts/PostDetails";
import Layout from "../layouts/Layout";
import Profile from "../pages/Profile/Profile";


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