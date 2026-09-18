const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    match: /^[a-zA-Z ]{2,50}$/,
  },

  email: {
    type: String,
    required: [true, "Email is Required"],
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    validate: {
      validator: async function (v) {
        const email = await this.constructor.findOne({
          email: v,
          deleted_at: null,
          role_type: "user",
        });

        return !email;
      },
      message: (props) => `The Specified Email is Already in Use`,
    },
  },

  password: {
    type: String,
    required: [true, "Password is Required"],
  },

  mobile_number: {
    type: String,
    default: "",
  },

  address: {
    type: String,
    default: "",
  },

  gender: {
    type: String,
    default: "", //1 - male , 2 - female
  },

  image: {
    type: String,
    default: "",
  },

  role_type: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },

  status: {
    type: Boolean,
    default: 1,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },

  updated_at: {
    type: Date,
    default: Date.now(),
  },

  deleted_at: {
    type: Date,
    default: null,
  },

  reset_password_token: {
    type: String,
    default: "",
  },

  reset_password_expires: {
    type: Date,
    default: null,
  },
});


const userModel = mongoose.model("users",schema);

module.exports = { userModel };




