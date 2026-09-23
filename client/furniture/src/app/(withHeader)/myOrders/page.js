"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  deleteMyOrder,
  getMyOrders,
} from "@/app/api-services/orderApiServices";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteOrder = async (id) => {
    const data = await deleteMyOrder(id);

    console.log("DELETE ORDER RESPONSE:", data);

    if (data._status) {
      setOrders((previousOrders) =>
        previousOrders.filter((order) => order._id !== id),
      );
      toast.success("Order removed successfully");
    } else {
      toast.error(data._message || "Failed to remove order");
    }
  };

  const fetchMyOrders = async () => {
    try {
      const data = await getMyOrders();

      console.log("MY ORDERS RESPONSE:", data);

      if (data._status) {
        setOrders(data._data || []);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log("MY ORDERS ERROR:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-12 sm:py-16 md:py-20 text-center px-4">
        <p className="text-base sm:text-lg">Loading Orders...</p>
      </div>
    );
  }

  return (
    <div className="w-full py-6 sm:py-8 md:py-10">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="border p-6 sm:p-8 md:p-10 text-center">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              No Orders Found
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mb-5">
              You have not placed any orders yet.
            </p>

            <Link
              href="/"
              className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-black text-white text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 sm:p-5 md:p-6">
                {/* ORDER HEADER */}

                <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4 border-b pb-4 mb-4">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Order Number
                    </p>

                    <p className="font-semibold break-all">
                      {order.order_number}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Order Date
                    </p>

                    <p className="text-sm sm:text-base">
                      {new Date(order.created_at).toLocaleDateString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Total</p>

                    <p className="font-semibold text-sm sm:text-base">
                      ₹{order.net_amount}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <Link
                      href={`/myOrders/${order._id}`}
                      className="px-4 sm:px-5 py-2 border border-black text-black hover:bg-black hover:text-white transition text-center text-sm sm:text-base"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDeleteOrder(order._id)}
                      className="px-4 sm:px-5 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition cursor-pointer text-sm sm:text-base"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* PRODUCTS */}

                <div className="space-y-4">
                  {order.product_info?.map((product, index) => (
                    <div
                      key={product._id || index}
                      className="flex items-center gap-3 sm:gap-4"
                    >
                      <img
                        src={`http://localhost:8000/uploads/product/${product.productImage}`}
                        alt={product.productName || "Product"}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover border shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm sm:text-base break-words">
                          {product.productName}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-500">
                          Quantity: {product.qty}
                        </p>
                      </div>

                      <div className="font-semibold text-sm sm:text-base shrink-0">
                        ₹{product.productPrice}
                      </div>
                    </div>
                  ))}
                </div>

                {/* STATUS */}

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-8 mt-5 sm:mt-6 pt-4 border-t">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Payment Status
                    </p>

                    <p className="font-medium text-sm sm:text-base">
                      {order.payment_status === 2
                        ? "Success"
                        : order.payment_status === 3
                          ? "Failed"
                          : "Pending"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Order Status
                    </p>

                    <p className="font-medium text-sm sm:text-base">
                      {order.order_status === 1
                        ? "Order Placed"
                        : order.order_status === 2
                          ? "Order Received"
                          : order.order_status === 3
                            ? "In Transit"
                            : order.order_status === 4
                              ? "Out for Delivery"
                              : order.order_status === 5
                                ? "Completed"
                                : order.order_status === 6
                                  ? "Cancelled"
                                  : "Failed"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
