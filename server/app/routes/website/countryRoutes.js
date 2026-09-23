const express = require("express");
const { viewCountry } = require("../../controller/website/countryController");


const countryRoutes = express.Router();

countryRoutes.get("/view", viewCountry);

module.exports = {
  countryRoutes,
};
