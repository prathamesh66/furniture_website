"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
// import { TestimonialData } from "@/app/Data/TestimonialData";

const Testimonials = () => {

 let TestimonialData = [
   {
     id: 1,
     review:
       "These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!",
     image: "/images/3023f95a-ce85-434c-b9c5-2b0943b865e2-1670161621.jpg",
     name: "KATHY YOUNG",
     designation: "CEO of SunPark",
   },

   {
     id: 2,
     review:
       "Amazing customer service and excellent product quality. Everything was delivered on time and exactly as expected. Highly recommended!",
     image: "/images/c6381687-5a5e-4914-9373-9cbec4937be6-1670161604.jpg",
     name: "JOHN SMITH",
     designation: "Founder of SoftTech",
   },

   {
     id: 3,
     review:
       "The furniture quality is exceptional. The support team helped me throughout the process and the experience was fantastic.",
     image: "/images/35b5a0a0-e80f-4038-a75a-2811de92118b-1670161614.png",
     name: "EMMA WATSON",
     designation: "Interior Designer",
   },
 ];

  const [activeIndex, setActiveIndex] = useState(0);

  const current = TestimonialData[activeIndex];

  return (
    <section className="w-full bg-[#f5f5f5] py-10 md:py-15">
      <div className="max-w-[1320px] mx-auto text-center px-2">
        {/* Common Heading */}
        <h2 className="text-[20px] md:text-[40px] font-bold mb-8">
          What Our Customers Say ?
        </h2>

        {/* Review */}
        <p className="max-w-[1100px] mx-auto text-[16px] md:text-[18px] text-[#666] text-center">
          {current.review}
        </p>

        {/* Image */}
        <div className="flex justify-center mt-12">
          <Image
            src={current.image}
            alt={current.name}
            width={110}
            height={110}
            className="rounded-full object-cover"
          />
        </div>

        {/* Name */}
        <h3 className="text-[20px] md:text-[28px] font-bold mt-6">{current.name}</h3>

        {/* Designation */}
        <p className="text-[#666] text-[16px] md:text-[20px] mt-2">{current.designation}</p>

        {/* Stars */}
        <div className="flex justify-center gap-2 mt-6 text-[#c99471] text-[12px]   md:text-[20px]">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {TestimonialData.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 md:w-4 md:h-4 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === index ? "bg-[#c99471]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
