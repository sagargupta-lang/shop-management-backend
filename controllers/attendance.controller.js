const Attendance = require("../models/Attendance.model");
const Company = require("../models/Company.model");
const connectDB = require("../config/db");

/* =========================
   MARK ATTENDANCE (IN / OUT)
========================= */
const markAttendance = async (req, res) => {
  try {
    await connectDB();

    // Only EMPLOYEE allowed
    if (req.user.role !== "EMPLOYEE") {
      return res.status(403).json({
        success: false,
        message: "Only employees can mark attendance",
      });
    }

    const employeeId = req.user.id;
    const companyId = req.user.company;

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const now = new Date();

    let attendance = await Attendance.findOne({
      employee: employeeId,
      date: today,
    });

    // FIRST TIME → MARK IN
    if (!attendance) {
      attendance = await Attendance.create({
        employee: employeeId,
        company: companyId,
        date: today,
        inTime: now,
      });

      return res.status(200).json({
        success: true,
        message: "Attendance IN marked",
        attendance,
      });
    }

    // Already IN → MARK OUT
    if (attendance.inTime && !attendance.outTime) {
      attendance.outTime = now;

      const diffMs = attendance.outTime - attendance.inTime;
      const hoursWorked = diffMs / (1000 * 60 * 60);

      attendance.hoursWorked = Number(hoursWorked.toFixed(2));

      // Overtime calculation
      const company = await Company.findById(companyId);
      if (
        company.overtimeAllowed &&
        attendance.hoursWorked > company.workingHoursPerDay
      ) {
        attendance.overtimeHours = Number(
          (attendance.hoursWorked - company.workingHoursPerDay).toFixed(2)
        );
      }

      await attendance.save();

      return res.status(200).json({
        success: true,
        message: "Attendance OUT marked",
        attendance,
      });
    }

    // Already completed
    return res.status(400).json({
      success: false,
      message: "Attendance already completed for today",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while marking attendance",
    });
  }
};

module.exports = { markAttendance };
