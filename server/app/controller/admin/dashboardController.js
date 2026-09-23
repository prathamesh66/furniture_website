

const { userModel } = require("../../model/authUserModel");
const { categoryModel } = require("../../model/categoryModel");
const orderModal = require("../../model/orderModel");
const { productModel } = require("../../model/productModel");

let adminDashboard = async (req, res) => {
  try {
    let totalUsers = await userModel.countDocuments({
      deleted_at: null,
    });

    let totalProducts = await productModel.countDocuments({
      isDeleted: false,
    });

    let totalCategories = await categoryModel.countDocuments({
      isDeleted: false,
    });

    let totalOrders = await orderModal.countDocuments();

    return res.send({
      _status: true,
      _message: "Dashboard Data Found",
      dashboardData: {
        users: totalUsers,
        products: totalProducts,
        categories: totalCategories,
        orders: totalOrders,
      },
    });
  } catch (error) {
    console.log("ADMIN DASHBOARD ERROR:", error);

    return res.send({
      _status: false,
      _message: "Something went wrong",
      errors: [
        {
          error: error.message,
        },
      ],
    });
  }
};

module.exports = {
  adminDashboard,
};
