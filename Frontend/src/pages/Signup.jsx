import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import "./Signup.css";
import hero from "../assets/images/hero.jpg";
import { useEffect } from "react";

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
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validate = () => {
        let temp = {};

        if (!formData.fullname.trim())
            temp.fullname = "Full name is required.";

        if (!formData.email.trim())
            temp.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
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

        if (!validate()) return;

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

            alert("Registration Successful!");

            navigate("/dashboard");

        }

        catch (err) {

            console.error(err);

            alert(

                err.response?.data?.message ||

                "Registration failed."

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

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Full Name</label>

                        <input
                            type="text"
                            name="fullname"
                            placeholder="Saksham Joshi"
                            value={formData.fullname}
                            onChange={handleChange}
                        />

                        {errors.fullname && (
                            <span className="error">{errors.fullname}</span>
                        )}
                    </div>

                    <div className="input-group">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {errors.email && (
                            <span className="error">{errors.email}</span>
                        )}
                    </div>

                    <div className="password-row">

                        <div className="input-group">
                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            {errors.password && (
                                <span className="error">{errors.password}</span>
                            )}
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="********"
                                value={formData.confirmPassword}
                                onChange={handleChange}
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
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                        />

                        <span>
                            I agree to the <b>Terms of Service</b> and{" "}
                            <b>Privacy Policy</b>
                        </span>

                    </div>

                    {errors.agree && (
                        <span className="error">{errors.agree}</span>
                    )}

                    <button
                    className="signup-btn"
                    type="submit"
                    disabled={loading}
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