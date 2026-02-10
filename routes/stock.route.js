const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const {
  addOrUpdateItem,
  getInventory,
} = require("../controllers/stock.controller");

/* Add / Update item */
router.post("/", protect, addOrUpdateItem);

/* View inventory */
router.get("/", protect, getInventory);

module.exports = router;
