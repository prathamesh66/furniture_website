
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../common/Breadcrumb";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Order Status
  const [orderStatus, setOrderStatus] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // ==========================================
  // GET ORDER DETAILS
  // ==========================================

  const getOrderDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/orders/view/${id}`
      );

      console.log("ORDER DETAILS RESPONSE:", response.data);

      if (response.data._status) {
        setOrder(response.data._data);
        setOrderStatus(response.data._data.order_status);
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

  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================

  const updateStatus = async () => {
    try {
      setUpdatingStatus(true);

      const response = await axios.put(
        `http://localhost:8000/admin/orders/status/${id}`,
        {
          order_status: Number(orderStatus),
        }
      );

      console.log("UPDATE STATUS RESPONSE:", response.data);

      if (response.data._status) {
        setOrder(response.data._data);

        setOrderStatus(response.data._data.order_status);

        alert("Order status updated successfully");
      } else {
        alert(response.data._message || "Status update failed");
      }
    } catch (error) {
      console.log("UPDATE STATUS ERROR:", error);

      alert("Something went wrong");
    } finally {
      setUpdatingStatus(false);
    }
  };

  // ==========================================
  // USE EFFECT
  // ==========================================

  useEffect(() => {
    getOrderDetails();
  }, [id]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="w-full">
        <Breadcrumb
          path="Orders"
          link="/orders"
          path2="Details"
        />

        <div className="p-5 text-center">
          Loading Order Details...
        </div>
      </section>
    );
  }

  // ==========================================
  // ORDER NOT FOUND
  // ==========================================

  if (!order) {
    return (
      <section className="w-full">
        <Breadcrumb
          path="Orders"
          link="/orders"
          path2="Details"
        />

        <div className="p-5 text-center">
          Order Not Found
        </div>
      </section>
    );
  }

  // ==========================================
  // ORDER DETAILS
  // ==========================================

  return (
    <section className="w-full">

      <Breadcrumb
        path="Orders"
        link="/orders"
        path2="Details"
      />

      <div className="m-5">

        <div className="mt-[30px] border rounded-lg overflow-hidden">

          {/* HEADER */}

          <div className="p-4">

            <h1 className="text-[25px] font-semibold">
              Order Details
            </h1>

          </div>

          <hr className="border-[#ccc]" />

          {/* ORDER INFORMATION */}

          <div className="p-5">

            <div className="grid grid-cols-2 gap-5">

              <div>
                <p className="text-gray-500">
                  Order Number
                </p>

                <p className="font-semibold">
                  {order.order_number}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Order Date
                </p>

                <p className="font-semibold">
                  {new Date(
                    order.created_at
                  ).toLocaleDateString("en-IN")}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Customer Name
                </p>

                <p className="font-semibold">
                  {order.name}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Mobile Number
                </p>

                <p className="font-semibold">
                  {order.mobile_number}
                </p>
              </div>

            </div>

            {/* PRODUCTS */}

            <div className="mt-8">

              <h2 className="text-xl font-semibold mb-4">
                Products
              </h2>

              <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                  <thead>

                    <tr className="bg-[#cccccc59]">

                      <th className="border p-3 text-left">
                        Product
                      </th>

                      <th className="border p-3 text-center">
                        Quantity
                      </th>

                      <th className="border p-3 text-center">
                        Price
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {order.product_info?.map(
                      (product, index) => (

                        <tr key={index}>

                          <td className="border p-3">
                            {product.productName}
                          </td>

                          <td className="border p-3 text-center">
                            {product.qty}
                          </td>

                          <td className="border p-3 text-center">
                            ₹{product.productPrice}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

            {/* PRICE DETAILS */}

            <div className="mt-8 flex justify-end">

              <div className="w-[350px] border rounded-lg p-5">

                <h2 className="text-xl font-semibold mb-4">
                  Price Details
                </h2>

                <div className="flex justify-between mb-3">
                  <span>Total Amount</span>
                  <span>₹{order.total_amount}</span>
                </div>

                <div className="flex justify-between mb-3">
                  <span>Discount</span>
                  <span>₹{order.discount_amount}</span>
                </div>

                <hr className="my-3" />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Net Amount</span>
                  <span>₹{order.net_amount}</span>
                </div>

              </div>

            </div>

            {/* PAYMENT INFORMATION */}

            <div className="mt-8">

              <h2 className="text-xl font-semibold mb-4">
                Payment Information
              </h2>

              <div className="grid grid-cols-2 gap-5">

                {/* PAYMENT STATUS */}

                <div>
                  <p className="text-gray-500">
                    Payment Status
                  </p>

                  <p className="font-semibold">
                    {order.payment_status === 2
                      ? "Success"
                      : order.payment_status === 3
                        ? "Failed"
                        : "Pending"}
                  </p>
                </div>

                {/* PAYMENT ID */}

                <div>
                  <p className="text-gray-500">
                    Payment ID
                  </p>

                  <p className="font-semibold">
                    {order.payment_id || "Not Available"}
                  </p>
                </div>

                {/* ORDER STATUS */}

                <div>

                  <p className="text-gray-500 mb-2">
                    Order Status
                  </p>

                  <select
                    value={orderStatus}
                    onChange={(e) =>
                      setOrderStatus(e.target.value)
                    }
                    className="border border-[#ccc] rounded-lg px-3 py-2 w-full"
                  >

                    <option value="1">
                      Order Placed
                    </option>

                    <option value="2">
                      Order Received
                    </option>

                    <option value="3">
                      In Transit
                    </option>

                    <option value="4">
                      Out for Delivery
                    </option>

                    <option value="5">
                      Completed
                    </option>

                    <option value="6">
                      Cancelled
                    </option>

                    <option value="7">
                      Failed
                    </option>

                  </select>

                  <button
                    type="button"
                    onClick={updateStatus}
                    disabled={updatingStatus}
                    className="mt-3 bg-[#625FF1] text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50"
                  >
                    {updatingStatus
                      ? "Updating..."
                      : "Update Status"}
                  </button>

                </div>

                {/* RAZORPAY ORDER ID */}

                <div>

                  <p className="text-gray-500">
                    Razorpay Order ID
                  </p>

                  <p className="font-semibold">
                    {order.order_id || "Not Available"}
                  </p>

                </div>

              </div>

            </div>

            {/* BILLING ADDRESS */}

            <div className="mt-8">

              <h2 className="text-xl font-semibold mb-4">
                Billing Address
              </h2>

              <div className="border rounded-lg p-5">

                <pre className="whitespace-pre-wrap font-sans">
                  {JSON.stringify(
                    order.billing_address,
                    null,
                    2
                  )}
                </pre>

              </div>

            </div>

            {/* SHIPPING ADDRESS */}

            <div className="mt-8">

              <h2 className="text-xl font-semibold mb-4">
                Shipping Address
              </h2>

              <div className="border rounded-lg p-5">

                <pre className="whitespace-pre-wrap font-sans">
                  {JSON.stringify(
                    order.shipping_address,
                    null,
                    2
                  )}
                </pre>

              </div>

            </div>

            {/* ORDER NOTE */}

            {order.order_note && (

              <div className="mt-8">

                <h2 className="text-xl font-semibold mb-4">
                  Order Note
                </h2>

                <div className="border rounded-lg p-5">
                  {order.order_note}
                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default OrderDetails;

