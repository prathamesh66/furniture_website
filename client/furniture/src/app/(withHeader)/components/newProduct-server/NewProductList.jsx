"use client";

import React, { useState } from "react";
import Link from "next/link";

const NewProductList = ({ featured, newArrivals, onSale }) => {
  const [currentCategory, setCurrentCategory] = useState("Featured");

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
    <section className="w-full my-5 md:my-10">
      <div className="max-w-[1320px] mx-auto">
        {/* Tabs */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <hr className="w-[100px] border-gray-300" />

          <div className="flex flex-col md:flex-row">
            {["Featured", "New Arrivals", "Onsale"].map((category) => (
              <button
                key={category}
                onClick={() => setCurrentCategory(category)}
                className={`px-3 md:px-8 my-2 py-2 md:py-3 text-[18px] font-semibold cursor-pointer transition-all duration-300 border w-[200px] border-gray-300 ${
                  category === currentCategory
                    ? "text-[#c99471] bg-gray-50"
                    : "text-black hover:text-[#c99471]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <hr className="w-[100px] border-gray-300" />
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                value={product}
                imagePath={imagePath}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
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
    <div className="border border-gray-200 p-2 md:p-4">
      {/* Product Image */}
      <Link href={`/newProduct-server/${_id}`}>
        <div className="overflow-hidden group">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={productName || "Product image"}
              width="670"
              height="420"
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-[250px] flex items-center justify-center bg-gray-100 text-gray-500">
              No Image
            </div>
          )}
        </div>
      </Link>

      {/* Product Information */}
      <div className="mt-4">
        <p className="text-[#696464] text-sm">{productName}</p>

        <hr className="my-3 border-gray-200" />

        {/* Price */}
        <div className="flex items-center gap-3">
          <p className="text-[#696464] line-through">₹{productActualPrice}</p>

          <p className="text-[#c99471] font-semibold">₹{productPrice}</p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-4">
          <button className="px-4 py-2 bg-[#F1F1F1] text-black font-medium rounded-sm hover:bg-[#c99471] transition-all duration-300">
            Add To Cart
          </button>

          <Link
            href={`/newProduct-server/${_id}`}
            className="px-4 py-2 border border-gray-300 rounded-sm hover:bg-[#c99471] hover:text-white"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
