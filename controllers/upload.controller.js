const Owner = require("../models/Owner.model");
const Employee = require("../models/Employee.model");
const connectDB = require("../config/db");

/* =========================
   OWNER – UPLOAD COMPANY LOGO
========================= */
const uploadCompanyLogo = async (req, res) => {
  try {
    await connectDB();

    if (req.user.role !== "OWNER") {
      return res.status(403).json({
        success: false,
        message: "Only owner can upload company logo",
      });
    }

    const { logoBase64 } = req.body;

    if (!logoBase64) {
      return res.status(400).json({
        success: false,
        message: "Logo Base64 string is required",
      });
    }

    // Size check (~150 KB)
    const sizeInBytes = Buffer.byteLength(logoBase64, "base64");
    if (sizeInBytes > 150 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Logo must be less than 150KB",
      });
    }

    await Owner.findByIdAndUpdate(req.user.id, {
      logoUrl: logoBase64,
    });

    return res.status(200).json({
      success: true,
      message: "Company logo uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while uploading logo",
    });
  }
};

/* =========================
   EMPLOYEE – UPLOAD PHOTOS
========================= */
/* EMPLOYEE – PROFILE PHOTO (Base64) */
const uploadEmployeeProfile = async (req, res) => {
  try {
    await connectDB();

    if (req.user.role !== "EMPLOYEE") {
      return res.status(403).json({
        success: false,
        message: "Only employees can upload profile photo",
      });
    }

    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Profile photo is required",
      });
    }

    const sizeInBytes = Buffer.byteLength(image, "base64");
    if (sizeInBytes > 150 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Profile photo must be under 150KB",
      });
    }

    await Employee.findByIdAndUpdate(req.user.id, {
      profilePhotoUrl: image,
    });

    return res.json({
      success: true,
      message: "Profile photo uploaded successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error while uploading profile photo",
    });
  }
};

/* EMPLOYEE – AADHAR PHOTO (Base64) */
const uploadEmployeeAadhar = async (req, res) => {
  try {
    await connectDB();

    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Aadhar photo is required",
      });
    }

    const sizeInBytes = Buffer.byteLength(image, "base64");
    if (sizeInBytes > 250 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Aadhar photo must be under 250KB",
      });
    }

    await Employee.findByIdAndUpdate(req.user.id, {
      aadharPhotoUrl: image,
    });

    return res.json({
      success: true,
      message: "Aadhar photo uploaded successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error while uploading Aadhar photo",
    });
  }
};


module.exports = {
  uploadCompanyLogo,
  uploadEmployeeProfile,
  uploadEmployeeAadhar,
};

