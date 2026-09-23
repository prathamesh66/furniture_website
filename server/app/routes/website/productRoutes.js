
const express = require("express");


let productRoutes = express.Router();


const {
  viewProduct,
  viewFeaturedProduct,
  viewNewArrivalProduct,
  viewOnSaleProduct,
  viewBestSellingProduct,
  viewTopRatedProduct,
  getProductDetails,
  productListing,
} = require("../../controller/website/productController");




// All Products
productRoutes.get("/view", viewProduct);

// Featured Products
productRoutes.get("/featured", viewFeaturedProduct);

// New Arrivals
productRoutes.get("/new-arrivals", viewNewArrivalProduct);

// On Sale
productRoutes.get("/on-sale", viewOnSaleProduct);

// Best Selling
productRoutes.get("/best-selling", viewBestSellingProduct);

// Top Rated
productRoutes.get("/top-rated", viewTopRatedProduct);

// product Details
productRoutes.get("/productDetails/:id", getProductDetails);

productRoutes.get("/listing", productListing);


module.exports = { productRoutes };
