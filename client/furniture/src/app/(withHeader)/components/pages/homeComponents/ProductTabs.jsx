"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { addToCart } from "@/app/(withHeader)/redux/cartSlice";



const ProductTabs = () => {
  const [currentCategory, setCurrentCategory] = useState("Featured");

  const [products, setProducts] = useState({
    Featured: [],
    "New Arrivals": [],
    Onsale: [],
  });

  const [imagePath, setImagePath] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_APIBASEPATH;

        const [featuredRes, newArrivalRes, onSaleRes] = await Promise.all([
          fetch(`${baseURL}product/featured`),
          fetch(`${baseURL}product/new-arrivals`),
          fetch(`${baseURL}product/on-sale`),
        ]);

        const featuredData = await featuredRes.json();
        const newArrivalData = await newArrivalRes.json();
        const onSaleData = await onSaleRes.json();

        setProducts({
          Featured: featuredData.productData || [],
          "New Arrivals": newArrivalData.productData || [],
          Onsale: onSaleData.productData || [],
        });

        // Product image path coming from backend
        setImagePath(featuredData.path || "");

        setLoading(false);
      } catch (error) {
        console.log("Product API Error:", error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const categoryData = ["Featured", "New Arrivals", "Onsale"];

  const finalData = products[currentCategory];

  return (
    <section className="w-full my-5 md:my-10">
      <div className="max-w-[1320px] mx-auto">
        {/* =========================
            CATEGORY TABS
        ========================= */}

        <div className="flex items-center justify-center gap-4 mb-10">
          <hr className="w-[100px] border-gray-300" />

          <div className="flex flex-col md:flex-row">
            {categoryData.map((category) => (
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

        {/* =========================
            LOADING
        ========================= */}

        {loading ? (
          <div className="text-center py-10">Loading Products...</div>
        ) : finalData.length > 0 ? (
          /* =========================
             PRODUCTS
          ========================= */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalData.map((item) => (
              <ProductShowComponents
                key={item._id}
                value={item}
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

export default ProductTabs;

/* =====================================================
   PRODUCT CARD
===================================================== */

const ProductShowComponents = ({ value, imagePath }) => {
  const { _id, productName, productImage, productPrice, productActualPrice } =
    value;


    const dispatch = useDispatch();

  // Create complete backend image URL
  const imageUrl = productImage
    ? `${imagePath}${encodeURIComponent(productImage)}`
    : "";

  // console.log("PRODUCT NAME:", productName);
  // console.log("IMAGE PATH:", imagePath);
  // console.log("IMAGE NAME:", productImage);
  // console.log("IMAGE URL:", imageUrl);

  return (
    <div className="border border-gray-200 p-2 md:p-4">
      {/* =========================
          PRODUCT IMAGE
      ========================= */}

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

      {/* =========================
          PRODUCT INFORMATION
      ========================= */}

      <div className="mt-4">
        {/* Product Name */}

        <p className="text-[#696464] text-sm">{productName}</p>

        {/* Product Description / Name */}

        <p className="font-semibold text-lg mt-1 min-h-[40px] md:min-h-[60px]">
          {productName}
        </p>

        <hr className="my-3 border-gray-200" />

        {/* =========================
            PRICE
        ========================= */}

        <div className="flex items-center gap-3">
          <p className="text-[#696464] line-through">₹{productActualPrice}</p>

          <p className="text-[#c99471] font-semibold">₹{productPrice}</p>
        </div>

        {/* =========================
            BUTTONS
        ========================= */}

        <div className="flex items-center justify-between mt-4">
          {/* Wishlist */}

          <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-[#c99471] hover:text-white transition-all duration-300 cursor-pointer">
            <FaHeart />
          </button>

          {/* Add To Cart */}

          <button
            onClick={() =>
              dispatch(
                addToCart({
                  id: value._id,
                  productName: value.productName,
                  productImage: value.productImage,
                  productPrice: value.productPrice,
                  productActualPrice: value.productActualPrice,
                }),
              )
            }
            className="px-4 py-2 bg-[#F1F1F1] text-black font-medium rounded-sm hover:bg-[#c99471] transition-all duration-300 cursor-pointer"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
