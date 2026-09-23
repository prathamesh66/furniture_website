const express = require("express");

const {
  createAdmin,
  viewAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  uploadAdminImage,
} = require("../../controller/admin/adminController");

const { checkAdminToken } = require("../../middleware/admin/adminCheckToken");

let adminAccountRoutes = express.Router();

// Create Admin
adminAccountRoutes.post("/create", createAdmin);

// View Admin Profile
adminAccountRoutes.get("/profile", checkAdminToken, viewAdminProfile);

// Update Admin Profile
adminAccountRoutes.put(
  "/update",
  checkAdminToken,
  uploadAdminImage.single("profileImage"),
  updateAdminProfile,
);

// Change Admin Password
adminAccountRoutes.put(
  "/change-password",
  checkAdminToken,
  changeAdminPassword,
);

module.exports = {
  adminAccountRoutes,
};
