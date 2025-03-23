import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      // Parse the JWT to get user info
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));
      setUsername(payload.user?.username || "");
      setProfilePic(payload.user?.profilePicture || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>Atlash</Link>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}></Link></li>
        {isLoggedIn ? (
          <>
            <li className="dropdown">
              <span onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-toggle">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="navbar-profile-pic"
                    style={{ width: "30px", borderRadius: "50%", marginRight: "8px" }}
                  />
                ) : (
                  "☰"
                )}
                {username}
              </span>
              <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                <li><Link to="/create-post" onClick={() => setDropdownOpen(false)}>Create Post</Link></li>
                <li><Link to="/dashboard" onClick={() => setDropdownOpen(false)}>Dashboard</Link></li>
                <li><Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link></li>
                <li>
                  <button onClick={() => { handleLogout(); setDropdownOpen(false); }} className="logout-btn">
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;