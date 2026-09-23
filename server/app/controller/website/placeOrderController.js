// const orderModal = require("../../model/orderModel");
// const Razorpay = require("razorpay");
// require("dotenv").config();

// // var instance = new Razorpay({
// //     key_id: 'rzp_test_WAft3lA6ly3OBc',
// //     key_secret: '68E17CNWY8SemCvZ6ylOkuOY',
// // });

// const instance = new Razorpay({
//   key_id:process.env.RAZORPAY_KEY_ID,
//   key_secret:process.env.RAZORPAY_KEY_SECRET,
// });

// let placeOrder = async (request, response) => {
//   try {
//     let dataSave = request.body;

//     // Get logged-in user ID from JWT
//     dataSave.userID = request.userID;

//     // console.log("USER ID:", request.userID);
//     // console.log("ORDER DATA:", dataSave);

//     let orderCount = await orderModal.countDocuments();

//     dataSave.order_number = "MONSTA_" + (1001 + orderCount);

//     // Save order
//     let result = await orderModal(dataSave).save();

//     // console.log("ORDER SAVED:", result);

//     // Create Razorpay order
//     let orderInfo = await instance.orders.create({
//       amount: result.net_amount * 100,
//       currency: "INR",
//       receipt: result._id.toString(),
//       partial_payment: false,
//     });

//     console.log("RAZORPAY ORDER:", orderInfo);

//     // Save Razorpay order ID
//     await orderModal.updateOne(
//       {
//         _id: result._id,
//       },
//       {
//         $set: {
//           order_id: orderInfo.id,
//         },
//       },
//     );

//     let orderdata = await orderModal.findOne({
//       _id: result._id,
//     });

//     console.log("FINAL ORDER:", orderdata);

//     response.send({
//       _status: true,
//       _message: "Order Placed",
//       orderInfo: orderInfo,
//       _data: orderdata,
//     });
//   } catch (error) {
//     console.log("=================================");
//     // console.log("PLACE ORDER ERROR:", error);
//     // console.log("ERROR MESSAGE:", error.message);
//     // console.log("ERROR STACK:", error.stack);
//     // console.log("=================================");

//     response.send({
//       _status: false,
//       _message: "Something went wrong",
//       errors: [
//         {
//           error: error.message,
//         },
//       ],
//     });
//   }
// };

// let changeOrderStatus = async (request, response) => {
//   var paymentInfo = await instance.payments.fetch(request.body.payment_id);

//   if (paymentInfo.status == "failed") {
//     var datasave = {
//       payment_status: 3,
//       order_status: 7,
//       payment_id: request.body.payment_id,
//     };
//   } else {
//     var datasave = {
//       payment_status: 2,
//       order_status: 2,
//       payment_id: request.body.payment_id,
//     };
//   }

//   await orderModal
//     .updateOne(
//       {
//         order_id: request.body.order_id,
//       },
//       {
//         $set: datasave,
//       },
//     )
//     .then(async () => {
//       var orderInfo = await orderModal.findOne({
//         order_id: request.body.order_id,
//       });

//       const data = {
//         _status: true,
//         _message: "Order placed",
//         _data: orderInfo,
//       };

//       response.send(data);
//     })
//     .catch((error) => {
//       console.log(error);
//       const data = {
//         _status: false,
//         _message: "Something went wrong",
//       };

//       response.send(data);
//     });
// };

// module.exports = {
//   placeOrder,
//   changeOrderStatus,
// };




const orderModal = require("../../model/orderModel");
const Razorpay = require("razorpay");

require("dotenv").config();

// ==========================================
// RAZORPAY INSTANCE
// ==========================================

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ==========================================
// PLACE ORDER
// ==========================================

