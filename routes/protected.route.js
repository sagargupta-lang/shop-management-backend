const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

/* Protected test route */
router.get("/owner", protect, (req, res) => {
  res.json({
    success: true,
    message: "You are authorized as OWNER",
    user: req.user,
  });
});

module.exports = router;
