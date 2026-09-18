const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  countryName: {
    type: String,
    required: [true, "Name is required"],
  },

  countryOrder: {
    type: Number,
    required: [true, "Order is required"],
    min: [1, "Minimum 1 value is required"],
    max: [5, "Maximum 5 value is allow"],
  },

  countryStatus: {
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

let countryModel = mongoose.model("countries",schema)

module.exports = { countryModel };