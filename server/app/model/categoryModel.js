const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "The Minimum 3 Character is Required"],
    maxLength: [15, "The Maximum 15 Character is Required"],
  },

  categoryImage: {
    type: String,
  },

  categoryOrder: {
    type: Number,
    required: [true, "Order is required"],
    min: [1, "Minimum 1 value is required"],
    max: [5, "Maximum 5 value is allow"],
  },

  slug: {
    type: String,
  },

  categoryStatus: {
    type: Boolean,
    default: true,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },

  deletedAt: {
    type: Date,
    default: null,
  },
});

let categoryModel = mongoose.model("categorys", schema);

module.exports = { categoryModel };