import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          PahadiBrand
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <div className="nav-right">

          <input
            type="text"
            placeholder="Search..."
            className="search-box"
          />

          <button className="cart-btn">
            🛒
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