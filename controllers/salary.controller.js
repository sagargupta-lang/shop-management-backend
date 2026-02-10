const Salary = require("../models/Salary.model");
const Attendance = require("../models/Attendance.model");
const Employee = require("../models/Employee.model");
const Company = require("../models/Company.model");
const connectDB = require("../config/db");

/* =========================
   OWNER – CALCULATE SALARY
========================= */
const calculateSalary = async (req, res) => {
  try {
    await connectDB();

    if (req.user.role !== "OWNER") {
      return res.status(403).json({
        success: false,
        message: "Only owner can calculate salary",
      });
    }

    const { employeeId, month } = req.body; // month = YYYY-MM

    const employee = await Employee.findOne({
      employeeId,
      company: req.user.company,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const company = await Company.findById(req.user.company);

    /* Attendance for month */
    const attendanceRecords = await Attendance.find({
      employee: employee._id,
      date: { $regex: `^${month}` },
    });

    const totalWorkingDays = attendanceRecords.length;
    const absents = attendanceRecords.filter((a) => a.absent).length;

    const overtimeHours = attendanceRecords.reduce(
      (sum, a) => sum + a.overtimeHours,
      0
    );

    const overtimePay =
      overtimeHours * (company.overtimeRate || 0);

    const perDaySalary = employee.salary / totalWorkingDays || 0;
    const absentDeduction = perDaySalary * absents;

    const finalSalary =
      employee.salary - absentDeduction + overtimePay;

    const salary = await Salary.findOneAndUpdate(
      { employee: employee._id, month },
      {
        employee: employee._id,
        company: req.user.company,
        month,
        baseSalary: employee.salary,
        totalWorkingDays,
        absents,
        overtimeHours,
        overtimePay,
        finalSalary,
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Salary calculated successfully",
      salary,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while calculating salary",
    });
  }
};

module.exports = { calculateSalary };
