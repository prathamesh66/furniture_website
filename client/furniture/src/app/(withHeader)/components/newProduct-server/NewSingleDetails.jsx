"use client";

import React, { useState } from "react";

const NewSingleDetails = ({ data }) => {
  const product = data?.productData;

  const getImageUrl = (imageName) => {
    if (!imageName || !data?.path) {
      return "";
    }

    return `${data.path}${encodeURIComponent(imageName)}`;
  };

  const [mainImage, setMainImage] = useState(
    getImageUrl(product?.productImage),
  );

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <section className="max-w-[1320px] mx-auto px-5 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ================= IMAGES ================= */}

        <div className="flex gap-5">
          {/* Thumbnail Images */}

          <div className="flex flex-col gap-3">
            {/* Main Product Image */}

            <img
              src={getImageUrl(product.productImage)}
              alt={product.productName}
              width={80}
              height={80}
              className="w-20 h-20 object-contain border border-[#ccc] rounded-md p-2 cursor-pointer"
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
                className="w-20 h-20 object-contain border border-[#ccc] rounded-md p-2 cursor-pointer"
                onClick={() => setMainImage(getImageUrl(image))}
              />
            ))}
          </div>

          {/* Main Image */}

          <div className="flex-1 flex justify-center items-center border border-[#ccc] rounded-lg p-5 min-h-[500px]">
            {mainImage && (
              <img
                src={mainImage}
                alt={product.productName}
                width={500}
                height={500}
                className="max-w-full max-h-[500px] object-contain"
              />
            )}
          </div>
        </div>

        {/* ================= PRODUCT DETAILS ================= */}

        <div>
          {/* Category */}

          <p className="text-sm text-gray-500">
            {product.parentCategory?.categoryName}
          </p>

          {/* Product Name */}

          <h1 className="text-4xl font-bold mt-2">{product.productName}</h1>

          {/* Price */}

          <div className="flex items-center gap-3 mt-5">
            <span className="text-gray-500 line-through">
              ₹{product.productActualPrice}
            </span>

            <span className="text-[#c99471] text-2xl font-bold">
              ₹{product.productPrice}
            </span>
          </div>

          {/* Short Description */}

          <p className="text-gray-600 leading-7 mt-6">
            {product.productShortDescription}
          </p>

          {/* Full Description */}

          <div className="mt-6 text-gray-600">{product.productDescription}</div>

          {/* Material */}

          <p className="mt-5">
            <b>Material:</b>{" "}
            {product.material?.length
              ? product.material.map((item) => item.materialName).join(", ")
              : "N/A"}
          </p>

          {/* Color */}

          <p className="mt-2">
            <b>Color:</b>{" "}
            {product.color?.length
              ? product.color.map((item) => item.colorName).join(", ")
              : "N/A"}
          </p>

          {/* Stock */}

          <p className="mt-2">
            <b>Stock:</b> {product.totalStock}
          </p>

          {/* Buttons */}

          <div className="mt-8 flex gap-4">
            <button className="bg-[#c99471] text-white px-6 py-3 rounded-lg hover:bg-[#b78362] transition">
              Add to Cart
            </button>

            <button className="border border-gray-400 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewSingleDetails;
