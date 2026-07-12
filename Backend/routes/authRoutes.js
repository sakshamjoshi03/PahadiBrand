const express = require("express");

const {

    registerUser,
    loginUser

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

module.exports = router;