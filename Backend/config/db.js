const mongoose = require("mongoose");
const dns = require("dns");

// Set the DNS server to use for resolving hostnames
dns.setServers(["8.8.8.8"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error(error);           // <-- print the full error object
    process.exit(1);
  }
};

module.exports = connectDB;