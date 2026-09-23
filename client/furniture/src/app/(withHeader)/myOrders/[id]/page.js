"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getOrderDetails } from "@/app/api-services/orderApiServices";

const OrderDetails = () => {
  const params = useParams();

  const id = params.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // GET ORDER DETAILS
  // ==========================================

  const fetchOrderDetails = async () => {
    try {
      const data = await getOrderDetails(id);

      console.log("ORDER DETAILS RESPONSE:", data);

      if (data._status) {
        setOrder(data._data);
      } else {
        setOrder(null);
      }
    } catch (error) {
      console.log("ORDER DETAILS ERROR:", error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  // ==========================================
  // PAYMENT STATUS
  // ==========================================

  const getPaymentStatus = (status) => {
    if (status === 2) {
      return "Success";
    }

    if (status === 3) {
      return "Failed";
    }

    return "Pending";
  };

  // ==========================================
  // ORDER STATUS
  // ==========================================

  const getOrderStatus = (status) => {
    if (status === 1) {
      return "Order Placed";
    }

    if (status === 2) {
      return "Order Received";
    }

    if (status === 3) {
      return "In Transit";
    }

    if (status === 4) {
      return "Out for Delivery";
    }

    if (status === 5) {
      return "Completed";
    }

    if (status === 6) {
      return "Cancelled";
    }

    return "Failed";
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="w-full py-12 sm:py-16 md:py-20 text-center px-4">
        <p className="text-base sm:text-lg">Loading Order Details...</p>
      </div>
    );
  }

  // ==========================================
  // ORDER NOT FOUND
  // ==========================================

  if (!order) {
    return (
      <div className="w-full py-12 sm:py-16 md:py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4">
            Order Not Found
          </h1>

          <Link
            href="/my-orders"
            className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-black text-white text-sm sm:text-base"
          >
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="w-full py-6 sm:py-8 md:py-10">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================================
            HEADER
        ====================================== */}

        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Order Details
            </h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base break-all">
              Order Number: {order.order_number}
            </p>
          </div>

          <Link
            href="/my-orders"
            className="px-4 sm:px-5 py-2 border border-black hover:bg-black hover:text-white transition text-sm sm:text-base text-center w-full sm:w-auto"
          >
            Back to Orders
          </Link>
        </div>

        {/* ======================================
            ORDER INFORMATION
        ====================================== */}

        <div className="border p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
            Order Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500">Order Number</p>

              <p className="font-semibold break-all">{order.order_number}</p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500">Order Date</p>

              <p className="text-sm sm:text-base">
                {new Date(order.created_at).toLocaleDateString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500">Payment Status</p>

              <p className="font-medium text-sm sm:text-base">
                {getPaymentStatus(order.payment_status)}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500">Order Status</p>

              <p className="font-medium text-sm sm:text-base">
                {getOrderStatus(order.order_status)}
              </p>
            </div>
          </div>
        </div>

        {/* ======================================
            PRODUCTS
        ====================================== */}

        <div className="border p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
            Products
          </h2>

          <div className="space-y-4 sm:space-y-5">
            {order.product_info?.map((product, index) => (
              <div
                key={product._id || index}
                className="flex items-center gap-3 sm:gap-5 border-b pb-4 sm:pb-5"
              >
                <img
                  src={`http://localhost:8000/uploads/product/${product.productImage}`}
                  alt={product.productName || "Product"}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover border shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base break-words">
                    {product.productName}
                  </h3>

                  <p className="text-gray-500 mt-1 text-xs sm:text-sm">
                    Quantity: {product.qty}
                  </p>
                </div>

                <div className="font-semibold text-sm sm:text-base shrink-0">
                  ₹{product.productPrice}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================
            PRICE DETAILS
        ====================================== */}

        <div className="border p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
            Price Details
          </h2>

          <div className="w-full max-w-md ml-auto space-y-3 sm:space-y-4">
            <div className="flex justify-between gap-4 text-sm sm:text-base">
              <span>Subtotal</span>

              <span>₹{order.total_amount}</span>
            </div>

            <div className="flex justify-between gap-4 text-sm sm:text-base">
              <span>Discount</span>

              <span>₹{order.discount_amount}</span>
            </div>

            <div className="flex justify-between gap-4 border-t pt-3 sm:pt-4 text-base sm:text-lg font-semibold">
              <span>Total</span>

              <span>₹{order.net_amount}</span>
            </div>
          </div>
        </div>

        {/* ======================================
            PAYMENT INFORMATION
        ====================================== */}

        <div className="border p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
            Payment Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Payment Status</p>

              <p className="font-medium text-sm sm:text-base">
                {getPaymentStatus(order.payment_status)}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500">Payment ID</p>

              <p className="font-medium text-sm sm:text-base break-all">
                {order.payment_id || "Not Available"}
              </p>
            </div>
          </div>
        </div>

        {/* ======================================
            BILLING + SHIPPING
        ====================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* BILLING */}

          <div className="border p-4 sm:p-5 md:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
              Billing Address
            </h2>

            <p className="text-sm sm:text-base break-words">
              {order.billing_address?.name}
            </p>

            <p className="text-sm sm:text-base break-words">
              {order.billing_address?.email}
            </p>

            <p className="text-sm sm:text-base">
              {order.billing_address?.mobile_number}
            </p>

            <p className="mt-2 text-sm sm:text-base break-words">
              {order.billing_address?.address}
            </p>

            <p className="text-sm sm:text-base break-words">
              {order.billing_address?.city}, {order.billing_address?.state}
            </p>

            <p className="text-sm sm:text-base break-words">
              {order.billing_address?.country}
            </p>
          </div>

          {/* SHIPPING */}

          <div className="border p-4 sm:p-5 md:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
              Shipping Address
            </h2>

            <p className="text-sm sm:text-base break-words">
              {order.shipping_address?.name}
            </p>

            <p className="text-sm sm:text-base break-words">
              {order.shipping_address?.email}
            </p>

            <p className="text-sm sm:text-base">
              {order.shipping_address?.mobile_number}
            </p>

            <p className="mt-2 text-sm sm:text-base break-words">
              {order.shipping_address?.address}
            </p>

            <p className="text-sm sm:text-base break-words">
              {order.shipping_address?.city}, {order.shipping_address?.state}
            </p>

            <p className="text-sm sm:text-base break-words">
              {order.shipping_address?.country}
            </p>
          </div>
        </div>

        {/* ======================================
            ORDER NOTE
        ====================================== */}

        {order.order_note && (
          <div className="border p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Order Note
            </h2>

            <p className="text-gray-600 text-sm sm:text-base break-words">
              {order.order_note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
