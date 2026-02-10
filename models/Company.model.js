const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
    },

    gstNumber: {
      type: String,
      default: null,
    },

    workingHoursPerDay: {
      type: Number,
      required: true,
    },

    overtimeAllowed: {
      type: Boolean,
      required: true,
    },

    overtimeRate: {
      type: Number,
      default: 0,
    },

    weekSchedule: {
      type: Object, // Sunday–Saturday timings
      required: true,
    },

    logoUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
