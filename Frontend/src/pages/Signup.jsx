import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { useNotifications } from "../components/UI/NotificationProvider";
import "./Signup.css";
import hero from "../assets/images/hero.jpg";
import { useEffect } from "react";

const getSignupErrorMessage = (err) => {
    if (!err.response) {
        return "Network connection lost. Please check your internet and try again.";
    }

    if (err.response.status === 409) {
        return "An account with this email already exists.";
    }

    if (err.response.status === 400) {
        return "Please check your details and try again.";
    }

    if (err.response.status >= 500) {
        return "Something went wrong. Please try again.";
    }

    return "Account could not be created. Please try again.";
};

const isEmailValid = (value) => /\S+@\S+\.\S+/.test(value);

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });

    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [loading, setLoading] = useState(false);
    const { addNotification } = useNotifications();

    const formIsValid =
        formData.fullname.trim() &&
        isEmailValid(formData.email.trim()) &&
        formData.password.length >= 6 &&
        formData.password === formData.confirmPassword &&
        formData.agree;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setSubmitError("");
        setErrors((prev) => ({
            ...prev,
            [name]: "",
            ...(name === "password" || name === "confirmPassword"
                ? { confirmPassword: "" }
                : {}),
        }));
    };

    const validate = () => {
        let temp = {};

        if (!formData.fullname.trim())
            temp.fullname = "Full name is required.";

        if (!formData.email.trim())
            temp.email = "Email is required.";
        else if (!isEmailValid(formData.email))
            temp.email = "Invalid email address.";

        if (!formData.password)
            temp.password = "Password is required.";
        else if (formData.password.length < 6)
            temp.password = "Password must be at least 6 characters.";

        if (!formData.confirmPassword)
            temp.confirmPassword = "Confirm your password.";
        else if (formData.password !== formData.confirmPassword)
            temp.confirmPassword = "Passwords do not match.";

        if (!formData.agree)
            temp.agree = "You must accept Terms & Conditions.";

        setErrors(temp);

        return Object.keys(temp).length === 0;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return;

        if (!validate()) return;

        setSubmitError("");
        setLoading(true);

        try {

            const response = await register({

                name: formData.fullname,

                email: formData.email,

                password: formData.password

            });

            localStorage.setItem(

                "token",

                response.token

            );

            localStorage.setItem(

                "user",

                JSON.stringify(response.user)

            );

            addNotification("Account created successfully. Welcome aboard!", "success");
            navigate("/dashboard");

        }

        catch (err) {

            const message = getSignupErrorMessage(err);
            setSubmitError(message);
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
        <div
            className="signup-container"
            style={{ backgroundImage: `url(${hero})` }}
        >
            <div className="overlay"></div>

            <div className="signup-card">

                <div className="logo-circle">
                    🌿
                </div>

                <h1>Create Your Account</h1>

                <p className="subtitle">
                    Join the Pahadi Brand family and experience authentic Himalayan
                    products.
                </p>

                {submitError && (
                    <div className="form-alert">
                        {submitError}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>

                    <div className="input-group">
                        <label htmlFor="fullname">Full Name</label>

                        <input
                            id="fullname"
                            type="text"
                            name="fullname"
                            placeholder="Saksham Joshi"
                            value={formData.fullname}
                            onChange={handleChange}
                            disabled={loading}
                        />

                        {errors.fullname && (
                            <span className="error">{errors.fullname}</span>
                        )}
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                        />

                        {errors.email && (
                            <span className="error">{errors.email}</span>
                        )}
                    </div>

                    <div className="password-row">

                        <div className="input-group">
                            <label htmlFor="password">Password</label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                            />

                            {errors.password && (
                                <span className="error">{errors.password}</span>
                            )}
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>

                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="********"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={loading}
                            />

                            {errors.confirmPassword && (
                                <span className="error">
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>

                    </div>

                    <div className="checkbox-group">

                        <input
                            id="agree"
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            disabled={loading}
                        />

                        <label htmlFor="agree" className="checkbox-label">
                            I agree to the <b>Terms of Service</b> and{" "}
                            <b>Privacy Policy</b>
                        </label>

                    </div>

                    {errors.agree && (
                        <span className="error">{errors.agree}</span>
                    )}

                    <button
                    className="signup-btn"
                    type="submit"
                    disabled={loading || !formIsValid}
                    >

                    {

                        loading

                            ? "Creating Account..."

                            : "Create Account →"

                    }

                </button>

                </form>

                <div className="bottom-text">

                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>

                </div>

                <div className="footer">

                    © 2026 Pahadi Brand

                    <br />

                    Authentic Himalayan Products

                </div>

            </div>
        </div>
    );
};

export default Signup;
