const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  faqQuestion: {
    type: String,
    required: [true, "Question is required"],
  },

  faqAnswer: {
    type: String,
    required: [true, "Answer is required"],
  },

  faqOrder: {
    type: Number,
    required: [true, "Order is required"],
    min: [1, "Minimum 1 value is required"],
    max: [5, "Maximum 5 value is allow"],
  },

  faqStatus: {
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

let faqModel = mongoose.model("faqs",schema)

module.exports = { faqModel };