const express = require("express");
const { checkToken } = require("../../middleware/checkToken");
const { addWishlist, viewWishlist, removeWishlist } = require("../../controller/website/wishlistController");



let wishlistRoutes = express.Router();

wishlistRoutes.post("/add", checkToken, addWishlist);

wishlistRoutes.get("/", checkToken, viewWishlist);

wishlistRoutes.delete("/remove/:productId", checkToken, removeWishlist);

module.exports = {
  wishlistRoutes,
};
