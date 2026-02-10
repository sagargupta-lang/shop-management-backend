const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const {
  getAttendanceByDate,
} = require("../controllers/attendanceReport.controller");

/* Owner – Attendance Report */
router.get("/by-date", protect, getAttendanceByDate);

module.exports = router;
