"use client";

import React, { useEffect, useState } from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const Footer = () => {
  const [topRatedProducts, setTopRatedProducts] = useState([]);

  // ==========================================
  // GET TOP RATED PRODUCTS
  // ==========================================

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_APIBASEPATH}product/top-rated`)
      .then((res) => {
        console.log("TOP RATED RESPONSE:", res.data);

        if (res.data._status) {
          const products = res.data._productData || res.data.productData || [];

          setTopRatedProducts(products.slice(0, 2));
        }
      })
      .catch((error) => {
        console.log("TOP RATED ERROR:", error);
      });
  }, []);

  return (
    <>
      <section className="w-full mt-10 sm:mt-[50px] my-[5px]">
        <hr className="text-[#ccc]" />

        <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-4 mt-5">
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-[4fr_2fr_2fr_4fr]
              gap-8
              sm:gap-10
              lg:gap-[50px]
              py-8
              sm:py-10
              md:py-[50px]
            "
          >
            {/* ==========================================
                CONTACT US
            ========================================== */}

            <div>
              <h2 className="text-[22px] sm:text-[25px] font-semibold">
                Contact US
              </h2>

              <p className="mt-5 sm:mt-[30px] text-sm sm:text-base text-[#5A5A5A] leading-6">
                Address: Claritas est etiam processus dynamicus
              </p>

              <p className="mt-1 text-sm sm:text-base text-[#5A5A5A]">
                Phone: 98745612330
              </p>

              <p className="mt-1 text-sm sm:text-base text-[#5A5A5A] break-all">
                Email: furniture@gmail.com
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-[#ccc] text-[#969494] hover:text-[#c99471] hover:border-[#c99471] transition-colors duration-300">
                  <TiSocialFacebook />
                </div>

                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-[#ccc] text-[#969494] hover:text-[#c99471] hover:border-[#c99471] transition-colors duration-300">
                  <FaInstagram />
                </div>

                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-[#ccc] text-[#969494] hover:text-[#c99471] hover:border-[#c99471] transition-colors duration-300">
                  <FaTwitter />
                </div>

                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-[#ccc] text-[#969494] hover:text-[#c99471] hover:border-[#c99471] transition-colors duration-300">
                  <BsYoutube />
                </div>

                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-[#ccc] text-[#969494] hover:text-[#c99471] hover:border-[#c99471] transition-colors duration-300">
                  <FaTelegram />
                </div>
              </div>
            </div>

            {/* ==========================================
                INFORMATION
            ========================================== */}

            <div>
              <h2 className="text-[22px] sm:text-[25px] font-semibold">
                Information
              </h2>

              <p className="mt-5 sm:mt-[30px] text-sm sm:text-base text-[#5A5A5A]">
                <Link
                  href={"/about-us"}
                  className="hover:text-[#c99471] transition-colors"
                >
                  About Us
                </Link>
              </p>

              <p className="mt-2 text-sm sm:text-base text-[#5A5A5A]">
                <Link
                  href={"/contact-us"}
                  className="hover:text-[#c99471] transition-colors"
                >
                  Contact Us
                </Link>
              </p>

              <p className="mt-2 text-sm sm:text-base text-[#5A5A5A]">
                <Link
                  href={"/faq"}
                  className="hover:text-[#c99471] transition-colors"
                >
                  Frequently Questions
                </Link>
              </p>
            </div>

            {/* ==========================================
                MY ACCOUNT
            ========================================== */}

            <div>
              <h2 className="text-[22px] sm:text-[25px] font-semibold">
                My Account
              </h2>

              <p className="mt-5 sm:mt-[30px] text-sm sm:text-base text-[#5A5A5A]">
                <Link
                  href={"/dashboard"}
                  className="hover:text-[#c99471] transition-colors"
                >
                  My Dashboard
                </Link>
              </p>

              <p className="mt-2 text-sm sm:text-base text-[#5A5A5A]">
                <Link
                  href={"/wishlist"}
                  className="hover:text-[#c99471] transition-colors"
                >
                  WishList
                </Link>
              </p>

              <p className="mt-2 text-sm sm:text-base text-[#5A5A5A]">
                <Link
                  href={"/cart"}
                  className="hover:text-[#c99471] transition-colors"
                >
                  Cart
                </Link>
              </p>

              <p className="mt-2 text-sm sm:text-base text-[#5A5A5A]">
                <Link
                  href={"/checkout"}
                  className="hover:text-[#c99471] transition-colors"
                >
                  Checkout
                </Link>
              </p>
            </div>

            {/* ==========================================
                TOP RATED PRODUCTS
            ========================================== */}

            <div>
              <h2 className="text-[22px] sm:text-[25px] font-semibold">
                Top Rated Products
              </h2>

              {topRatedProducts.map((product, index) => (
                <React.Fragment key={product._id}>
                  <Link href={`/productDetails/${product._id}`}>
                    <div className="mt-5 sm:mt-[30px] flex gap-3 sm:gap-4 cursor-pointer">
                      {/* Product Image */}

                      <div className="w-[80px] h-[55px] sm:w-[92px] sm:h-[58px] relative flex-shrink-0">
                        <Image
                          src={
                            product.productImage
                              ? `${process.env.NEXT_PUBLIC_APIBASEPATH.replace(
                                  "/website/",
                                  "",
                                )}uploads/product/${product.productImage}`
                              : "/images/placeholder.jpg"
                          }
                          alt={product.productName || "Product"}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Information */}

                      <div className="min-w-0">
                        <p className="text-[#5A5A5A] text-sm truncate">
                          {product.subCategory?.subCategoryName ||
                            product.parentCategory?.categoryName ||
                            "Furniture"}
                        </p>

                        <p className="mt-1 text-[#3131da95] text-sm sm:text-base line-clamp-2">
                          {product.productName}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                          {product.productActualPrice >
                            product.productPrice && (
                            <p className="text-[#5A5A5A] text-xs sm:text-sm line-through">
                              Rs.{" "}
                              {product.productActualPrice.toLocaleString(
                                "en-IN",
                              )}
                            </p>
                          )}

                          <p className="text-[#c99471] text-sm sm:text-base">
                            Rs. {product.productPrice?.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Divider */}

                  {index < topRatedProducts.length - 1 && (
                    <hr className="mt-5 text-[#ccc]" />
                  )}
                </React.Fragment>
              ))}

              {/* No Products */}

              {topRatedProducts.length === 0 && (
                <p className="mt-5 sm:mt-[30px] text-sm sm:text-base text-[#5A5A5A]">
                  No top rated products found.
                </p>
              )}
            </div>
          </div>

          <hr className="text-[#ccc]" />

          {/* Footer Links */}

          <div className="py-4 sm:py-[15px]">
            <ul
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-5
                gap-y-3
                sm:gap-x-8
                md:gap-10
                text-sm
                sm:text-base
              "
            >
              <Link href={"/"}>
                <li className="cursor-pointer hover:text-[#c99471]">Home</li>
              </Link>

              <Link href={"/productListing"}>
                <li className="cursor-pointer hover:text-[#c99471]">
                  Online Store
                </li>
              </Link>

              <Link href={"/privacy-policy"}>
                <li className="cursor-pointer hover:text-[#c99471]">
                  Privacy Policy
                </li>
              </Link>

              <Link href={"/term-of-use"}>
                <li className="cursor-pointer hover:text-[#c99471]">
                  Terms Of Use
                </li>
              </Link>
            </ul>
          </div>

          <hr className="text-[#ccc]" />

          {/* Copyright */}

          <div className="mt-5 text-center text-sm sm:text-base">
            <div>All Rights Reserved By Furniture | © 2026</div>

            <div className="flex justify-center items-center mt-5 sm:mt-[25px]">
              <Image
                src="/images/papyel2.png"
                alt="image"
                width={250}
                height={70}
                className="w-[180px] sm:w-[220px] md:w-[250px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
