"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const SingleDetails = ({data}) => {

  let [mainImage, setMainImage] = useState(data.thumbnail)

  let {
    title,
    price,
    thumbnail,
    category,
    rating,
    stock,
    description,
    brand,
    images,
  } = data;

  return (
    <section className="max-w-7xl mx-auto px-5 py-10">
      <div>
        <section className="py-8">
          <h1 className="text-center font-semibold text-4xl">{title}</h1>
          <div className="text-center py-3 ">
            <Link href="/" className="mr-2 hover:text-[#c99471]">
              Home
            </Link>
            &gt;
            <span className="text-[#c99471] ml-2">{title}</span>
          </div>
        </section>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className=" p-6 bg-white flex gap-5">
          {/* Left Side Thumbnail Images */}
          <div className="flex flex-col gap-3">
            {images.map((value, index) => (
              <Image
                key={index}
                src={value}
                alt={`Product ${index + 1}`}
                onClick={()=>{setMainImage(value)}}
                width={80}
                height={80}
                className="border border-[#ccc] rounded-md p-3 cursor-pointer object-cover"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 flex justify-center items-center border border-[#ccc] shadow rounded-lg">
            <Image
              src={mainImage}
              alt={title}
              width={350}
              height={350}
              className="rounded-lg object-contain"
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 uppercase">{category}</p>
          <h1 className="text-4xl font-bold mt-2">{title}</h1>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-yellow-500 text-lg">⭐{rating}</span>
            <span className="text-green-600 font-semibold">In Stock (34)</span>
          </div>
          <p className="text-3xl font-bold text-blue-600 mt-6">Rs.{price}</p>
          <p className="text-gray-600 leading-7 mt-6">{description}</p>
          <div className="mt-6 space-y-2">
            <p>
              <span className="font-semibold">Brand : </span>
              {brand}
            </p>
            <p>
              <span className="font-semibold">Category : </span> {category}
            </p>
          </div>
          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
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
}

export default SingleDetails;
