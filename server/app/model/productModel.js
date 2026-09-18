const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "The Minimum 3 Character is Required"],
    maxLength: [15, "The Maximum 15 Character is Required"],
  },

  parentCategory: {
    type: mongoose.Types.ObjectId, //object id store
    ref: "categorys", // category model
  },

  subCategory: {
    type: mongoose.Types.ObjectId, //object id store
    ref: "subCategorys", // subCategory model
  },

  subSubCategory: {
    type: mongoose.Types.ObjectId, //object id store
    ref: "subSubCategorys", // subSubCategory model
  },

  material: [
    {
      type: mongoose.Types.ObjectId, //object id store
      ref: "materials", // material model
    },
  ],

  color: [
    {
      type: mongoose.Types.ObjectId, //object id store
      ref: "colors", // Color model
    },
  ],

  productShortDescription: {
    type: String,
  },

  productDescription: {
    type: String,
  },

  productImage: {
    type: String,
  },

  productGallery: {
    type: Array, // means in this comma separate add the multiple images
  },

  productPrice: {
    type: Number,
  },

  productActualPrice: {
    type: Number,
  },

  productOrder: {
    type: Number,
    required: [true, "Order is required"],
    min: [1, "Minimum 1 value is required"],
    max: [5, "Maximum 5 value is allow"],
  },

  productType: {
    type: String,
    enum: ["featured", "newArrivals", "onSale"],
    required: [true, "Product Type is required"],
  },

  isBestSelling: {
    type: Boolean,
    default: false,
  },

  isTopRate: {
    type: Boolean,
    default: false,
  },

 upSellProducts: [
  {
    type: mongoose.Types.ObjectId,
    ref: "products"
  }
],

  totalStock: {
    type: Number,
    required: [true, "Total Stock is required"],
    min: [0, "Stock cannot be negative"],
  },

  slug: {
    type: String,
  },

  productStatus: {
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

let productModel = mongoose.model("products", schema);

module.exports = { productModel };