const express = require("express");
const router = express.Router();

const {
  protect,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

const {
   addEmployee,
   employeeLogin,
} = require("../controllers/auth.controller");

/* Add Employee – OWNER only */
router.post(
  "/add",
  protect,
  authorizeRoles("OWNER"),
  addEmployee
);

/* Employee Login */
router.post("/login", employeeLogin);

module.exports = router;
