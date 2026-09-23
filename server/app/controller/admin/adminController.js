const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const { adminModel } = require("../../model/adminModel");

// ==============================
// ADMIN IMAGE UPLOAD
// ==============================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/admin");
  },

  filename: function (req, file, cb) {
    let uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const uploadAdminImage = multer({
  storage: storage,
});

// ==============================
// CREATE ADMIN
// ==============================

let createAdmin = async (req, res) => {
  try {
    let { name, email, password, mobile_number } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.send({
        _status: false,
        _message: "Name, Email and Password are required",
      });
    }

    // Check existing admin
    let checkAdmin = await adminModel.findOne({
      email: email,
      deleted_at: null,
    });

    if (checkAdmin) {
      return res.send({
        _status: false,
        _message: "Admin already exists",
      });
    }

    // Hash password
    let hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    let newAdmin = new adminModel({
      name: name,
      email: email,
      password: hashedPassword,
      mobile_number: mobile_number,
      role_type: "admin",
      status: true,
      deleted_at: null,
    });

    await newAdmin.save();

    return res.send({
      _status: true,
      _message: "Admin Created Successfully",
      adminData: {
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        mobile_number: newAdmin.mobile_number,
        role_type: newAdmin.role_type,
      },
    });
  } catch (error) {
    console.log("CREATE ADMIN ERROR:", error);

    return res.send({
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

// ==============================
// VIEW ADMIN PROFILE
// ==============================

let viewAdminProfile = async (req, res) => {
  try {
    let adminID = req.adminID;

    let adminData = await adminModel
      .findOne({
        _id: adminID,
        role_type: "admin",
        deleted_at: null,
      })
      .select("-password");

    if (!adminData) {
      return res.send({
        _status: false,
        _message: "Admin Profile Not Found",
      });
    }

    return res.send({
      _status: true,
      _message: "Admin Profile Found",
      adminData: adminData,
    });
  } catch (error) {
    console.log("VIEW ADMIN PROFILE ERROR:", error);

    return res.send({
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

// ==============================
// UPDATE ADMIN PROFILE
// ==============================

let updateAdminProfile = async (req, res) => {
  try {
    let adminID = req.adminID;

    let { name, email, mobile_number } = req.body;

    let adminData = await adminModel.findOne({
      _id: adminID,
      role_type: "admin",
      deleted_at: null,
    });

    if (!adminData) {
      return res.send({
        _status: false,
        _message: "Admin Profile Not Found",
      });
    }

    // Update name
    if (name) {
      adminData.name = name;
    }

    // Update email
    if (email) {
      adminData.email = email;
    }

    // Update mobile number
    if (mobile_number) {
      adminData.mobile_number = mobile_number;
    }

    // Update profile image
    if (req.file) {
      adminData.profileImage = req.file.filename;
    }

    await adminData.save();

    return res.send({
      _status: true,
      _message: "Admin Profile Updated Successfully",

      adminData: {
        _id: adminData._id,
        name: adminData.name,
        email: adminData.email,
        mobile_number: adminData.mobile_number,
        profileImage: adminData.profileImage,
        role_type: adminData.role_type,
      },
    });
  } catch (error) {
    console.log("UPDATE ADMIN PROFILE ERROR:", error);

    return res.send({
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


let changeAdminPassword = async (req, res) => {
  try {
    let adminID = req.adminID;

    let { currentPassword, newPassword, confirmPassword } = req.body;

    // Check required fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.send({
        _status: false,
        _message: "All password fields are required",
      });
    }

    // Check new password and confirm password
    if (newPassword !== confirmPassword) {
      return res.send({
        _status: false,
        _message: "New Password and Confirm Password do not match",
      });
    }

    // Find admin
    let adminData = await adminModel.findOne({
      _id: adminID,
      role_type: "admin",
      deleted_at: null,
    });

    if (!adminData) {
      return res.send({
        _status: false,
        _message: "Admin Profile Not Found",
      });
    }

    // Check current password
    let checkPassword = bcrypt.compareSync(currentPassword, adminData.password);

    if (!checkPassword) {
      return res.send({
        _status: false,
        _message: "Current Password is incorrect",
      });
    }

    // Hash new password
    let hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    adminData.password = hashedPassword;

    await adminData.save();

    return res.send({
      _status: true,
      _message: "Admin Password Changed Successfully",
    });
  } catch (error) {
    console.log("CHANGE ADMIN PASSWORD ERROR:", error);

    return res.send({
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

// ==============================
// EXPORT
// ==============================

module.exports = {
  createAdmin,
  viewAdminProfile,
  updateAdminProfile,
  uploadAdminImage,
  changeAdminPassword,
};
