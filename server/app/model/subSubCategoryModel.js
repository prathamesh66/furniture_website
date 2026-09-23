const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  subSubCategoryName: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "The Minimum 3 Character is Required"],
    maxLength: [50, "The Maximum 15 Character is Required"],
  },

  parentCategory: {
    type: mongoose.Types.ObjectId, //object id store
    ref: "categorys", // category model
  },

  subCategory: {
    type: mongoose.Types.ObjectId, //object id store
    ref: "subCategorys", // subCategory model
  },

  subSubCategoryImage: {
    type: String,
  },

  subSubCategoryOrder: {
    type: Number,
    required: [true, "Order is required"],
    min: [1, "Minimum 1 value is required"],
    max: [5, "Maximum 5 value is allow"],
  },

  slug: {
    type: String,
  },

  subSubCategoryStatus: {
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

let subSubCategoryModel = mongoose.model("subSubCategorys", schema);

module.exports = { subSubCategoryModel };