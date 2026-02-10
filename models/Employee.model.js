const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },

    password: {
      type: String,
      default: null, // 🔥 no password initially
    },

    title: {
      type: String,
      default: "EMPLOYEE", // can be MANAGER later
    },

    salary: {
      type: Number,
      required: true,
    },

    dateOfJoining: {
      type: Date,
      default: Date.now,
    },

    shift: {
      type: String,
      default: "DAY",
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    profilePhotoUrl: {
      type: String,
      default: null,
    },

    aadharPhotoUrl: {
      type: String,
      default: null,
    },

    firstTimeLogin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
