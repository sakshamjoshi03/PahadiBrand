import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useNotifications } from "./UI/NotificationProvider";
import "./Navbar.css";

function Navbar({ darkMode, toggleTheme }) {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

const token = localStorage.getItem("token");

const user = JSON.parse(

    localStorage.getItem("user") || "null"

);

const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("rememberMe");
    addNotification("Logout successful.", "info");
    navigate("/login");

};
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
          <Link to="/bhula" className="nav-bhula-link">
            AI Assistant
          </Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        {/* Right Side */}
        <div className="nav-right">

          <label htmlFor="navbar-search" className="sr-only">Search products</label>
          <input
            id="navbar-search"
            type="text"
            placeholder="Search..."
            className="search-box"
            aria-label="Search products"
          />

          <button type="button" className="cart-btn" aria-label="View cart" title="View cart">
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

          {token ? (

    <div className="user-section">

        <span className="user-name">

            👤 {user?.name}

        </span>

        <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
        >

            Logout

        </button>

    </div>

) : (

    <Link to="/login">

        <button type="button" className="login-btn">

            Login

        </button>

    </Link>

)}

        </div>

      </div>
    </header>
  );
}

export default Navbar;