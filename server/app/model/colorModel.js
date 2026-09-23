const mongoose = require("mongoose");

// const Schema = mongoose.Schema;
// we directly use the mongoose.Schema instead of this line


// this is the schema basic 

// const schema = new mongoose.Schema({
//   name: String,
//   code: String,
// });


// this is the schema advanced

const schema = new mongoose.Schema({
  colorName: {
    type: String,
    required: [true, "Name is Required"],
    minLength: [3, "The Minimum 3 Character is Required"],
    maxLength: [30, "The Maximum 15 Character is Required"],
  }, 
  colorCode: {
    type: String,
    required: [true, "Code is Required"],
  },
  // colorQuantity: {
  //   type: Number,
  //   required: [true, "Quantity is Required"],
  //   min: [1, "Minimum 1 value is required"],
  //   max: [5, "Maximum 5 value is required"],
  // },
  colorOrder: {
    type: Number,
    required: [true, "Order is Required"],
    min: [1, "Minimum 1 value is required"],
    max: [5, "Maximum 5 value is allow"],
  },

  colorStatus: {
    type: Boolean,
    default: true,
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  deletedAt: {
    type: Date,
    default: null

  }
});


// now create the model

const colorModel = mongoose.model("colors",schema);

module.exports = {colorModel}