const mongoose = require("mongoose");

let isConnected = false; // 👈 important for serverless

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    isConnected = true;
    console.log("✅ MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error.message);
    // ❌ DO NOT exit process on Vercel
  }
};

module.exports = connectDB;
