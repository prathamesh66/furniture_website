
import React, { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "../../common/Breadcrumb";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected Orders
  const [selectedOrders, setSelectedOrders] = useState([]);

  const navigate = useNavigate();

  // ==========================================
  // GET ALL ORDERS
  // ==========================================

  const getAllOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/admin/orders/view"
      );

      console.log("ALL ORDERS RESPONSE:", response.data);

      if (response.data._status) {
        setOrders(response.data._data || []);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log("ALL ORDERS ERROR:", error);

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SELECT / UNSELECT ORDER
  // ==========================================

  const handleCheckboxChange = (orderID) => {
    if (selectedOrders.includes(orderID)) {
      setSelectedOrders(
        selectedOrders.filter((id) => id !== orderID)
      );
    } else {
      setSelectedOrders([
        ...selectedOrders,
        orderID,
      ]);
    }
  };

  // ==========================================
  // DELETE SELECTED ORDERS
  // ==========================================

  const deleteSelectedOrders = async () => {
    if (selectedOrders.length === 0) {
      alert("Please select at least one order");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete selected orders?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      for (const orderID of selectedOrders) {
        const response = await axios.delete(
          `http://localhost:8000/admin/orders/delete/${orderID}`
        );

        console.log(
          "DELETE ORDER RESPONSE:",
          response.data
        );

        if (!response.data._status) {
          alert(
            response.data._message ||
              "Order delete failed"
          );

          return;
        }
      }

      alert("Order deleted successfully");

      // Clear selected orders
      setSelectedOrders([]);

      // Reload orders
      getAllOrders();

    } catch (error) {
      console.log("DELETE ORDER ERROR:", error);

      alert("Something went wrong while deleting order");
    }
  };

  // ==========================================
  // API CALL
  // ==========================================

  useEffect(() => {
    getAllOrders();
  }, []);

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
      <section className="w-full">

        <div>
          <Breadcrumb
            path="Orders"
            link="/orders"
            path2="View"
          />
        </div>

        <div className="m-5">

          <div className="mt-[30px] border-1 overflow-hidden rounded-lg">

            <div className="p-5 text-center">
              Loading Orders...
            </div>

          </div>

        </div>

      </section>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <>
      <section className="w-full">

        {/* BREADCRUMB */}

        <div>
          <Breadcrumb
            path="Orders"
            link="/orders"
            path2="View"
          />
        </div>

        <div className="m-5">

          <div className="mt-[30px] border-1 overflow-hidden rounded-lg">

            {/* HEADER */}

            <div className="flex justify-between p-3">

              <div className="text-[25px] font-semibold">
                Order's List
              </div>

            </div>

            <hr className="border-1 text-[#ccc]" />

            {/* TABLE */}

            <div className="border-0 border-[#ccc] overflow-x-auto">

              <table className="w-full">

                <thead className="w-full">

                  <tr className="w-full bg-[#cccccc59] text-black">

                    {/* DELETE */}

                    <th className="p-3 text-center">

                      <button
                        onClick={deleteSelectedOrders}
                        className="cursor-pointer bg-[#625FF1] py-2 px-3 rounded-lg text-white"
                      >
                        DELETE
                      </button>

                    </th>

                    <th className="p-3 text-left">
                      S.NO
                    </th>

                    <th className="p-3 text-left">
                      Order ID
                    </th>

                    <th className="p-3 text-left">
                      NAME
                    </th>

                    <th className="p-3 text-center">
                      QUANTITY
                    </th>

                    <th className="p-3 text-center">
                      PRICE
                    </th>

                    <th className="p-3 text-center">
                      DATE
                    </th>

                    <th className="p-3 text-center">
                      STATUS
                    </th>

                    <th className="p-3 text-center">
                      VIEW
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {orders.length === 0 ? (

                    <tr>

                      <td
                        colSpan="9"
                        className="p-8 text-center"
                      >
                        No Orders Found
                      </td>

                    </tr>

                  ) : (

                    orders.map((order, index) => (

                      <tr
                        key={order._id}
                        className="border-b"
                      >

                        {/* CHECKBOX */}

                        <td className="p-3 py-8 text-center">

                          <input
                            type="checkbox"
                            value={order._id}
                            checked={selectedOrders.includes(
                              order._id
                            )}
                            onChange={() =>
                              handleCheckboxChange(
                                order._id
                              )
                            }
                          />

                        </td>

                        {/* S.NO */}

                        <td className="p-3 py-8">
                          {index + 1}
                        </td>

                        {/* ORDER ID */}

                        <td className="p-3 py-8">
                          {order.order_number}
                        </td>

                        {/* NAME */}

                        <td className="p-3 py-8">
                          {order.name}
                        </td>

                        {/* QUANTITY */}

                        <td className="p-3 py-8 text-center">

                          {order.product_info?.reduce(
                            (total, product) =>
                              total +
                              Number(
                                product.qty || 0
                              ),
                            0
                          )}

                        </td>

                        {/* PRICE */}

                        <td className="p-3 py-8 text-center">
                          ₹{order.net_amount}
                        </td>

                        {/* DATE */}

                        <td className="p-3 py-8 text-center">

                          {new Date(
                            order.created_at
                          ).toLocaleDateString(
                            "en-IN"
                          )}

                        </td>

                        {/* STATUS */}

                        <td className="p-3 py-8 text-center">

                          <span>
                            {getOrderStatus(
                              order.order_status
                            )}
                          </span>

                          <div className="text-xs text-gray-500 mt-1">

                            Payment:{" "}
                            {getPaymentStatus(
                              order.payment_status
                            )}

                          </div>

                        </td>

                        {/* VIEW */}

                        <td className="p-3 py-8 text-center">

                          <span
                            className="p-2 border border-[#ccc] rounded-lg cursor-pointer px-3"
                            onClick={() =>
                              navigate(
                                `/orders/view/${order._id}`
                              )
                            }
                          >
                            View
                          </span>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </section>
    </>
  );
};

export default Orders;

