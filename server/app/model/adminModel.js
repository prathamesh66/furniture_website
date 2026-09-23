const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    mobile_number: {
      type: String,
      default: null,
    },

    profileImage: {
      type: String,
      default: null,
    },

    role_type: {
      type: String,
      default: "admin",
      enum: ["admin"],
    },

    status: {
      type: Boolean,
      default: true,
    },

    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const adminModel = mongoose.model("Admin", adminSchema);

module.exports = {
  adminModel,
};
