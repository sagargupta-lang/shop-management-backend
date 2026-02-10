const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      default: 0,
    },

    type: {
      type: String,
      enum: ["stock", "purchase"],
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "updatedByModel",
    },

    updatedByModel: {
      type: String,
      enum: ["Owner", "Employee"],
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/* Prevent duplicate items per company */
stockSchema.index({ company: 1, itemName: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("Stock", stockSchema);
