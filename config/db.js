const mongoose = require("mongoose");

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    mongoose.set("bufferCommands", false); // 🔥 disable buffering

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    });

    cachedConnection = conn;
    console.log("✅ MongoDB connected");
    return conn;
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error.message);
    throw error; // 👈 allow API to fail fast
  }
};

module.exports = connectDB;
