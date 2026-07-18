require("dotenv").config();

const express = require("express");
const cors = require("cors");

const passport = require("passport");

require("./config/passport");

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

connectDB();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(passport.initialize());

app.use(express.json());

// Routes

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to PahadiBrand Backend API"
    });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// 404 Handler

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// Error Handler

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});