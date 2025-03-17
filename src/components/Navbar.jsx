import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Atlash</h1>

      {/* Hamburger Menu Icon for Mobile */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Desktop & Mobile Navigation */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        {isLoggedIn ? (
          <>
            {/* Desktop Dropdown for Authenticated Users */}
            <li className="dropdown">
              <span onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-toggle">
                ☰ Menu
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