const express = require("express");
const router = express.Router();

const {
  protect,
  authorizeRoles,
} = require("../middlewares/auth.middleware");


/* Protected test route */
router.get(
  "/owner",
  protect,
  authorizeRoles("OWNER"),
  (req, res) => {
    res.json({
      success: true,
      message: "OWNER access granted",
      user: req.user,
    });
  }
);

module.exports = router;
