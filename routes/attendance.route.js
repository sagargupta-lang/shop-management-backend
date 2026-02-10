const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const { markAttendance } = require("../controllers/attendance.controller");

/* Mark Attendance (IN / OUT) – EMPLOYEE only */
router.post("/mark", protect, markAttendance);

module.exports = router;
