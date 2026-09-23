
const express = require("express");
const { viewAllOrders, viewOrderDetails, updateOrderStatus, deleteOrder } = require("../../controller/website/placeOrderController");



let orderRoutes = express.Router();

// View All Orders
orderRoutes.get("/view", viewAllOrders);

// View Single Order Details
orderRoutes.get("/view/:id", viewOrderDetails);

orderRoutes.put("/status/:id", updateOrderStatus);

orderRoutes.delete("/delete/:id", deleteOrder);

module.exports = {
  orderRoutes,
};

