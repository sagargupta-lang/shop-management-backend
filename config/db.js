const mongoose = require("mongoose");

let isConnected = false; // track connection state

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error.message);
    throw error;
  }
};

module.exports = connectDB;
