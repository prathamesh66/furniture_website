const express = require("express");
const { websiteFaq } = require("../../controller/website/faqController");


let faqRoutes = express.Router();

faqRoutes.get("/", websiteFaq);

module.exports = {
  faqRoutes,
};
