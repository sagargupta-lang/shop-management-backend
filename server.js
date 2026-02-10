const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/test", require("./routes/test.route"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/protected", require("./routes/protected.route"));
app.use("/api/employee", require("./routes/employee.route"));
app.use("/api/attendance", require("./routes/attendance.route"));
app.use(
  "/api/attendance-report",
  require("./routes/attendanceReport.route")
);
app.use("/api/salary", require("./routes/salary.route"));
app.use("/api/stock", require("./routes/stock.route"));

/* Root route */
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully");
});

/* Export app for Vercel */
module.exports = app;
