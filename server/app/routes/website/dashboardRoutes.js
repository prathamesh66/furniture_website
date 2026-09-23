const express = require("express");
const { userDashboard } = require("../../controller/website/dashboardController");
const { checkToken } = require("../../middleware/checkToken");


let dashboardRoutes = express.Router();

dashboardRoutes.get("/", checkToken, userDashboard);

module.exports = { dashboardRoutes };
