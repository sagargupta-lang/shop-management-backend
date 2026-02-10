const express = require("express");
const router = express.Router();

const { ownerSignup } = require("../controllers/auth.controller");

/* Owner Signup */
router.post("/owner/signup", ownerSignup);

module.exports = router;
