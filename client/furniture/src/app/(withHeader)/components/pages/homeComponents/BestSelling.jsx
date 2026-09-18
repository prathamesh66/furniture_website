"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { useDispatch } from "react-redux";
import { addToCart } from "@/app/(withHeader)/redux/cartSlice";
import Image from "next/image";



const BestSelling = () => {
  const sliderRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBestSellingProducts = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_APIBASEPATH;

        const response = await fetch(`${baseURL}product/best-selling`);

        const data = await response.json();

        // console.log("Best Selling API Data:", data);

        setProducts(data.productData || []);
        setImagePath(data.path || "");
        setLoading(false);
      } catch (error) {
        // console.log("Best Selling API Error:", error);
        setLoading(false);
      }
    };

    getBestSellingProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: products.length > 5,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="w-full py-10 bg-[#f5f5f5]">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-5 mb-8">
          <h2 className="text-[32px] font-bold whitespace-nowrap">
            Bestselling Products
          </h2>

          <div className="flex-1 h-[1px] bg-gray-300"></div>

          {/* Custom Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="text-[20px] cursor-pointer hover:text-[#c99471]"
            >
              <MdArrowBackIosNew />
            </button>

            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="text-[20px] cursor-pointer hover:text-[#c99471]"
            >
              <MdOutlineArrowForwardIos />
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-10">
            Loading Bestselling Products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No Bestselling Products Available
          </div>
        ) : (
          /* Slider */
          <Slider ref={sliderRef} {...settings}>
            {products.map((product) => (
              <div key={product._id} className="px-2">
                <ProductShowComponents value={product} imagePath={imagePath} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default BestSelling;

/* -----------------------------------------
   Product Card
----------------------------------------- */

const ProductShowComponents = ({ value, imagePath }) => {
  const { _id, productName, productImage, productPrice, productActualPrice } =
    value;


    const dispatch = useDispatch();

  const imageUrl = productImage
    ? `${imagePath}${encodeURIComponent(productImage)}`
    : "";

  return (
    <div className="bg-white shadow-md overflow-hidden">
      {/* Image */}
      <Link href={`/newProduct-server/${_id}`}>
        <div className="overflow-hidden group cursor-pointer">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={productName || "Product image"}
              width="400"
              height="300"
              className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-[220px] flex items-center justify-center bg-gray-100 text-gray-500">
              No Image
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Product Name */}
        <p className="text-center text-gray-500">{productName}</p>

        {/* Product Name / Description */}
        <h3 className="text-center font-bold text-[18px] mt-4 min-h-[60px]">
          {productName}
        </h3>

        <hr className="my-4 border-gray-200" />

        {/* Price */}
        <div className="flex justify-center items-center gap-2">
          <span className="line-through text-gray-500">
            ₹{productActualPrice}
          </span>

          <span className="font-bold text-[#c99471]">₹{productPrice}</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-1 mt-5">
          {/* Wishlist */}
          <button className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-[#c99471] hover:text-white transition cursor-pointer">
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
            className="px-5 bg-[#f3f3f3] hover:bg-[#c99471] hover:text-white transition cursor-pointer"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
