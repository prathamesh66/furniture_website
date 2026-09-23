const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: [true, "User ID is required"],
    },

    billing: {
      name: {
        type: String,
        required: [true, "Billing name is required"],
      },

      email: {
        type: String,
        required: [true, "Billing email is required"],
      },

      mobile_number: {
        type: String,
        required: [true, "Billing mobile number is required"],
      },

      address: {
        type: String,
        required: [true, "Billing address is required"],
      },

      country: {
        type: String,
        required: [true, "Billing country is required"],
      },

      state: {
        type: String,
        required: [true, "Billing state is required"],
      },

      city: {
        type: String,
        required: [true, "Billing city is required"],
      },
    },

    shipping: {
      name: {
        type: String,
        required: [true, "Shipping name is required"],
      },

      email: {
        type: String,
        required: [true, "Shipping email is required"],
      },

      mobile_number: {
        type: String,
        required: [true, "Shipping mobile number is required"],
      },

      address: {
        type: String,
        required: [true, "Shipping address is required"],
      },

      country: {
        type: String,
        required: [true, "Shipping country is required"],
      },

      state: {
        type: String,
        required: [true, "Shipping state is required"],
      },

      city: {
        type: String,
        required: [true, "Shipping city is required"],
      },
    },
  },
  {
    timestamps: true,
  },
);

const addressModel = mongoose.model("addresses", addressSchema);

module.exports = addressModel;
