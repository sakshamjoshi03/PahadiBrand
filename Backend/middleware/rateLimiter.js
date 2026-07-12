const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 2,

    handler: (req, res) => {
        console.log("🚨 Rate limit triggered");

        res.status(429).json({
            success: false,
            message: "Too many requests"
        });
    }
});

module.exports = authLimiter;