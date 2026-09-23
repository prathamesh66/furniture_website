"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { Login_register } from "../redux/loginSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

export default function MyDashboard() {


  let APIBASEURL = process.env.NEXT_PUBLIC_APIBASEPATH;



  const [activeSection, setActiveSection] = useState("dashboard");

  const [userProfile, setUserProfile] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalSpent: 0,
    recentOrders: [],
  });

  const [dashboardLoading, setDashboardLoading] = useState(true);


  const [countries, setCountries] = useState([]);


  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await axios.get(`${APIBASEURL}country/view`);

        console.log("COUNTRY RESPONSE:", response.data);

        if (response.data._status) {
          setCountries(response.data.countryData);
        }
      } catch (error) {
        console.log("COUNTRY API ERROR:", error);
      }
    };

    getCountries();
  }, []);

  // ================= ADDRESS STATE =================

  const [addressData, setAddressData] = useState({
    _id: "",
    billing: {
      name: "",
      email: "",
      mobile_number: "",
      address: "",
      country: "",
      state: "",
      city: "",
    },
    shipping: {
      name: "",
      email: "",
      mobile_number: "",
      address: "",
      country: "",
      state: "",
      city: "",
    },
  });

  const router = useRouter();
  const dispatch = useDispatch();


  // ================= USER PROFILE =================

  useEffect(() => {
    axios
      .post(
        `${APIBASEURL}user/viewProfile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("user_login")}`,
          },
        },
      )
      .then((res) => {
        console.log("VIEW PROFILE RESPONSE:", res.data);

        if (res.data._status) {
          setUserProfile(res.data._userProfile);
          setSelectedTitle(res.data._userProfile.gender);
        } else {
          console.log("PROFILE ERROR:", res.data._message);
        }
      })
      .catch((error) => {
        console.log("PROFILE API ERROR:", error);
      });
  }, []);

  // ================= USER DASHBOARD =================

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await axios.get(`${APIBASEURL}dashboard/`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("user_login")}`,
          },
        });

        console.log("USER DASHBOARD RESPONSE:", response.data);

        if (response.data._status) {
          setDashboardData(response.data.dashboardData);
        } else {
          toast.error(response.data._message);
        }
      } catch (error) {
        console.log("USER DASHBOARD ERROR:", error);
        toast.error("Something Went Wrong");
      } finally {
        setDashboardLoading(false);
      }
    };

    getDashboardData();
  }, []);

  // ================= GET ADDRESS =================

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await axios.get(`${APIBASEURL}address/view`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("user_login")}`,
          },
        });

        console.log("ADDRESS RESPONSE:", response.data);

        if (response.data._status) {
          setAddressData(response.data.address);
        } else {
          console.log("ADDRESS ERROR:", response.data._message);
        }
      } catch (error) {
        console.log("ADDRESS API ERROR:", error);
      }
    };

    getAddress();
  }, []);

  // ================= ADD / UPDATE ADDRESS =================

  const handleAddressSubmit = async (e, type) => {
    e.preventDefault();

    try {
      let response;

      if (addressData._id) {
        response = await axios.put(
          `${APIBASEURL}address/update`,
          {
            billing: addressData.billing,
            shipping: addressData.shipping,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("user_login")}`,
              "Content-Type": "application/json",
            },
          },
        );
      } else {
        response = await axios.post(
          `${APIBASEURL}address/add`,
          {
            billing: addressData.billing,
            shipping: addressData.shipping,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("user_login")}`,
              "Content-Type": "application/json",
            },
          },
        );
      }

      console.log("ADDRESS SAVE RESPONSE:", response.data);

      if (response.data._status) {
        toast.success(
          `${type === "billing" ? "Billing" : "Shipping"} address ${
            addressData._id ? "updated" : "saved"
          } successfully`,
        );

        if (response.data.address) {
          setAddressData(response.data.address);
        }
      } else {
        toast.error(response.data._message);
      }
    } catch (error) {
      console.log("ADDRESS SAVE ERROR:", error);

      if (error.response?.data?._message) {
        toast.error(error.response.data._message);
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  // ================= UPDATE PROFILE =================

  let handleUpdateProfile = (e) => {
    e.preventDefault();

    axios
      .post(`${APIBASEURL}user/updateProfile`, e.target, {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_login")}`,
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
          toast.success(finalRes._message);
        } else {
          toast.error(finalRes._message);
        }
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      });
  };

  // ================= CHANGE PASSWORD =================

  let handleChangePassword = (e) => {
    e.preventDefault();

    let data = {
      oldPassword: e.target.oldPassword.value,
      newPassword: e.target.newPassword.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    axios
      .post(`${APIBASEURL}user/changePassword`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_login")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
          toast.success(finalRes._message);
          e.target.reset();
        } else {
          toast.error(finalRes._message);
        }
      })
      .catch((error) => {
        console.log("CHANGE PASSWORD ERROR:", error);
        toast.error("Something Went Wrong");
      });
  };

  // ================= LOGOUT =================

  let handleLogout = () => {
    Cookies.remove("user_login");

    dispatch(Login_register(0));

    router.push("/login-register");
  };

  // ================= ORDER STATUS =================

  const getOrderStatus = (status) => {
    switch (status) {
      case 1:
        return "Order Placed";

      case 2:
        return "Order Received";

      case 3:
        return "In Transit";

      case 4:
        return "Out for Delivery";

      case 5:
        return "Completed";

      case 6:
        return "Cancelled";

      case 7:
        return "Failed";

      default:
        return "Unknown";
    }
  };

  // ================= DATE FORMAT =================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="w-full">
      <div>
        <Breadcrumb title={"My Dashboard"} />
      </div>

      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <ToastContainer />

        <hr className="text-[#ccc]" />

        <div className="flex flex-col lg:flex-row mt-5 gap-5 lg:gap-[3%]">
          {/* ================= LEFT SIDEBAR ================= */}

          <aside className="w-full lg:w-[25%] flex-shrink-0">
            <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
              <button
                onClick={() => setActiveSection("dashboard")}
                className={`w-full text-left px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 rounded-sm cursor-pointer text-sm sm:text-base ${
                  activeSection === "dashboard"
                    ? "text-white bg-[#C09578]"
                    : "hover:bg-[#C09578] bg-black text-white"
                }`}
              >
                My Dashboard
              </button>

              <button
                onClick={() => setActiveSection("orders")}
                className={`w-full text-left px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 rounded-sm cursor-pointer text-sm sm:text-base ${
                  activeSection === "orders"
                    ? "text-white bg-[#C09578]"
                    : "hover:bg-[#C09578] bg-black text-white"
                }`}
              >
                Orders
              </button>

              <button
                onClick={() => setActiveSection("addresses")}
                className={`w-full text-left px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 rounded-sm cursor-pointer text-sm sm:text-base ${
                  activeSection === "addresses"
                    ? "text-white bg-[#C09578]"
                    : "hover:bg-[#C09578] bg-black text-white"
                }`}
              >
                Address
              </button>

              <button
                onClick={() => setActiveSection("profile")}
                className={`w-full text-left px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 rounded-sm cursor-pointer text-sm sm:text-base ${
                  activeSection === "profile"
                    ? "text-white bg-[#C09578]"
                    : "hover:bg-[#C09578] bg-black text-white"
                }`}
              >
                Profile
              </button>

              <button
                onClick={() => setActiveSection("password")}
                className={`w-full text-left px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 rounded-sm cursor-pointer text-sm sm:text-base ${
                  activeSection === "password"
                    ? "text-white bg-[#C09578]"
                    : "hover:bg-[#C09578] bg-black text-white"
                }`}
              >
                Change Password
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 rounded-sm cursor-pointer text-white bg-black hover:bg-[#C09578] text-sm sm:text-base"
              >
                Logout
              </button>
            </nav>
          </aside>

          {/* ================= RIGHT CONTENT ================= */}

          <main className="flex-1 min-w-0 p-0 sm:p-2">
            {/* ================= DASHBOARD ================= */}

            {activeSection === "dashboard" && (
              <div>
                <h1 className="text-[20px] font-semibold mb-5 sm:mb-6">
                  My Dashboard
                </h1>

                {dashboardLoading ? (
                  <p>Loading dashboard...</p>
                ) : (
                  <>
                    {/* DASHBOARD CARDS */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                      <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg">
                        <h3 className="text-gray-500 mb-2 text-sm sm:text-base">
                          Total Orders
                        </h3>

                        <p className="text-2xl sm:text-3xl font-bold">
                          {dashboardData.totalOrders}
                        </p>
                      </div>

                      <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg">
                        <h3 className="text-gray-500 mb-2 text-sm sm:text-base">
                          Pending Orders
                        </h3>

                        <p className="text-2xl sm:text-3xl font-bold">
                          {dashboardData.pendingOrders}
                        </p>
                      </div>

                      <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg">
                        <h3 className="text-gray-500 mb-2 text-sm sm:text-base">
                          Completed Orders
                        </h3>

                        <p className="text-2xl sm:text-3xl font-bold">
                          {dashboardData.completedOrders}
                        </p>
                      </div>

                      <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg">
                        <h3 className="text-gray-500 mb-2 text-sm sm:text-base">
                          Total Spent
                        </h3>

                        <p className="text-2xl sm:text-3xl font-bold">
                          ₹{dashboardData.totalSpent}
                        </p>
                      </div>
                    </div>

                    {/* RECENT ORDERS */}

                    <div className="mt-6 sm:mt-8">
                      <h2 className="text-[20px] font-semibold mb-4">
                        Recent Orders
                      </h2>

                      {dashboardData.recentOrders.length === 0 ? (
                        <div className="border border-[#ccc] rounded-sm p-5 sm:p-6 text-center">
                          <p className="text-gray-500">No orders found.</p>
                        </div>
                      ) : (
                        <div className="rounded-lg overflow-x-auto">
                          <table className="w-full min-w-[650px] box-border">
                            <thead>
                              <tr className="border-b bg-[#F2F2F2]">
                                <th className="text-center py-3 px-2 font-normal border-l border-[#ccc]">
                                  Order ID
                                </th>

                                <th className="text-center py-3 px-2 font-normal">
                                  Date
                                </th>

                                <th className="text-center py-3 px-2 font-normal">
                                  Amount
                                </th>

                                <th className="text-center py-3 px-2 font-normal">
                                  Payment
                                </th>

                                <th className="text-center py-3 px-2 font-normal border-r border-[#ccc]">
                                  Status
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {dashboardData.recentOrders.map((order) => (
                                <tr
                                  key={order._id}
                                  className="border-b border-[#ccc]"
                                >
                                  <td className="text-center py-3 px-2 border-l border-r border-[#ccc]">
                                    {order.order_number}
                                  </td>

                                  <td className="text-center py-3 px-2 border-r border-[#ccc]">
                                    {formatDate(order.created_at)}
                                  </td>

                                  <td className="text-center py-3 px-2 border-r border-[#ccc]">
                                    ₹{order.net_amount}
                                  </td>

                                  <td className="text-center py-3 px-2 border-r border-[#ccc]">
                                    {order.payment_status === 2
                                      ? "Paid"
                                      : order.payment_status === 3
                                        ? "Failed"
                                        : "Pending"}
                                  </td>

                                  <td className="text-center py-3 px-2 border-r border-[#ccc]">
                                    {getOrderStatus(order.order_status)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ================= ORDERS ================= */}

            {activeSection === "orders" && (
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold mb-5 sm:mb-6">
                  Orders
                </h1>

                <div className="rounded-lg overflow-x-auto">
                  <table className="w-full min-w-[600px] box-border">
                    <thead>
                      <tr className="border-b bg-[#F2F2F2]">
                        <th className="text-center py-3 px-2 font-normal border-l border-[#ccc]">
                          Order ID
                        </th>

                        <th className="text-center py-3 px-2 font-normal">
                          Date
                        </th>

                        <th className="text-center py-3 px-2 font-normal">
                          Amount
                        </th>

                        <th className="text-center py-3 px-2 font-normal">
                          Status
                        </th>

                        <th className="text-center py-3 px-2 font-normal border-r border-[#ccc]">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {dashboardData.recentOrders.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center py-6 text-gray-500"
                          >
                            No orders found.
                          </td>
                        </tr>
                      ) : (
                        dashboardData.recentOrders.map((order) => (
                          <tr
                            key={order._id}
                            className="border-b border-[#ccc]"
                          >
                            <td className="text-center py-3 px-2 border-l border-r border-[#ccc]">
                              {order.order_number}
                            </td>

                            <td className="text-center py-3 px-2 border-r border-[#ccc]">
                              {formatDate(order.created_at)}
                            </td>

                            <td className="text-center py-3 px-2 border-r border-[#ccc]">
                              ₹{order.net_amount}
                            </td>

                            <td className="text-center py-3 px-2 border-r border-[#ccc]">
                              {getOrderStatus(order.order_status)}
                            </td>

                            <td className="text-[#C09578] border-r border-[#ccc] py-3 px-2 text-center">
                              <Link
                                href={`/myOrders/${order._id}`}
                                className="cursor-pointer hover:underline"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ================= ADDRESS ================= */}

            {activeSection === "addresses" && (
              <div>
                <h1 className="text-sm sm:text-base font-normal mb-5 sm:mb-6 leading-6">
                  The following addresses will be used on the checkout page by
                  default.
                </h1>

                <div className="flex flex-col md:flex-row gap-6 md:gap-[3%]">
                  {/* ================= BILLING ADDRESS ================= */}

                  <form
                    onSubmit={(e) => handleAddressSubmit(e, "billing")}
                    className="w-full md:w-[48%]"
                  >
                    <h2 className="font-normal text-[18px] sm:text-[20px]">
                      Billing Address
                    </h2>

                    <div className="border rounded-sm border-[#ccc] mt-2">
                      <div className="px-4 sm:px-5 mt-5">
                        <label
                          htmlFor="billingName"
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Billing Name*
                        </label>

                        <input
                          id="billingName"
                          type="text"
                          value={addressData.billing.name}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              billing: {
                                ...addressData.billing,
                                name: e.target.value,
                              },
                            })
                          }
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                          required
                        />
                      </div>

                      <div className="px-4 sm:px-5 mt-5">
                        <label
                          htmlFor="billingEmail"
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Billing Email*
                        </label>

                        <input
                          id="billingEmail"
                          type="email"
                          value={addressData.billing.email}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              billing: {
                                ...addressData.billing,
                                email: e.target.value,
                              },
                            })
                          }
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                          required
                        />
                      </div>

                      <div className="px-4 sm:px-5 mt-5">
                        <label
                          htmlFor="billingMobile"
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Billing Mobile Number*
                        </label>

                        <input
                          id="billingMobile"
                          type="tel"
                          value={addressData.billing.mobile_number}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              billing: {
                                ...addressData.billing,
                                mobile_number: e.target.value,
                              },
                            })
                          }
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                          required
                        />
                      </div>

                      <div className="px-4 sm:px-5 mt-5">
                        <label
                          htmlFor="billingAddress"
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Billing Address*
                        </label>

                        <input
                          id="billingAddress"
                          type="text"
                          value={addressData.billing.address}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              billing: {
                                ...addressData.billing,
                                address: e.target.value,
                              },
                            })
                          }
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                          required
                        />
                      </div>

                      <div className="px-4 sm:px-5 mt-5">
                        <label
                          htmlFor="billingCountry"
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Country*
                        </label>

                        <select
                          value={addressData.billing.country}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              billing: {
                                ...addressData.billing,
                                country: e.target.value,
                              },
                            })
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                          <option value="">Select Country</option>

                          {countries.map((country) => (
                            <option
                              key={country._id}
                              value={country.countryName}
                            >
                              {country.countryName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="px-4 sm:px-5 mt-5">
                        <label
                          htmlFor="billingState"
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          State*
                        </label>

                        <input
                          id="billingState"
                          type="text"
                          value={addressData.billing.state}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              billing: {
                                ...addressData.billing,
                                state: e.target.value,
                              },
                            })
                          }
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                          required
                        />
                      </div>

                      <div className="px-4 sm:px-5 mt-5">
                        <label
                          htmlFor="billingCity"
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          City*
                        </label>

                        <input
                          id="billingCity"
                          type="text"
                          value={addressData.billing.city}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              billing: {
                                ...addressData.billing,
                                city: e.target.value,
                              },
                            })
                          }
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                          required
                        />
                      </div>

                      <div className="px-4 sm:px-5 mt-5 flex justify-end">
                        <button
                          type="submit"
                          className="border border-[#ccc] rounded-lg py-1.5 px-5 text-white bg-[#C09578] hover:bg-black cursor-pointer mb-5"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* ================= SHIPPING ADDRESS ================= */}

                  <div className="w-full md:w-[48%]">
                    <h2 className="font-normal text-[18px] sm:text-[20px]">
                      Shipping Address
                    </h2>

                    <form
                      onSubmit={(e) => handleAddressSubmit(e, "shipping")}
                      className="border rounded-sm border-[#ccc] mt-2"
                    >
                      <div className="px-4 sm:px-5 mt-5">
                        <label
                          htmlFor="shippingName"
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Shipping Name*
                        </label>

                        <input
                          id="shippingName"
                          type="text"
                          value={addressData.shipping.name}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              shipping: {
                                ...addressData.shipping,
                                name: e.target.value,
                              },
                            })
                          }
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                          required
                        />
                      </div>

                      <div className="px-4 sm:px-5 mt-5">
                        <label
                          htmlFor="shippingEmail"
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Shipping Email*
                        </label>

                        <input
                          id="shippingEmail"
                          type="email"
                          value={addressData.shipping.email}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              shipping: {
                                ...addressData.shipping,
                                email: e.target.value,
                              },
                            })
                          }
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                          required
                        />
                      </div>

                      <div className="px-4 sm:px-5 mt-5">
                        <label
                          htmlFor="shippingMobile"
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Shipping Mobile Number*
                        </label>

                        <input
                          id="shippingMobile"
                          type="tel"
                          value={addressData.shipping.mobile_number}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              shipping: {
                                ...addressData.shipping,
                                mobile_number: e.target.value,
                              },
                            })
                          }
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                          required
                        />
                      </div>

                      <div className="px-4 sm:px-5 mt-5">
                        <label
                          htmlFor="shippingAddress"
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Shipping Address*
                        </label>

                        <input
                          id="shippingAddress"
                          type="text"
                          value={addressData.shipping.address}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              shipping: {
                                ...addressData.shipping,
                                address: e.target.value,
                              },
                            })
                          }
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                          required
                        />
                      </div>

                      <div className="px-4 sm:px-5 mt-5">
                        <label
                          htmlFor="shippingCountry"
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Country*
                        </label>

                        <select
                          value={addressData.shipping.country}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              shipping: {
                                ...addressData.shipping,
                                country: e.target.value,
                              },
                            })
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                          <option value="">Select Country</option>

                          {countries.map((country) => (
                            <option
                              key={country._id}
                              value={country.countryName}
                            >
                              {country.countryName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="px-4 sm:px-5 mt-5">
                        <label
                          htmlFor="shippingState"
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          State*
                        </label>

                        <input
                          id="shippingState"
                          type="text"
                          value={addressData.shipping.state}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              shipping: {
                                ...addressData.shipping,
                                state: e.target.value,
                              },
                            })
                          }
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                          required
                        />
                      </div>

                      <div className="px-4 sm:px-5 mt-5">
                        <label
                          htmlFor="shippingCity"
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          City*
                        </label>

                        <input
                          id="shippingCity"
                          type="text"
                          value={addressData.shipping.city}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              shipping: {
                                ...addressData.shipping,
                                city: e.target.value,
                              },
                            })
                          }
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                          required
                        />
                      </div>

                      <div className="px-4 sm:px-5 mt-5 flex justify-end">
                        <button
                          type="submit"
                          className="border border-[#ccc] rounded-lg py-1.5 px-5 text-white bg-[#C09578] hover:bg-black cursor-pointer mb-5"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* ================= PROFILE ================= */}

            {activeSection === "profile" && (
              <div>
                <h1 className="text-[20px] font-semibold mb-6">Profile</h1>

                <form
                  onSubmit={handleUpdateProfile}
                  className="border rounded-sm border-[#ccc] mt-2"
                >
                  {/* Gender */}

                  <div className="px-4 sm:px-5 mt-5 flex flex-wrap">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="1"
                        checked={selectedTitle === "1"}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                      />

                      <label htmlFor="male" className="ml-2">
                        Male
                      </label>
                    </div>

                    <div className="flex items-center ml-4">
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="2"
                        checked={selectedTitle === "2"}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                      />

                      <label htmlFor="female" className="ml-2">
                        Female
                      </label>
                    </div>
                  </div>

                  {/* Name */}

                  <div className="px-4 sm:px-5 mt-5">
                    <label
                      htmlFor="name"
                      className="hover:text-[#C09578] cursor-pointer"
                    >
                      Name*
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      defaultValue={userProfile?.name || ""}
                      className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                    />
                  </div>

                  {/* Email */}

                  <div className="px-4 sm:px-5 mt-5">
                    <label
                      htmlFor="email"
                      className="hover:text-[#C09578] cursor-pointer"
                    >
                      Email*
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      defaultValue={userProfile?.email || ""}
                      readOnly
                      className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                    />
                  </div>

                  {/* Mobile */}

                  <div className="px-4 sm:px-5 mt-5">
                    <label
                      htmlFor="mobile_number"
                      className="hover:text-[#C09578] cursor-pointer"
                    >
                      Mobile Number*
                    </label>

                    <input
                      id="mobile_number"
                      type="text"
                      name="mobile_number"
                      defaultValue={userProfile?.mobile_number || ""}
                      className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                    />
                  </div>

                  {/* Address */}

                  <div className="px-4 sm:px-5 mt-5">
                    <label
                      htmlFor="address"
                      className="hover:text-[#C09578] cursor-pointer"
                    >
                      Address*
                    </label>

                    <input
                      id="address"
                      type="text"
                      name="address"
                      defaultValue={userProfile?.address || ""}
                      className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                    />
                  </div>

                  {/* Button */}

                  <div className="px-4 sm:px-5 mt-5 flex justify-end">
                    <button
                      type="submit"
                      className="border border-[#ccc] rounded-lg py-1.5 px-5 text-white bg-[#C09578] hover:bg-black cursor-pointer mb-5"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ================= CHANGE PASSWORD ================= */}

            {activeSection === "password" && (
              <div>
                <h1 className="text-[20px] font-semibold mb-6">
                  Change Password
                </h1>

                <form
                  onSubmit={handleChangePassword}
                  className="border rounded-sm border-[#ccc] mt-2"
                >
                  {/* Current Password */}

                  <div className="px-4 sm:px-5 mt-5">
                    <label
                      htmlFor="oldPassword"
                      className="hover:text-[#C09578] cursor-pointer"
                    >
                      Current Password
                    </label>

                    <input
                      id="oldPassword"
                      type="password"
                      name="oldPassword"
                      className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                    />
                  </div>

                  {/* New Password */}

                  <div className="px-4 sm:px-5 mt-5">
                    <label
                      htmlFor="newPassword"
                      className="hover:text-[#C09578] cursor-pointer"
                    >
                      New Password
                    </label>

                    <input
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                    />
                  </div>

                  {/* Confirm Password */}

                  <div className="px-4 sm:px-5 mt-5">
                    <label
                      htmlFor="confirmPassword"
                      className="hover:text-[#C09578] cursor-pointer"
                    >
                      Confirm Password
                    </label>

                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                    />
                  </div>

                  <div className="px-4 sm:px-5 mt-5 flex justify-end">
                    <button
                      type="submit"
                      className="border border-[#ccc] rounded-lg py-1.5 px-5 text-white bg-[#C09578] hover:bg-black cursor-pointer mb-5"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
