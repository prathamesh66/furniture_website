const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminModel } = require("../../model/adminModel");

let adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Check email and password
    if (!email || !password) {
      return res.send({
        _status: false,
        _message: "Email and Password are required",
      });
    }

    // Find only admin
    let checkAdmin = await adminModel.findOne({
      email: email,
      role_type: "admin",
      deleted_at: null,
    });

    if (!checkAdmin) {
      return res.send({
        _status: false,
        _message: "Invalid Admin Email",
      });
    }

    // Check admin status
    if (!checkAdmin.status) {
      return res.send({
        _status: false,
        _message: "Admin account is inactive",
      });
    }

    // Check password
    let checkPassword = bcrypt.compareSync(password, checkAdmin.password);

    if (!checkPassword) {
      return res.send({
        _status: false,
        _message: "Invalid Password",
      });
    }

    // Create JWT token
    let token = jwt.sign(
      {
        id: checkAdmin._id,
        role_type: checkAdmin.role_type,
      },
      process.env.TOKENKEY,
    );

    res.send({
      _status: true,
      _message: "Admin Login Successfully",
      token: token,
      adminData: {
        _id: checkAdmin._id,
        name: checkAdmin.name,
        email: checkAdmin.email,
        mobile_number: checkAdmin.mobile_number,
        role_type: checkAdmin.role_type,
      },
    });
  } catch (error) {
    console.log("ADMIN LOGIN ERROR:", error);

    res.send({
      _status: false,
      _message: "Something went wrong",
      errors: [
        {
          error: error.message,
        },
      ],
    });
  }
};

module.exports = {
  adminLogin,
};
