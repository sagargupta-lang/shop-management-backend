const express = require("express");
const router = express.Router();

const {
  ownerSignup,
  ownerLogin,
} = require("../controllers/auth.controller");

/* Owner Signup */
router.post("/owner/signup", ownerSignup);

/* Owner Login */
router.post("/owner/login", ownerLogin);

module.exports = router;
