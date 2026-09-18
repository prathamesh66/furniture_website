// let express = require('express');
// const { authUserRoutes } = require("./authUserRoutes");

// let websiteRoutes = express.Router();


// websiteRoutes.use("/user", authUserRoutes);




// module.exports = { websiteRoutes };


let express = require("express");

const { authUserRoutes } = require("./authUserRoutes");
const { productRoutes } = require("./productRoutes");


let websiteRoutes = express.Router();


// User Routes
websiteRoutes.use("/user", authUserRoutes);

// Product Routes
websiteRoutes.use("/product", productRoutes);


module.exports = { websiteRoutes };
