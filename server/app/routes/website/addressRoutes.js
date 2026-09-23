const express = require("express");
const { checkToken } = require("../../middleware/checkToken");
const { addAddress, viewAddress, updateAddress } = require("../../controller/website/addressController");



const addressRoutes = express.Router();

addressRoutes.post("/add", checkToken, addAddress);

addressRoutes.get("/view", checkToken, viewAddress);

addressRoutes.put("/update", checkToken, updateAddress);

module.exports = {
  addressRoutes,
};
