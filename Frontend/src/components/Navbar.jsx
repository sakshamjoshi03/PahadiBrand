import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Home, 
  Info, 
  Bot, 
  LayoutDashboard, 
  ShieldCheck, 
  ShoppingCart, 
  LogOut, 
  LogIn, 
  UserPlus, 
  User, 
  Search,
  Sparkles
} from "lucide-react";
import { useNotifications } from "./UI/NotificationProvider";
import "./Navbar.css";

function Navbar({ darkMode, toggleTheme }) {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchQuery = searchParams.get("search") || "";

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const path = location.pathname;
    if (path === "/dashboard") {
      if (value) {
        navigate(`/dashboard?search=${encodeURIComponent(value)}`, { replace: true });
      } else {
        navigate(`/dashboard`, { replace: true });
      }
    } else {
      if (value) {
        navigate(`/?search=${encodeURIComponent(value)}`, { replace: true });
      } else {
        navigate(`/`, { replace: true });
      }
    }
  };

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = Boolean(token) && user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    addNotification("Logout successful.", "info");
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  // Close side menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile side menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close side menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
            PahadiBrand
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link-item active" : "nav-link-item"}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link-item active" : "nav-link-item"}>
              About
            </NavLink>
            <NavLink to="/bhula" className={({ isActive }) => isActive ? "nav-link-item nav-bhula-link active" : "nav-link-item nav-bhula-link"}>
              AI Assistant
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link-item active" : "nav-link-item"}>
              Dashboard
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin/products" className={({ isActive }) => isActive ? "nav-link-item active" : "nav-link-item"}>
                Admin
              </NavLink>
            )}
          </nav>

          {/* Desktop & Header Right Side Controls */}
          <div className="nav-right">
            <div className="desktop-search-wrapper">
              <label htmlFor="navbar-search" className="sr-only">Search products</label>
              <input
                id="navbar-search"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="search-box"
                aria-label="Search products"
              />
            </div>

            <button type="button" className="cart-btn" aria-label="View cart" title="View cart">
              <ShoppingCart size={20} />
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

            {/* Desktop User Section */}
            <div className="desktop-user-wrapper">
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

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={`mobile-menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open side menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-side-drawer"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Menu Overlay Backdrop */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      />

      {/* Mobile Side Menu Drawer */}
      <aside
        id="mobile-side-drawer"
        className={`mobile-side-menu ${isMobileMenuOpen ? "open" : ""}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="side-menu-header">
          <Link to="/" className="side-menu-logo" onClick={() => setIsMobileMenuOpen(false)}>
            <span>🏔️</span> PahadiBrand
          </Link>
          <button
            type="button"
            className="side-menu-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close side menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="side-menu-search">
          <Search size={18} className="side-search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="side-search-input"
            aria-label="Search products in mobile menu"
          />
        </div>

        {/* User Card inside Side Menu */}
        {token && user && (
          <div className="side-user-card">
            <div className="side-user-avatar">
              <User size={20} />
            </div>
            <div className="side-user-info">
              <span className="side-user-name">{user?.name || "User"}</span>
              <span className="side-user-badge">{user?.role || "Member"}</span>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="side-nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `side-nav-item ${isActive ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="side-nav-icon-wrapper">
              <Home size={20} />
            </div>
            <span className="side-nav-text">Home</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `side-nav-item ${isActive ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="side-nav-icon-wrapper">
              <Info size={20} />
            </div>
            <span className="side-nav-text">About Us</span>
          </NavLink>

          <NavLink
            to="/bhula"
            className={({ isActive }) => `side-nav-item bhula-side-item ${isActive ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="side-nav-icon-wrapper bhula-icon-wrap">
              <Sparkles size={20} />
            </div>
            <span className="side-nav-text">AI Assistant (Bhula)</span>
            <span className="side-ai-badge">AI</span>
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) => `side-nav-item ${isActive ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="side-nav-icon-wrapper">
              <LayoutDashboard size={20} />
            </div>
            <span className="side-nav-text">Dashboard</span>
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/admin/products"
              className={({ isActive }) => `side-nav-item admin-side-item ${isActive ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="side-nav-icon-wrapper admin-icon-wrap">
                <ShieldCheck size={20} />
              </div>
              <span className="side-nav-text">Admin Portal</span>
              <span className="side-admin-badge">Admin</span>
            </NavLink>
          )}
        </nav>

        {/* Side Menu Footer Actions */}
        <div className="side-menu-footer">
          <div className="side-theme-toggle-row">
            <span className="side-theme-label">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </span>
            <button
              type="button"
              className="side-theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme in menu"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>{darkMode ? "Switch to Light" : "Switch to Dark"}</span>
            </button>
          </div>

          <div className="side-auth-actions">
            {token ? (
              <button
                type="button"
                className="side-logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
            ) : (
              <div className="side-auth-buttons">
                <Link
                  to="/login"
                  className="side-login-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="side-signup-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navbar;