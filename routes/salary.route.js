const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const {
  calculateSalary,
} = require("../controllers/salary.controller");

/* Owner – Calculate Salary */
router.post("/calculate", protect, calculateSalary);

module.exports = router;
