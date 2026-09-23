const express = require("express");
const { adminLogin } = require("../../controller/admin/loginController");


let loginRoutes = express.Router();

loginRoutes.post("/login", adminLogin);

module.exports = {
  loginRoutes,
};
