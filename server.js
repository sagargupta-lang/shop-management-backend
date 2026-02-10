const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Connect DB ONCE (serverless-safe) */
(async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error("❌ DB connection failed on startup");
  }
})();

/* Routes */
app.use("/api/test", require("./routes/test.route"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/protected", require("./routes/protected.route"));

/* Root route */
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully");
});

/* Export app for Vercel */
module.exports = app;
