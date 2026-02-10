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
const uploadEmployeePhotos = async (req, res) => {
  try {
    await connectDB();

    if (req.user.role !== "EMPLOYEE") {
      return res.status(403).json({
        success: false,
        message: "Only employees can upload photos",
      });
    }

    const updates = {};

    if (req.files?.profilePhoto) {
      if (req.files.profilePhoto[0].size > 150 * 1024) {
        return res.status(400).json({
          success: false,
          message: "Profile photo must be under 150KB",
        });
      }

      updates.profilePhotoUrl =
        req.files.profilePhoto[0].buffer.toString("base64"); // ✅
    }

    if (req.files?.aadharPhoto) {
      if (req.files.aadharPhoto[0].size > 250 * 1024) {
        return res.status(400).json({
          success: false,
          message: "Aadhar photo must be under 250KB",
        });
      }

      updates.aadharPhotoUrl =
        req.files.aadharPhoto[0].buffer.toString("base64"); // ✅
    }

    await Employee.findByIdAndUpdate(req.user.id, updates);

    return res.status(200).json({
      success: true,
      message: "Photos uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while uploading photos",
    });
  }
};

module.exports = {
  uploadCompanyLogo,
  uploadEmployeePhotos,
};
