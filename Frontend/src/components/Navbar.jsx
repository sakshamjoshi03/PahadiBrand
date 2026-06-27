import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "./Navbar.css";

function Navbar({ darkMode, toggleTheme }) {
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          PahadiBrand
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        {/* Right Side */}
        <div className="nav-right">

          <input
            type="text"
            placeholder="Search..."
            className="search-box"
          />

          <button className="cart-btn">
            🛒
          </button>

          {/* Theme Toggle */}
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;