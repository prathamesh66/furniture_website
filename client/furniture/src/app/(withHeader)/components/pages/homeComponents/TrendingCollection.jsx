import Image from 'next/image'
import React from 'react'

const TrendingCollection = () => {
  return (
    <>
      <section className="w-full my-2 relative">
        <div className="w-full">
          <Image
            src="/images/e9234fa4-3ff6-4a6e-a00e-0c9ff26e7b20-1670180400.jpg"
            alt="image"
            width={1920}
            height={450}
            className="w-full h-[300px]  md:h-[350px] lg:h-[450px] object-cover"
          />

          <div className="absolute inset-0 cursor-pointer">
            <div className=" md:my-[50px] md:h-[500px] duration-300 max-w-[1170px] mx-auto pt-15 px-5 md:pt-8 md:px-10">
              <h2 className="font-semibold text-[20px]  md:text-[35px] lg:text-[50px]">
                New Trending Collection
              </h2>
              <p className="text-[16px] mt-2 text-[#656060]">
                We Believe That Good Design is Always in Season
              </p>

              <div className=" border-2 rounded-sm mt-10 p-2 w-30 md:mt-15 md:w-50 text-[12px] md:text-[16px] text-center uppercase text-[#c99471] hover:text-white hover:bg-[#c99471]  hover:border-none cursor-pointer ">
                Shopping Now
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TrendingCollection
