const express = require("express");
const { websiteSubCategory } = require("../../controller/website/subCategoryController");



let subCategoryRoutes = express.Router();

subCategoryRoutes.get("/", websiteSubCategory);

module.exports = { subCategoryRoutes };
