const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  whyChooseUsTitle: {
    type: String,
    required: [true, "Title is required"],
    minLength: [3, "The Minimum 3 Character is Required"],
    maxLength: [15, "The Maximum 15 Character is Required"],
  },

  whyChooseUsImage: {
    type: String,
  },

  whyChooseUsOrder: {
    type: Number,
    required: [true, "Order is required"],
    min: [1, "Minimum 1 value is required"],
    max: [5, "Maximum 5 value is allow"],
  },

  whyChooseUsDescription: {
    type: String,
    required: [true, "Description is required"],
    minLength: [3, "The Minimum 3 Character is Required"],
    maxLength: [50, "The Maximum 50 Character is Required"],
  },

  slug: {
    type: String,
  },

  whyChooseUsStatus: {
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

let whyChooseUsModel = mongoose.model("whyChooseUss", schema);

module.exports = { whyChooseUsModel };