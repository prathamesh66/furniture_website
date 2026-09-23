const express = require("express");



const { adminDashboard } = require("../../controller/admin/dashboardController");
const { checkAdminToken } = require("../../middleware/admin/adminCheckToken");

let dashboardRoutes = express.Router();

dashboardRoutes.get("/", checkAdminToken, adminDashboard);

module.exports = {
  dashboardRoutes,
};
