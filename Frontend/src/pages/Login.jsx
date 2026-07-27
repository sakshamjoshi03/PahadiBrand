import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useNotifications } from "../components/UI/NotificationProvider";
import "./Login.css";
import { useEffect } from "react";

const getAuthErrorMessage = (err) => {
  if (!err.response) {
    return "Network connection lost. Please check your internet and try again.";
  }

  if (err.response.status === 401) {
    return "Invalid email or password.";
  }

  if (err.response.status >= 500) {
    return "Something went wrong. Please try again.";
  }

  return "Login failed. Please try again.";
};

const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotifications();

  const loginValid =
    isValidEmail(email.trim()) &&
    password.length >= 6;

  const validate = () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!isValidEmail(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setFieldErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleGoogleLogin = () => {
    if (loading) return;

    window.location.href = "http://localhost:5000/api/auth/google";
  };

const handleSubmit = async (e) => {

    e.preventDefault();

    if (loading) return;

    setError("");

    if (!validate()) return;

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

        const message = getAuthErrorMessage(err);
        setError(message);
        addNotification(message, "error");

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

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setFieldErrors((prev) => ({ ...prev, email: "" }));
              }}
              required
            />
            {fieldErrors.email && (
              <span className="field-error">{fieldErrors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
                setFieldErrors((prev) => ({ ...prev, password: "" }));
              }}
              required
            />
            {fieldErrors.password && (
              <span className="field-error">{fieldErrors.password}</span>
            )}
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
            disabled={loading || !loginValid}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="google-login-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
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
