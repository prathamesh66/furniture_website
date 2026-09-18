"use client"

import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";

import { deleteCart, changeQty } from "../redux/cartSlice";
import Link from 'next/link';
import { FiShoppingCart } from "react-icons/fi";


const page = () => {

const dispatch = useDispatch();

const BASE_URL = "http://localhost:8000/";

const CART = useSelector((state) => state.cartStore?.cart || []);

console.log("CART:", CART);

const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

const subtotal = CART.reduce(
  (total, item) => total + item.productPrice * item.qty,
  0,
);



  return (
    <section className="w-full py-2">
      <div>
        <Breadcrumb title={"Shopping Cart"} />
      </div>

      <div className="max-w-[1320px] mx-auto my-2 ">
        <hr className="text-[#ccc]" />

        <div className="mt-10">
          {!mounted ? (
            // First render: keep server and client HTML the same
            <div className="min-h-[400px]"></div>
          ) : CART.length === 0 ? (
            // Empty Cart
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center border border-[#e5e5e5] rounded-lg bg-[#fafafa] px-5">
              {/* Cart Icon */}
              <div className="w-[80px] h-[80px] rounded-full bg-[#f3e4dc] flex items-center justify-center mb-5">
                <FiShoppingCart size={38} className="text-[#c98d6d]" />
              </div>

              {/* Heading */}
              <h2 className="text-[28px] font-semibold text-gray-800">
                Your Cart Is Empty
              </h2>

              {/* Description */}
              <p className="text-gray-500 mt-3 max-w-[500px] leading-6">
                Looks like you haven't added anything to your cart yet. Explore
                our collection and find something you love.
              </p>

              {/* Continue Shopping Button */}
              <Link
                href="/"
                className="mt-7 inline-flex items-center justify-center bg-[#c98d6d] hover:bg-[#b77c5d] text-white px-7 py-3 rounded-md font-semibold transition duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            // Cart Table
            <table className="w-full">
              <thead>
                <tr className="text-center bg-[#F2F2F2] border-b-3 border-[#c98d6d]">
                  <th className="py-3 px-10">Delete</th>
                  <th className="py-3 px-10">Image</th>
                  <th className="py-3 px-10">Product</th>
                  <th className="py-3 px-10">Price</th>
                  <th className="py-3 px-10">Quantity</th>
                  <th className="py-3 px-10">Total</th>
                </tr>
              </thead>

              <tbody className="border border-[#ccc]">
                {CART.map((item) => (
                  <tr key={item.id}>
                    {/* Delete */}
                    <td className="py-2 border border-[#ccc]">
                      <p className="flex text-center">
                        <RiDeleteBin6Line
                          size={22}
                          onClick={() => dispatch(deleteCart(item.id))}
                          className="cursor-pointer text-orange-400 hover:text-red-600 transition mx-auto"
                        />
                      </p>
                    </td>

                    {/* Product Image */}
                    <td className="py-2 text-center border border-[#ccc]">
                      <img
                        src={`http://localhost:8000/uploads/product/${encodeURIComponent(
                          item.productImage,
                        )}`}
                        alt={item.productName}
                        width={232}
                        height={145}
                        className="mx-auto"
                      />
                    </td>

                    {/* Product Name */}
                    <td className="py-2 text-center border border-[#ccc]">
                      {item.productName}
                    </td>

                    {/* Product Price */}
                    <td className="py-2 text-center border border-[#ccc]">
                      Rs. {mounted ? item.productPrice : 0}
                    </td>

                    {/* Quantity */}
                    <td className="py-2 text-center border border-[#ccc]">
                      <div className="flex justify-center items-center gap-2">
                        {/* Minus */}
                        <button
                          onClick={() =>
                            dispatch(
                              changeQty({
                                id: item.id,
                                type: "minus",
                              }),
                            )
                          }
                          className="w-[30px] h-[30px] border border-[#ccc] hover:bg-gray-100"
                        >
                          -
                        </button>

                        {/* Quantity */}
                        <input
                          type="number"
                          value={item.qty}
                          readOnly
                          className="border border-[#ccc] w-[50px] h-[30px] text-center"
                        />

                        {/* Plus */}
                        <button
                          onClick={() =>
                            dispatch(
                              changeQty({
                                id: item.id,
                                type: "plus",
                              }),
                            )
                          }
                          className="w-[30px] h-[30px] border border-[#ccc] hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Product Total */}
                    <td className="py-2 text-center border border-[#ccc]">
                      Rs. {mounted ? item.productPrice * item.qty : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-20 grid grid-cols-2 gap-5">
          <div className="border border-[#ccc]">
            <div className="bg-black text-white p-3 font-semibold text-[18px]">
              COUPON
            </div>

            <div className="p-4">
              <p>Enter your coupon code if you have one.</p>

              <div className="flex gap-5 mt-5">
                <input
                  type="text"
                  className="py-2 px-3 border border-[#ccc] rounded-lg"
                  placeholder="Coupon Code"
                />

                <button className="py-2 px-3 rounded-lg text-white bg-black">
                  APPLY COUPON
                </button>
              </div>
            </div>
          </div>

          <div className="border border-[#ccc]">
            <div className="bg-black text-white p-3 font-semibold text-[18px]">
              Cart Totals
            </div>

            <div className="p-4">
              <div className="flex justify-between">
                <p className="font-semibold ">Subtotal</p>
                <p className="font-semibold"> Rs. {mounted ? subtotal : 0}</p>
              </div>

              <div className="flex justify-between mt-6">
                <p className="font-semibold ">Discount (-)</p>
                <p className="font-semibold ">Rs. 0</p>
              </div>

              <div className="flex justify-between mt-6">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">Rs. {mounted ? subtotal : 0}</p>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="border py-2 px-4 text-white bg-[#c98d6d] rounded-lg">
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page
