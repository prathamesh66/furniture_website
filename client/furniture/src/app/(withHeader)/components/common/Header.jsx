"use client"

import React from 'react'
import { Rubik } from "next/font/google";
import Image from 'next/image';
import { MdSearch } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";

const rubik = Rubik({
  subsets: ["latin"],
});




const Header = () => {

const userLogin = useSelector((data) => {
  return data.login.userLogin;
});


const cart = useSelector((state) => state.cartStore?.cart || []);

const cartCount = cart.reduce((total, item) => total + item.qty, 0);

const cartTotal = cart.reduce(
  (total, item) => total + item.productPrice * item.qty,
  0,
);


const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);



  return (
    <section className="w-full">
      {/* first header */}
      <div className="max-w-[1320px] mx-auto flex justify-between py-3">
        <div className={`${rubik.className} text-[14px]`}>
          Contact us 24/7 : +91-98745612330 / furniture@gmail.com
        </div>

        <Link href={"/login-register"}>
          {!mounted ? (
            <div className={`${rubik.className} text-[14px]`}>
              Login / Register
            </div>
          ) : userLogin == 0 ? (
            <div className={`${rubik.className} text-[14px]`}>
              Login / Register
            </div>
          ) : (
            <div className={`${rubik.className} text-[14px]`}>Logout</div>
          )}
        </Link>
      </div>
      <hr className="text-[#ccc]" />

      {/* second header */}

      <div className="max-w-[1320px] mx-auto flex justify-between py-4">
        <div>
          <Image
            src="/images/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
            alt="Sofa"
            width={155}
            height={40}
          />
        </div>

        <div className="flex items-center gap-4 ">
          <div className="flex rounded-sm items-center border-1 border-[#ccc]">
            <input
              type="text"
              placeholder="Search product..."
              className="p-2 "
            />
            <p className="p-2 cursor-pointer hover:text-[#c99471]">
              <MdSearch />
            </p>
          </div>

          <div className=" hover:text-[#c99471] cursor-pointer p-3 rounded-sm border-1 border-[#ccc]">
            <FaHeart />
          </div>

          <Link href={"/cart"}>
            <div className="flex items-center hover:text-[#c99471] rounded-sm p-2 border border-[#ccc] cursor-pointer">
              <div className="w-[40px] h-[20px] bg-[#c99471] text-white rounded-full text-xs flex items-center justify-center">
                {mounted ? cartCount : 0}
              </div>

              <p className="px-2 border-r border-[#ccc]">
                <MdShoppingCart />
              </p>

              <p className="px-4">Rs. {mounted ? cartTotal : 0}</p>
            </div>
          </Link>
        </div>
      </div>
      <hr className="text-[#ccc]" />

      {/* Third Header */}

      <div className="">
        <ul className="flex items-center justify-center">
          <Link href={"/"}>
            <li className="py-5 font-semibold uppercase hover:text-[#c99471] cursor-pointer px-[25px] ">
              Home
            </li>
          </Link>

          <Link href={"/product"}>
            <li className="py-5 font-semibold uppercase hover:text-[#c99471] cursor-pointer px-[25px] ">
              Product
            </li>
          </Link>

          <Link href={"/product-server"}>
            <li className="py-5 font-semibold uppercase hover:text-[#c99471] cursor-pointer px-[25px] ">
              Product Server
            </li>
          </Link>

          <li className="relative flex items-center font-semibold hover:text-[#c99471] cursor-pointer group py-5  px-[25px] ">
            LIVING
            <div
              className="absolute left-0 top-full min-w-[550px] z-20 bg-white shadow-lg origin-top opacity-0 invisible transition-all duration-500 ease-out [transform:perspective(600px)_rotateX(-15deg)_translateY(0px)] group-hover:opacity-100 group-hover:visible group-hover:[transform:perspective(600px)_rotateX(0deg)_translateY(0)]
            "
            >
              <div className=" flex gap-15 py-2 px-5 bg-white">
                <div className="">
                  <h2 className="text-[16px] font-semibold text-black hover:text-[#c99471] py-5">
                    Tables
                  </h2>
                  <ul className="py-2">
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Side and End Tables
                    </li>
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Next of Tables
                    </li>
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Coffee Tables Set
                    </li>
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Coffee Tables
                    </li>
                  </ul>
                </div>

                <div className="">
                  <h2 className="text-[16px] font-semibold text-black hover:text-[#c99471] py-5">
                    Mirrors
                  </h2>
                  <ul className="py-2">
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Wooden Mirrors
                    </li>
                  </ul>
                </div>

                <div className="">
                  <h2 className="text-[16px] font-semibold text-black hover:text-[#c99471] py-5">
                    Living <br />
                    storage/collection
                  </h2>
                  <ul className="py-2">
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Prayer Units
                    </li>
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Display Unit
                    </li>
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Shoe Racks
                    </li>
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Chest Of Drawers
                    </li>
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Cabinets And Sideboard
                    </li>
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      BookShelves
                    </li>
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      TV Units
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mt-[2px]">
              <IoIosArrowDown />
            </p>
          </li>
          <li
            className="hover:text-[#c99471] cursor-pointer 
          relative flex items-center font-semibold hover:text-[#c99471] cursor-pointer group py-5  px-[25px] 
          "
          >
            SOFA
            <div
              className="absolute left-0 top-full min-w-[550px] z-20 bg-white  shadow-lg origin-top opacity-0 invisible transition-all duration-500 ease-out [transform:perspective(600px)_rotateX(-15deg)_translateY(0px)] group-hover:opacity-100 group-hover:visible group-hover:[transform:perspective(600px)_rotateX(0deg)_translateY(0)]
            "
            >
              <div className=" flex gap-15 py-2 px-5 bg-white">
                <div className="">
                  <h2 className="text-[16px] font-semibold text-black hover:text-[#c99471] py-5">
                    SOFA CUM BED
                  </h2>
                  <ul className="py-2">
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Wooden Sofa Cum Bed
                    </li>
                  </ul>
                </div>

                <div className="">
                  <h2 className="text-[16px] font-semibold text-black hover:text-[#c99471] py-5">
                    SOFA SETS
                  </h2>
                  <ul className="py-2">
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Sofa Cover
                    </li>

                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      L Shape Sofa
                    </li>

                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      1 Seater Sofa
                    </li>

                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      2 Seater Sofa
                    </li>

                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      3 Seater Sofa
                    </li>

                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Wooden Sofa Sets
                    </li>

                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Normal
                    </li>
                  </ul>
                </div>

                <div className="">
                  <h2 className="text-[16px] font-semibold text-black hover:text-[#c99471] py-5">
                    SWING JHULA
                  </h2>
                  <ul className="py-2">
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Wooden Jhula
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mt-[2px]">
              <IoIosArrowDown />
            </p>
          </li>
          <li
            className="hover:text-[#c99471] cursor-pointer 
          relative flex items-center font-semibold hover:text-[#c99471] cursor-pointer group py-5  px-[25px] "
          >
            PAGES
            <div
              className="absolute left-0 top-full min-w-[200px] z-20 bg-white  shadow-lg origin-top opacity-0 invisible transition-all duration-500 ease-out [transform:perspective(600px)_rotateX(-15deg)_translateY(0px)] group-hover:opacity-100 group-hover:visible group-hover:[transform:perspective(600px)_rotateX(0deg)_translateY(0)]
            "
            >
              <div className=" flex gap-15 py-2 px-5 bg-white">
                <div className="">
                  <ul className="py-2">
                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      About US
                    </li>

                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Cart
                    </li>

                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Checkout
                    </li>

                    <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                      Frequently Questions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mt-[2px]">
              <IoIosArrowDown />
            </p>
          </li>
          <Link href={"/contact-us"}>
            <li className="py-5 font-semibold uppercase hover:text-[#c99471] cursor-pointer px-[25px] ">
              contact US
            </li>
          </Link>
        </ul>
      </div>
      <hr className="text-[#ccc]" />
    </section>
  );
}

export default Header



