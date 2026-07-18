const express = require("express");
const passport = require("passport");
const {

    registerUser,
    loginUser,
    googleCallback

} = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");
const authLimiter = require("../middleware/rateLimiter"); 
const {
    registerValidation,
    loginValidation,
    validate
} = require("../middleware/validation");

const router = express.Router();

router.post("/register", authLimiter, registerValidation, validate, registerUser);

router.post("/login", authLimiter, loginValidation, validate, loginUser);
router.get(

    "/profile",

    verifyToken,

    (req, res) => {

        res.status(200).json({

            success: true,

            user: req.user

        });

    }

);
// GET CURRENT USER
// GET /api/auth/me

router.get(

    "/me",

    verifyToken,

    (req, res) => {

        res.status(200).json({

            success: true,

            message: "Authenticated user",

            user: req.user

        });

    }

);
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "http://localhost:5173/login"
    }),
    googleCallback
);
// GOOGLE LOGIN

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

// GOOGLE CALLBACK

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "http://localhost:5173/login"
    }),
    googleCallback
);

module.exports = router;