const Attendance = require("../models/Attendance.model");
const Employee = require("../models/Employee.model");
const connectDB = require("../config/db");

/* =========================
   OWNER – VIEW ATTENDANCE
========================= */
const getAttendanceByDate = async (req, res) => {
  try {
    await connectDB();

    // Only OWNER allowed
    if (req.user.role !== "OWNER") {
      return res.status(403).json({
        success: false,
        message: "Only owner can view attendance",
      });
    }

    const companyId = req.user.company;

    // Date from query or today
    const date =
      req.query.date || new Date().toISOString().split("T")[0];

    const attendanceList = await Attendance.find({
      company: companyId,
      date: date,
    })
      .populate("employee", "name employeeId phone")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      date,
      totalRecords: attendanceList.length,
      attendance: attendanceList,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching attendance",
    });
  }
};

module.exports = { getAttendanceByDate };