let placeOrder = async (request, response) => {
  try {
    // Get data from frontend
    let dataSave = request.body;

    // Get logged-in user ID from JWT
    dataSave.userID = request.userID;

    // Check Product Info
    if (!dataSave.product_info || dataSave.product_info.length === 0) {
      return response.send({
        _status: false,
        _message: "Product Info is required",
      });
    }

    // Generate Order Number
    let orderCount = await orderModal.countDocuments();

    dataSave.order_number = "MONSTA_" + (1001 + orderCount);

    // Save Order in MongoDB
    let result = await orderModal(dataSave).save();

    console.log("ORDER SAVED:", result);

    // ==========================================
    // CREATE RAZORPAY ORDER
    // ==========================================

    let orderInfo = await instance.orders.create({
      amount: result.net_amount * 100,
      currency: "INR",
      receipt: result._id.toString(),
      partial_payment: false,
    });

    console.log("RAZORPAY ORDER:", orderInfo);

    // ==========================================
    // SAVE RAZORPAY ORDER ID
    // ==========================================

    await orderModal.updateOne(
      {
        _id: result._id,
      },
      {
        $set: {
          order_id: orderInfo.id,
        },
      },
    );

    // ==========================================
    // GET UPDATED ORDER
    // ==========================================

    let orderdata = await orderModal.findOne({
      _id: result._id,
    });

    console.log("FINAL ORDER:", orderdata);

    // ==========================================
    // SEND RESPONSE
    // ==========================================

    response.send({
      _status: true,
      _message: "Order Placed",
      orderInfo: orderInfo,
      _data: orderdata,
    });
  } catch (error) {
    console.log("=================================");
    console.log("PLACE ORDER ERROR:", error.message);
    console.log("=================================");

    response.send({
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

// ==========================================
// CHANGE ORDER STATUS
// ==========================================

let changeOrderStatus = async (request, response) => {
  try {
    // Check Payment ID
    if (!request.body.payment_id) {
      return response.send({
        _status: false,
        _message: "Payment ID is required",
      });
    }

    // ==========================================
    // GET PAYMENT INFORMATION
    // ==========================================

    let paymentInfo = await instance.payments.fetch(request.body.payment_id);

    console.log("PAYMENT INFO:", paymentInfo);

    let dataSave;

    // ==========================================
    // PAYMENT FAILED
    // ==========================================

    if (paymentInfo.status === "failed") {
      dataSave = {
        payment_status: 3,
        order_status: 7,
        payment_id: request.body.payment_id,
      };
    }

    // ==========================================
    // PAYMENT SUCCESS
    // ==========================================
    else {
      dataSave = {
        payment_status: 2,
        order_status: 2,
        payment_id: request.body.payment_id,
      };
    }

    // ==========================================
    // UPDATE ORDER
    // ==========================================

    let updateResult = await orderModal.updateOne(
      {
        order_id: request.body.order_id,
      },
      {
        $set: dataSave,
      },
    );

    // Check Order
    if (updateResult.matchedCount === 0) {
      return response.send({
        _status: false,
        _message: "Order not found",
      });
    }

    // ==========================================
    // GET UPDATED ORDER
    // ==========================================

    let orderInfo = await orderModal.findOne({
      order_id: request.body.order_id,
    });

    // ==========================================
    // SEND RESPONSE
    // ==========================================

    response.send({
      _status: true,
      _message: "Order placed",
      _data: orderInfo,
    });
  } catch (error) {
    console.log("=================================");
    console.log("CHANGE ORDER STATUS ERROR:", error.message);
    console.log("=================================");

    response.send({
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

// ==========================================
// VIEW MY ORDERS
// ==========================================

let viewMyOrders = async (request, response) => {
  try {
    // Get logged-in user ID from JWT
    let userID = request.userID;

    // Get all orders of logged-in user
    let orderData = await orderModal
      .find({
        userID: userID,
        deleted_at: null,
      })
      .sort({
        created_at: -1,
      });

    response.send({
      _status: true,
      _message: "My Orders",
      _data: orderData,
    });
  } catch (error) {
    console.log("=================================");
    console.log("VIEW MY ORDERS ERROR:", error.message);
    console.log("=================================");

    response.send({
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

let deleteMyOrder = async (request, response) => {
  try {
    let userID = request.userID;
    let orderID = request.params.id;
    let result = await orderModal.updateOne(
      { _id: orderID, userID: userID, deleted_at: null },
      { $set: { deleted_at: new Date() } },
    );
    if (result.matchedCount === 0) {
      return response.send({ _status: false, _message: "Order not found" });
    }
    response.send({ _status: true, _message: "Order removed successfully" });
  } catch (error) {
    console.log("DELETE MY ORDER ERROR:", error);
    response.send({ _status: false, _message: "Something went wrong" });
  }
};



let getOrderDetails = async (request, response) => {
  try {
    let userID = request.userID;
    let orderID = request.params.id;

    let orderData = await orderModal.findOne({
      _id: orderID,
      userID: userID,
      deleted_at: null,
    });

    if (!orderData) {
      return response.send({
        _status: false,
        _message: "Order not found",
        _data: null,
      });
    }

    response.send({
      _status: true,
      _message: "Order Details",
      _data: orderData,
    });

  } catch (error) {

    console.log("ORDER DETAILS ERROR:", error);

    response.send({
      _status: false,
      _message: "Something went wrong",
      _data: null,
    });
  }
};


let viewAllOrders = async (request, response) => {
  try {
    let orderData = await orderModal
      .find({ deleted_at: null })
      .sort({ created_at: -1 });
    response.send({ _status: true, _message: "All Orders", _data: orderData });
  } catch (error) {
    console.log("VIEW ALL ORDERS ERROR:", error);
    response.send({
      _status: false,
      _message: "Something went wrong",
      _data: [],
    });
  }
};


let viewOrderDetails = async (request, response) => {
  try {
    let orderID = request.params.id;
    let orderData = await orderModal.findOne({
      _id: orderID,
      deleted_at: null,
    });
    if (!orderData) {
      return response.send({
        _status: false,
        _message: "Order not found",
        _data: null,
      });
    }
    response.send({
      _status: true,
      _message: "Order Details",
      _data: orderData,
    });
  } catch (error) {
    console.log("VIEW ORDER DETAILS ERROR:", error);
    response.send({
      _status: false,
      _message: "Something went wrong",
      _data: null,
    });
  }
};



let updateOrderStatus = async (request, response) => {
  try {
    let orderID = request.params.id;
    let orderStatus = Number(request.body.order_status);

    // Check order status
    if (!orderStatus) {
      return response.send({
        _status: false,
        _message: "Order Status is required",
      });
    }

    // Only allow status 1 to 7
    if (orderStatus < 1 || orderStatus > 7) {
      return response.send({
        _status: false,
        _message: "Invalid Order Status",
      });
    }

    // Update order status
    let result = await orderModal.updateOne(
      {
        _id: orderID,
        deleted_at: null,
      },
      {
        $set: {
          order_status: orderStatus,
          updated_at: new Date(),
        },
      },
    );

    // Check order
    if (result.matchedCount === 0) {
      return response.send({
        _status: false,
        _message: "Order not found",
      });
    }

    // Get updated order
    let orderData = await orderModal.findOne({
      _id: orderID,
      deleted_at: null,
    });

    response.send({
      _status: true,
      _message: "Order status updated successfully",
      _data: orderData,
    });
  } catch (error) {
    console.log("UPDATE ORDER STATUS ERROR:", error);

    response.send({
      _status: false,
      _message: "Something went wrong",
    });
  }
};


let deleteOrder = async (request, response) => {
  try {
    let orderID = request.params.id;

    let result = await orderModal.updateOne(
      {
        _id: orderID,
        deleted_at: null,
      },
      {
        $set: {
          deleted_at: new Date(),
          updated_at: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return response.send({
        _status: false,
        _message: "Order not found",
      });
    }

    response.send({
      _status: true,
      _message: "Order deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ORDER ERROR:", error);

    response.send({
      _status: false,
      _message: "Something went wrong",
    });
  }
};



// ==========================================
// EXPORT
// ==========================================

module.exports = {
  placeOrder,
  changeOrderStatus,
  viewMyOrders,
  deleteMyOrder,
  getOrderDetails,
  viewAllOrders,
  viewOrderDetails,
  updateOrderStatus,
  deleteOrder,
};
