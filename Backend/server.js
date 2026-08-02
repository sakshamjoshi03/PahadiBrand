require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const bcrypt = require("bcryptjs");

require("./config/passport");

const connectDB = require("./config/db");
const User = require("./models/User");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.set("trust proxy", 1);

const ensureDefaultAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ email: "admin@pahadibrand.com" });

        if (existingAdmin) {
            return;
        }

        const hashedPassword = await bcrypt.hash("Admin@123", 10);

        await User.create({
            name: "Admin",
            email: "admin@pahadibrand.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("✅ Default admin account created");
    } catch (error) {
        console.error("❌ Failed to initialize default admin account", error);
    }
};

const allowedOrigins = [
    "http://localhost:5173",
    "https://pahadi-brand.vercel.app"
];

if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
    cors({
        origin(origin, callback) {
            if (!origin) return callback(null, true);

            if (
                allowedOrigins.includes(origin) ||
                origin.endsWith(".vercel.app")
            ) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
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
app.use("/api/ai", aiRoutes);

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

const startServer = async () => {
    try {
        await connectDB();
        await ensureDefaultAdmin();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Server startup failed", error);
        process.exit(1);
    }
};

startServer();