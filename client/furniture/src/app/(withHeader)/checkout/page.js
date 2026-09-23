
"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { toast } from "react-toastify";
import axios from "axios";

const CheckoutPage = () => {
  const [differentAddress, setDifferentAddress] = useState(false);

  const [countries, setCountries] = useState([]);

  const { error, isLoading, Razorpay } = useRazorpay();

  let APIBASEURL = process.env.NEXT_PUBLIC_APIBASEPATH;

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

  const cart = useSelector((state) => state.cartStore?.cart || []);

  console.log("CHECKOUT CART:", cart);
  console.log(
    "CHECKOUT CART IDS:",
    cart.map((item) => item.id),
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.productPrice || 0) * Number(item.qty || 1),
    0,
  );

  const discount = 0;

  const orderTotal = subtotal - discount;

  let placeOrder = (event) => {
    event.preventDefault();

    const dataSave = {
      total_amount: subtotal,
      discount_amount: discount,
      net_amount: orderTotal,

      product_info: cart,

      shipping_address: {
        name: event.target.billing_name.value,
        email: event.target.billing_email.value,
        mobile_number: event.target.billing_mobile.value,
        address: event.target.billing_address.value,
        country: event.target.billing_country.value,
        state: event.target.billing_state.value,
        city: event.target.billing_city.value,
      },

      billing_address: {
        name: event.target.billing_name.value,
        email: event.target.billing_email.value,
        mobile_number: event.target.billing_mobile.value,
        address: event.target.billing_address.value,
        country: event.target.billing_country.value,
        state: event.target.billing_state.value,
        city: event.target.billing_city.value,
      },

      mobile_number: event.target.mobile_number.value,
      name: event.target.name.value,
    };

    axios
      .post(`${APIBASEURL}user/orderPlaced`, dataSave, {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_login")}`,
        },
      })
      .then((res) => {
        console.log("ORDER API RESPONSE:", res.data);

        if (res.data._status) {
          handlePayment(res.data._data);
        } else {
          console.log("ORDER API ERROR:", res.data);

          if (res.data.errors?.length > 0) {
            res.data.errors.forEach((error) => {
              console.log("ERROR DETAIL:", error);
            });
          }

          toast.error(res.data._message);
        }
      })
      .catch((error) => {
        console.log("API ERROR:", error);
      });
  };

  const handlePayment = (orderInfo) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderInfo.net_amount * 100,
      currency: "INR",
      name: "Furniture",
      description: "Test Transaction",
      order_id: orderInfo.order_id,
      handler: (response) => {
        console.log("PAYMENT SUCCESS:", response);

        orderStatusChange(
          response.razorpay_payment_id,
          response.razorpay_order_id,
        );
      },
      prefill: {
        name: "Prathamesh ",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);

    razorpayInstance.on("payment.failed", function (response) {
      console.log(response);
      orderStatusChange(
        response.error.metadata.payment_id,
        response.error.metadata.order_id,
      );
    });

    razorpayInstance.open();
  };

  const orderStatusChange = (payment_id, order_id) => {
    const dataSave = {
      payment_id: payment_id,
      order_id: order_id,
    };

    axios
      .put(`${APIBASEURL}user/orderChanged`, dataSave, {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_login")}`,
        },
      })
      .then((result) => {
        if (result.data._data.payment_status == 2) {
          toast.success("order placed");
        } else {
          toast.error("Payment Failed !!");
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="w-full py-5 sm:py-7 md:py-10">
      <div className="max-w-[1320px] mx-auto px-3 sm:px-5 md:px-6 lg:px-8">
        <form
          onSubmit={placeOrder}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,50%)_minmax(0,40%)] gap-6 md:gap-8 lg:gap-[2%]"
        >
          {/* ================= LEFT : BILLING DETAILS ================= */}
          <div className="w-full min-w-0">
            {/* Heading */}
            <div className="bg-[#222] text-white px-3 sm:px-4 py-2.5 sm:py-3 mb-5 rounded-sm">
              <h2 className="text-[12px] sm:text-[13px] font-bold">
                BILLING DETAILS
              </h2>
            </div>

            {/* Billing Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-5">
              {/* Name */}
              <div className="w-full">
                <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full h-[40px] sm:h-[38px] border rounded-sm border-[#ddd] px-3 text-[12px] outline-none"
                />
              </div>

              {/* Mobile */}
              <div className="w-full">
                <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                  Mobile Number*
                </label>
                <input
                  type="number"
                  name="mobile_number"
                  className="w-full h-[40px] sm:h-[38px] rounded-sm border border-[#ddd] px-3 text-[12px] outline-none"
                />
              </div>

              {/* Billing Name */}
              <div className="w-full">
                <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                  Billing Name*
                </label>
                <input
                  type="text"
                  name="billing_name"
                  className="w-full h-[40px] sm:h-[38px] rounded-sm border border-[#ddd] px-3 text-[12px] outline-none"
                />
              </div>

              {/* Billing Email */}
              <div className="w-full">
                <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                  Billing Email*
                </label>
                <input
                  type="email"
                  name="billing_email"
                  className="w-full h-[40px] sm:h-[38px] rounded-sm border border-[#ddd] px-3 text-[12px] outline-none"
                />
              </div>

              {/* Billing Mobile */}
              <div className="md:col-span-2 w-full">
                <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                  Billing Mobile Number*
                </label>
                <input
                  type="number"
                  name="billing_mobile"
                  className="w-full h-[40px] sm:h-[38px] rounded-sm border border-[#ddd] px-3 text-[12px] outline-none"
                />
              </div>

              {/* Billing Address */}
              <div className="md:col-span-2 w-full">
                <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                  Billing Address*
                </label>
                <input
                  type="text"
                  name="billing_address"
                  className="w-full h-[40px] sm:h-[38px] rounded-sm border border-[#ddd] px-3 text-[12px] outline-none"
                />
              </div>

              {/* Country */}
              <div className="md:col-span-2 w-full">
                <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                  Country*
                </label>

                <select
                  name="billing_country"
                  className="w-full h-[40px] sm:h-[38px] border rounded-sm border-[#ddd] px-3 text-[12px] text-gray-600 outline-none"
                >
                  <option value="">Select Country</option>

                  {countries.map((country) => (
                    <option key={country._id} value={country.countryName}>
                      {country.countryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div className="w-full">
                <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                  State*
                </label>

                <input
                  type="text"
                  name="billing_state"
                  className="w-full h-[40px] sm:h-[38px] rounded-sm border border-[#ddd] px-3 text-[12px] outline-none"
                />
              </div>

              {/* City */}
              <div className="w-full">
                <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                  City*
                </label>

                <input
                  type="text"
                  name="billing_city"
                  className="w-full h-[40px] sm:h-[38px] rounded-sm border border-[#ddd] px-3 text-[12px] outline-none"
                />
              </div>

              {/* Order Notes */}
              <div className="md:col-span-2 w-full">
                <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                  Order Notes
                </label>

                <textarea
                  rows="5"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="w-full min-h-[110px] border rounded-sm border-[#ddd] px-3 py-2 text-[12px] outline-none resize-none"
                ></textarea>
              </div>
            </div>

            {/* ================= SHIPPING ================= */}
            <div className="mt-6 sm:mt-7">
              {/* Checkbox */}
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <input
                  type="checkbox"
                  id="differentAddress"
                  checked={differentAddress}
                  onChange={(e) => setDifferentAddress(e.target.checked)}
                  className="w-[13px] h-[13px] shrink-0"
                />

                <label
                  htmlFor="differentAddress"
                  className="bg-[#222] rounded-sm text-white px-3 py-2 text-[10px] sm:text-[11px] font-bold cursor-pointer"
                >
                  Ship To A Different Address?
                </label>
              </div>

              {/* Shipping Details */}
              {differentAddress && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-5">
                  {/* Shipping Name */}
                  <div className="w-full">
                    <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                      Shipping Name*
                    </label>

                    <input
                      type="text"
                      className="w-full h-[40px] sm:h-[38px] rounded-sm border border-[#ddd] px-3 text-[12px] outline-none"
                    />
                  </div>

                  {/* Shipping Email */}
                  <div className="w-full">
                    <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                      Shipping Email*
                    </label>

                    <input
                      type="email"
                      className="w-full h-[40px] sm:h-[38px] border rounded-sm border-[#ddd] px-3 text-[12px] outline-none"
                    />
                  </div>

                  {/* Shipping Mobile */}
                  <div className="md:col-span-2 w-full">
                    <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                      Shipping Mobile Number*
                    </label>

                    <input
                      type="number"
                      className="w-full h-[40px] sm:h-[38px] rounded-sm border border-[#ddd] px-3 text-[12px] outline-none"
                    />
                  </div>

                  {/* Shipping Address */}
                  <div className="md:col-span-2 w-full">
                    <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                      Shipping Address*
                    </label>

                    <input
                      type="text"
                      className="w-full h-[40px] sm:h-[38px] rounded-sm border border-[#ddd] px-3 text-[12px] outline-none"
                    />
                  </div>

                  {/* Shipping Country */}
                  <div className="md:col-span-2 w-full">
                    <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                      Country*
                    </label>

                    <select
                      name="shipping_country"
                      className="w-full h-[40px] sm:h-[38px] rounded-sm border border-[#ddd] px-3 text-[12px] text-gray-600 outline-none"
                    >
                      <option value="">Select Country</option>

                      {countries.map((country) => (
                        <option key={country._id} value={country.countryName}>
                          {country.countryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Shipping State */}
                  <div className="w-full">
                    <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                      State*
                    </label>

                    <input
                      type="text"
                      className="w-full h-[40px] sm:h-[38px] rounded-sm border border-[#ddd] px-3 text-[12px] outline-none"
                    />
                  </div>

                  {/* Shipping City */}
                  <div className="w-full">
                    <label className="block text-[11px] sm:text-[12px] font-semibold mb-2">
                      City*
                    </label>

                    <input
                      type="text"
                      className="w-full h-[40px] sm:h-[38px] rounded-sm border border-[#ddd] px-3 text-[12px] outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT : YOUR ORDER ================= */}
          <div className="w-full min-w-0 lg:sticky lg:top-5 lg:self-start">
            {/* ================= YOUR ORDER ================= */}
            <div className="bg-[#222] text-white px-3 sm:px-4 md:px-5 py-3 mb-5 rounded-sm">
              <h2 className="text-[12px] sm:text-[13px] font-bold tracking-wide">
                YOUR ORDER
              </h2>
            </div>

            <div className="border border-[#ddd] bg-white w-full overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[minmax(0,1fr)_85px] xs:grid-cols-[minmax(0,1fr)_90px] sm:grid-cols-[1fr_110px] bg-[#f7f7f7] border-b border-[#ddd]">
                <div className="px-3 sm:px-4 py-3 sm:py-4 text-left font-bold text-[11px] sm:text-[13px]">
                  Product
                </div>

                <div className="px-2 sm:px-4 py-3 sm:py-4 text-right font-bold text-[11px] sm:text-[13px]">
                  Total
                </div>
              </div>

              {/* Products */}
              <div>
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[minmax(0,1fr)_85px] sm:grid-cols-[1fr_110px] border-b border-[#eee]"
                    >
                      <div className="px-3 sm:px-4 py-3 sm:py-4 min-w-0">
                        <p className="text-[11px] sm:text-[13px] font-medium text-[#333] leading-5 break-words">
                          {item.productName}
                        </p>

                        <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">
                          Quantity: {item.qty}
                        </p>
                      </div>

                      <div className="px-2 sm:px-4 py-3 sm:py-4 text-right text-[11px] sm:text-[13px] font-medium text-[#333] whitespace-nowrap">
                        Rs.{" "}
                        {Number(item.productPrice || 0) * Number(item.qty || 1)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 sm:px-5 py-8 text-center">
                    <p className="text-[12px] sm:text-[13px] text-gray-500">
                      Your cart is empty
                    </p>
                  </div>
                )}
              </div>

              {/* Subtotal */}
              <div className="grid grid-cols-[minmax(0,1fr)_85px] sm:grid-cols-[1fr_110px] border-b border-[#eee]">
                <div className="px-3 sm:px-4 py-3 sm:py-4 text-[11px] sm:text-[13px] font-semibold text-[#333]">
                  Cart Subtotal
                </div>

                <div className="px-2 sm:px-4 py-3 sm:py-4 text-right text-[11px] sm:text-[13px] text-[#333] whitespace-nowrap">
                  Rs. {subtotal}
                </div>
              </div>

              {/* Discount */}
              <div className="grid grid-cols-[minmax(0,1fr)_85px] sm:grid-cols-[1fr_110px] border-b border-[#eee]">
                <div className="px-3 sm:px-4 py-3 sm:py-4 text-[11px] sm:text-[13px] font-semibold text-[#333]">
                  Discount (-)
                </div>

                <div className="px-2 sm:px-4 py-3 sm:py-4 text-right text-[11px] sm:text-[13px] text-[#333] whitespace-nowrap">
                  Rs. {discount}
                </div>
              </div>

              {/* Order Total */}
              <div className="grid grid-cols-[minmax(0,1fr)_85px] sm:grid-cols-[1fr_110px] bg-[#f7f7f7]">
                <div className="px-3 sm:px-4 py-4 sm:py-5 text-[12px] sm:text-[14px] font-bold text-[#222]">
                  Order Total
                </div>

                <div className="px-2 sm:px-4 py-4 sm:py-5 text-right text-[13px] sm:text-[15px] font-bold text-[#c99a7b] whitespace-nowrap">
                  Rs. {orderTotal}
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={cart.length === 0}
              className="mt-5 sm:mt-6 w-full bg-[#c99a7b] hover:bg-[#b98769] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-[11px] sm:text-[13px] px-4 sm:px-5 py-3 sm:py-3.5 rounded-[3px] transition"
            >
              PLACED ORDER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

