// let express = require('express');
// const { authUserRoutes } = require("./authUserRoutes");

// let websiteRoutes = express.Router();


// websiteRoutes.use("/user", authUserRoutes);




// module.exports = { websiteRoutes };


let express = require("express");

const { authUserRoutes } = require("./authUserRoutes");
const { productRoutes } = require("./productRoutes");
const { colorRoutes } = require("./colorRoutes");
const { dashboardRoutes } = require("./dashboardRoutes");
const { faqRoutes } = require("./faqRoutes");
const { subCategoryRoutes } = require("./subCategoryRoutes");
const { wishlistRoutes } = require("./wishlistRoutes");
const { addressRoutes } = require("./addressRoutes");
const { countryRoutes } = require("./countryRoutes");


let websiteRoutes = express.Router();


// User Routes
websiteRoutes.use("/user", authUserRoutes);

// Product Routes
websiteRoutes.use("/product", productRoutes);

// Color Routes
websiteRoutes.use("/color", colorRoutes);

websiteRoutes.use("/dashboard", dashboardRoutes);

websiteRoutes.use("/faq", faqRoutes);

websiteRoutes.use("/sub-category", subCategoryRoutes);

websiteRoutes.use("/wishlist", wishlistRoutes);

websiteRoutes.use("/address", addressRoutes);


websiteRoutes.use("/country", countryRoutes);


module.exports = { websiteRoutes };
