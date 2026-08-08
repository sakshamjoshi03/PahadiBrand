const express = require("express");
const rateLimit = require("express-rate-limit");
const { chatWithBhula } = require("../controllers/aiController");

const router = express.Router();

const aiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // 20 requests per minute
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many AI chat requests, please try again in a moment."
    }
});

router.post("/chat", aiLimiter, chatWithBhula);

module.exports = router;