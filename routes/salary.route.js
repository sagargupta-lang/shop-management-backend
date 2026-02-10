const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const {
  calculateSalary,
  getMySalaryByMonth,
  getMySalaryHistory,
} = require("../controllers/salary.controller");

/* Owner – Calculate Salary */
router.post("/calculate", protect, calculateSalary);

/* Employee – View own salary */
router.get("/me", protect, getMySalaryHistory);

/* Employee – View salary by month */
router.get("/me/month", protect, getMySalaryByMonth);

module.exports = router;
