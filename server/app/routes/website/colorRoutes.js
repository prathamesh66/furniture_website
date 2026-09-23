let express = require("express");
const { viewAllColors } = require("../../controller/website/colorController");


let colorRoutes = express.Router();

colorRoutes.get("/list", viewAllColors);

module.exports = { colorRoutes };
