const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    month: {
      type: String, // YYYY-MM
      required: true,
    },

    baseSalary: {
      type: Number,
      required: true,
    },

    totalWorkingDays: {
      type: Number,
      default: 0,
    },

    absents: {
      type: Number,
      default: 0,
    },

    overtimeHours: {
      type: Number,
      default: 0,
    },

    overtimePay: {
      type: Number,
      default: 0,
    },

    borrowedAmount: {
      type: Number,
      default: 0,
    },

    finalSalary: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

/* One salary record per employee per month */
salarySchema.index({ employee: 1, month: 1 }, { unique: true });

module.exports = mongoose.model("Salary", salarySchema);
