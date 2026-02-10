const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const { protect } = require("../middlewares/auth.middleware");
const {
  uploadCompanyLogo,
  uploadEmployeePhotos,
} = require("../controllers/upload.controller");

/* Owner – Company logo */
router.post(
  "/company-logo",
  protect,
  uploadCompanyLogo
);

/* Employee – Profile & Aadhar */
router.post(
  "/employee-photos",
  protect,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "aadharPhoto", maxCount: 1 },
  ]),
  uploadEmployeePhotos
);

module.exports = router;
