import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "./Login.css";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };
const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

        const response = await login({

            email,
            password

        });
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Optional: only if Remember Me is checked
      if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
      }

        navigate("/dashboard");

    }

    catch (err) {

        console.error(err);

        setError(

            err.response?.data?.message ||

            "Login failed."

        );

    }

    finally {

        setLoading(false);

    }

};
useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

        navigate("/dashboard");

    }

}, [navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>

        <p className="login-subtitle">
          Login to continue your journey with PahadiBrand
        </p>
                {error && (

            <div
                style={{
                    color: "red",
                    marginBottom: "15px",
                    textAlign: "center"
                }}
            >
                {error}
            </div>

        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>

            <a href="#forgot" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="google-login-btn"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              width="20"
              height="20"
            />
            Continue with Google
          </button>
        </form>

        <div className="login-footer">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}