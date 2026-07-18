const bcrypt = require("bcryptjs");

const User = require("../models/User");

const generateToken = require("../utils/generateToken");


// ======================================
// REGISTER USER
// POST /api/auth/register
// ======================================

const registerUser = async (req, res) => {

    try {

        const {

            name,
            email,
            password

        } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,

                message: "All fields are required."

            });

        }

        const existingUser = await User.findOne({

            email

        });

        if (existingUser) {

            return res.status(400).json({

                success: false,

                message: "Email already registered."

            });

        }

        const hashedPassword = await bcrypt.hash(

            password,

            10

        );

        const user = await User.create({

            name,

            email,

            password: hashedPassword

        });

        const token = generateToken(

            user._id

        );

        res.status(201).json({

            success: true,

            message: "Registration successful.",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ======================================
// LOGIN USER
// POST /api/auth/login
// ======================================

const loginUser = async (req, res) => {

    try {

        const {

            email,
            password

        } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message: "Email and password are required."

            });

        }

        const user = await User.findOne({

            email

        }).select("+password");

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid email or password."

            });

        }

        const isMatch = await bcrypt.compare(

            password,
            user.password

        );

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid email or password."

            });

        }

        const token = generateToken(

            user._id

        );

        res.status(200).json({

            success: true,

            message: "Login successful.",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ======================================
// GOOGLE LOGIN CALLBACK
// ======================================

const googleCallback = async (req, res) => {

    try {

        const user = req.user;

        const token = generateToken(user._id);

        const frontendURL =
            `http://localhost:5173/oauth-success?token=${token}`;

        res.redirect(frontendURL);

    }

    catch (error) {

        res.redirect(
            "http://localhost:5173/login?error=google_auth_failed"
        );

    }

};
module.exports = {

    registerUser,
    loginUser,
    googleCallback

};