const bcrypt = require("bcryptjs");
const Owner = require("../models/Owner.model");
const Company = require("../models/Company.model");

/* =========================
   PASSWORD VALIDATION
========================= */
const isValidPassword = (password) => {
  const letterCount = (password.match(/[a-zA-Z]/g) || []).length;
  const numberCount = (password.match(/[0-9]/g) || []).length;
  const specialCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;

  return letterCount >= 4 && numberCount >= 3 && specialCount >= 1;
};

/* =========================
   OWNER SIGNUP
========================= */
const ownerSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      companyName,
      address,
      serviceType,
      gstNumber,
      workingHoursPerDay,
      overtimeAllowed,
      overtimeRate,
      weekSchedule,
    } = req.body;

    /* 1️⃣ Basic validation */
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !companyName ||
      !address ||
      !serviceType ||
      !workingHoursPerDay ||
      overtimeAllowed === undefined ||
      !weekSchedule
    ) {
      return res.status(400).json({
        success: false,
        message: "All mandatory fields are required",
      });
    }

    /* 2️⃣ Password rules */
    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 4 letters, 3 numbers, and 1 special character",
      });
    }

    /* 3️⃣ Check existing owner */
    const existingOwner = await Owner.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingOwner) {
      return res.status(400).json({
        success: false,
        message: "Email or phone already registered",
      });
    }

    /* 4️⃣ Hash password */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* 5️⃣ Create company */
    const company = await Company.create({
      name: companyName,
      address,
      serviceType,
      gstNumber: gstNumber || null,
      workingHoursPerDay,
      overtimeAllowed,
      overtimeRate: overtimeAllowed ? overtimeRate || 0 : 0,
      weekSchedule,
    });

    /* 6️⃣ Create owner */
    const owner = await Owner.create({
      name,
      email,
      phone,
      password: hashedPassword,
      company: company._id,
    });

    return res.status(201).json({
      success: true,
      message: "Owner registered successfully",
      ownerId: owner._id,
      companyId: company._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error during signup",
    });
  }
};

module.exports = { ownerSignup };
