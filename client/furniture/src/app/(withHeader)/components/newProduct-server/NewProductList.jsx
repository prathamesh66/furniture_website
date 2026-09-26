"use client";

import React, { useState } from "react";
import Link from "next/link";

const NewProductList = ({ featured, newArrivals, onSale }) => {
  const [currentCategory, setCurrentCategory] = useState("Featured");

  const BACKENDURL = "https://furniture-website-ienf.onrender.com";

  const imageUrl = productImage
    ? `${BACKENDURL}/uploads/product/${encodeURIComponent(productImage)}`
    : "";

  let products = [];
  let imagePath = "";

  if (currentCategory === "Featured") {
    products = featured?.productData || [];
    imagePath = featured?.path || "";
  }

  if (currentCategory === "New Arrivals") {
    products = newArrivals?.productData || [];
    imagePath = newArrivals?.path || "";
  }

  if (currentCategory === "Onsale") {
    products = onSale?.productData || [];
    imagePath = onSale?.path || "";
  }

  return (
    <section className="w-full my-5 sm:my-7 md:my-10">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
          {/* Left Line */}
          <hr className="hidden md:block w-[50px] lg:w-[100px] border-gray-300" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 w-full sm:w-auto">
            {["Featured", "New Arrivals", "Onsale"].map((category) => (
              <button
                key={category}
                onClick={() => setCurrentCategory(category)}
                className={`px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg font-semibold cursor-pointer transition-all duration-300 border border-gray-300 w-full sm:w-auto min-w-[140px] sm:min-w-[150px] md:min-w-[170px] lg:min-w-[200px] ${
                  category === currentCategory
                    ? "text-[#c99471] bg-gray-50"
                    : "text-black hover:text-[#c99471]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right Line */}
          <hr className="hidden md:block w-[50px] lg:w-[100px] border-gray-300" />
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                value={product}
                imagePath={imagePath}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-10 text-sm sm:text-base text-gray-500">
            No products available
          </div>
        )}
      </div>
    </section>
  );
};

export default NewProductList;

/* =====================================================
   PRODUCT CARD
===================================================== */

const ProductCard = ({ value, imagePath }) => {
  const { _id, productName, productImage, productPrice, productActualPrice } =
    value;

  const imageUrl = productImage
    ? `${imagePath}${encodeURIComponent(productImage)}`
    : "";

  console.log("PRODUCT:", productName);
  console.log("IMAGE PATH:", imagePath);
  console.log("IMAGE NAME:", productImage);
  console.log("IMAGE URL:", imageUrl);

  return (
    <div className="border border-gray-200 p-2 sm:p-3 md:p-4 w-full min-w-0">
      {/* Product Image */}
      <Link href={`/newProduct-server/${_id}`}>
        <div className="overflow-hidden group w-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={productName || "Product image"}
              width="670"
              height="420"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-[220px] sm:h-[240px] md:h-[250px] flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
              No Image
            </div>
          )}
        </div>
      </Link>

      {/* Product Information */}
      <div className="mt-3 sm:mt-4">
        <p className="text-[#696464] text-sm sm:text-base truncate">
          {productName}
        </p>

        <hr className="my-2 sm:my-3 border-gray-200" />

        {/* Price */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <p className="text-[#696464] text-sm sm:text-base line-through">
            ₹{productActualPrice}
          </p>

          <p className="text-[#c99471] text-sm sm:text-base font-semibold">
            ₹{productPrice}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 mt-3 sm:mt-4">
          <button className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-[#F1F1F1] text-black font-medium rounded-sm hover:bg-[#c99471] transition-all duration-300">
            Add To Cart
          </button>

          <Link
            href={`/newProduct-server/${_id}`}
            className="w-full sm:w-auto text-center px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-sm hover:bg-[#c99471] hover:text-white transition-all duration-300"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
