const orderModal = require("../../model/orderModel");

let userDashboard = async (req, res) => {
  try {
    let userID = req.userID;

    if (!userID) {
      return res.send({
        _status: false,
        _message: "User ID is required",
      });
    }

    // ==============================
    // TOTAL ORDERS
    // ==============================

    let totalOrders = await orderModal.countDocuments({
      userID: userID,
      deleted_at: null,
    });

    // ==============================
    // PENDING ORDERS
    // ==============================

    let pendingOrders = await orderModal.countDocuments({
      userID: userID,
      deleted_at: null,
      order_status: {
        $in: [1, 2, 3, 4],
      },
    });

    // ==============================
    // COMPLETED ORDERS
    // ==============================

    let completedOrders = await orderModal.countDocuments({
      userID: userID,
      deleted_at: null,
      order_status: 5,
    });

    // ==============================
    // TOTAL SPENT
    // ==============================

    let totalSpentResult = await orderModal.aggregate([
      {
        $match: {
          userID: userID,
          deleted_at: null,
          payment_status: 2,
        },
      },
      {
        $group: {
          _id: null,
          totalSpent: {
            $sum: "$net_amount",
          },
        },
      },
    ]);

    let totalSpent =
      totalSpentResult.length > 0 ? totalSpentResult[0].totalSpent : 0;

    // ==============================
    // RECENT ORDERS
    // ==============================

    let recentOrders = await orderModal
      .find({
        userID: userID,
        deleted_at: null,
      })
      .sort({
        created_at: -1,
      })
      .limit(5)
      .select("order_number net_amount payment_status order_status created_at");

    // ==============================
    // RESPONSE
    // ==============================

    return res.send({
      _status: true,
      _message: "User Dashboard Data Found",

      dashboardData: {
        totalOrders: totalOrders,
        pendingOrders: pendingOrders,
        completedOrders: completedOrders,
        totalSpent: totalSpent,
        recentOrders: recentOrders,
      },
    });
  } catch (error) {
    console.log("USER DASHBOARD ERROR:", error);

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
  userDashboard,
};
