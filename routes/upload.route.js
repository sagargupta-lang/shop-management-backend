const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const {
  uploadCompanyLogo,
  uploadEmployeeProfile,
  uploadEmployeeAadhar,
} = require("../controllers/upload.controller");

/* Owner – Company logo (Base64) */
router.post("/company-logo", protect, uploadCompanyLogo);

/* Employee – Profile photo (Base64) */
router.post("/employee/profile", protect, uploadEmployeeProfile);

/* Employee – Aadhar photo (Base64) */
router.post("/employee/aadhar", protect, uploadEmployeeAadhar);

module.exports = router;
