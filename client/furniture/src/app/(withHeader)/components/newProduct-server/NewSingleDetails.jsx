"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addToCart,
  deleteCart,
  changeQty,
} from "@/app/(withHeader)/redux/cartSlice";

const NewSingleDetails = ({ data }) => {
  const product = data?.productData;

  const dispatch = useDispatch();

  // ================= CART =================

  const cart = useSelector((state) => state.cartStore?.cart || []);

  const cartProduct = cart.find((item) => item._id === product?._id);

  const isInCart = !!cartProduct;

  // ================= IMAGE =================

  // ================= IMAGE =================

  const BACKENDURL = "https://furniture-website-ienf.onrender.com";

  const getImageUrl = (imageName) => {
    if (!imageName) {
      return "";
    }

    return `${BACKENDURL}/uploads/product/${encodeURIComponent(imageName)}`;
  };

  const [mainImage, setMainImage] = useState(
    getImageUrl(product?.productImage),
  );

  if (!product) {
    return <p>Product not found</p>;
  }

  // ================= ADD / REMOVE CART =================

  const handleCart = () => {
    if (isInCart) {
      dispatch(deleteCart(product._id));

      toast.success("Product removed from cart!");
    } else {
      dispatch(
        addToCart({
          _id: product._id,
          productName: product.productName,
          productImage: product.productImage,
          productActualPrice: product.productActualPrice,
          productPrice: product.productPrice,
          qty: 1,
        }),
      );

      toast.success("Product added to cart!");
    }
  };

  // ================= QUANTITY =================

  const handleQuantity = (type) => {
    if (!isInCart) {
      toast.info("Please add the product to cart first.");
      return;
    }

    if (type === "plus" && cartProduct.qty >= product.totalStock) {
      toast.info("Maximum available stock reached.");
      return;
    }

    dispatch(
      changeQty({
        id: product._id,
        type: type,
      }),
    );
  };

  return (
    <section className="w-full py-6 sm:py-8 md:py-10">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {/* ================= IMAGES ================= */}

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full">
            {/* Thumbnail Images */}

            <div className="flex flex-row sm:flex-col gap-2 sm:gap-3 order-2 sm:order-1 overflow-x-auto sm:overflow-x-visible">
              {/* Main Product Image */}

              <img
                src={getImageUrl(product.productImage)}
                alt={product.productName}
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 object-contain border border-[#ccc] rounded-md p-2 cursor-pointer"
                onClick={() => setMainImage(getImageUrl(product.productImage))}
              />

              {/* Gallery Images */}

              {product.productGallery?.map((image, index) => (
                <img
                  key={index}
                  src={getImageUrl(image)}
                  alt={`${product.productName} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 object-contain border border-[#ccc] rounded-md p-2 cursor-pointer"
                  onClick={() => setMainImage(getImageUrl(image))}
                />
              ))}
            </div>

            {/* Main Image */}

            <div className="order-1 sm:order-2 flex-1 flex justify-center items-center border border-[#ccc] rounded-lg p-3 sm:p-5 min-h-[300px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] w-full">
              {mainImage && (
                <img
                  src={mainImage}
                  alt={product.productName}
                  width={500}
                  height={500}
                  className="max-w-full max-h-[300px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px] w-auto h-auto object-contain"
                />
              )}
            </div>
          </div>

          {/* ================= PRODUCT DETAILS ================= */}

          <div className="w-full min-w-0">
            {/* Category */}

            <p className="text-xs sm:text-sm text-gray-500">
              {product.parentCategory?.categoryName}
            </p>

            {/* Product Name */}

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 leading-tight">
              {product.productName}
            </h1>

            {/* Price */}

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 sm:mt-5">
              <span className="text-sm sm:text-base text-gray-500 line-through">
                ₹{product.productActualPrice}
              </span>

              <span className="text-xl sm:text-2xl font-bold text-[#c99471]">
                ₹{product.productPrice}
              </span>
            </div>

            {/* Short Description */}

            <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7 mt-5 sm:mt-6">
              {product.productShortDescription}
            </p>

            {/* Full Description */}

            <div className="mt-5 sm:mt-6 text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
              {product.productDescription}
            </div>

            {/* Material */}

            <p className="mt-4 sm:mt-5 text-sm sm:text-base">
              <b>Material:</b>{" "}
              {product.material?.length
                ? product.material.map((item) => item.materialName).join(", ")
                : "N/A"}
            </p>

            {/* Color */}

            <p className="mt-2 text-sm sm:text-base">
              <b>Color:</b>{" "}
              {product.color?.length
                ? product.color.map((item) => item.colorName).join(", ")
                : "N/A"}
            </p>

            {/* Stock */}

            <p className="mt-2 text-sm sm:text-base">
              <b>Stock:</b> {product.totalStock}
            </p>

            {/* ================= QUANTITY ================= */}

            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
              <span className="font-semibold text-sm sm:text-base">
                Quantity:
              </span>

              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleQuantity("minus")}
                  className="w-9 h-9 sm:w-10 sm:h-10 text-lg sm:text-xl hover:bg-gray-100"
                >
                  -
                </button>

                <span className="w-10 sm:w-12 text-center text-sm sm:text-base">
                  {cartProduct?.qty || 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleQuantity("plus")}
                  className="w-9 h-9 sm:w-10 sm:h-10 text-lg sm:text-xl hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* ================= BUTTONS ================= */}

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleCart}
                className="w-full sm:w-auto bg-[#c99471] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-[#b78362] transition text-sm sm:text-base"
              >
                {isInCart ? "Remove From Cart" : "Add To Cart"}
              </button>

              <button
                type="button"
                className="w-full sm:w-auto border border-gray-400 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewSingleDetails;
