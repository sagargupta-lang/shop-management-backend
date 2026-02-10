const Stock = require("../models/Stock.model");
const connectDB = require("../config/db");

/* =========================
   ADD / UPDATE ITEM
========================= */
const addOrUpdateItem = async (req, res) => {
  try {
    await connectDB();

    const { itemName, quantity, price, type } = req.body;

    if (!itemName || quantity === undefined || !type) {
      return res.status(400).json({
        success: false,
        message: "Item name, quantity and type are required",
      });
    }

    // Only OWNER can add purchase items
    if (type === "purchase" && req.user.role !== "OWNER") {
      return res.status(403).json({
        success: false,
        message: "Only owner can add purchase items",
      });
    }

    const existingItem = await Stock.findOne({
      company: req.user.company,
      itemName,
      type,
    });

    let item;

    if (existingItem) {
      existingItem.quantity += Number(quantity);
      if (price !== undefined) existingItem.price = price;
      existingItem.lastUpdated = new Date();
      existingItem.updatedBy = req.user.id;
      existingItem.updatedByModel = req.user.role === "OWNER" ? "Owner" : "Employee";

      item = await existingItem.save();
    } else {
      item = await Stock.create({
        company: req.user.company,
        itemName,
        quantity,
        price,
        type,
        updatedBy: req.user.id,
        updatedByModel: req.user.role === "OWNER" ? "Owner" : "Employee",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item saved successfully",
      item,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving item",
    });
  }
};

/* =========================
   VIEW INVENTORY
========================= */
const getInventory = async (req, res) => {
  try {
    await connectDB();

    const items = await Stock.find({
      company: req.user.company,
    }).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      totalItems: items.length,
      items,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching inventory",
    });
  }
};

module.exports = {
  addOrUpdateItem,
  getInventory,
};
