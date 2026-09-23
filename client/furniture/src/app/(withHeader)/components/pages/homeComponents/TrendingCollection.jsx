import Image from "next/image";
import Link from "next/link";
import React from "react";

const TrendingCollection = () => {
  return (
    <>
      <section className="w-full my-2 relative overflow-hidden">
        <div className="w-full">
          <Image
            src="/images/e9234fa4-3ff6-4a6e-a00e-0c9ff26e7b20-1670180400.jpg"
            alt="image"
            width={1920}
            height={450}
            className="w-full h-[280px] sm:h-[320px] md:h-[350px] lg:h-[450px] object-cover"
          />

          <div className="absolute inset-0 cursor-pointer">
            <div className="max-w-[1170px] mx-auto h-full flex flex-col justify-center px-5 sm:px-8 md:px-10 lg:px-5">
              <h2 className="font-semibold text-[22px] sm:text-[28px] md:text-[35px] lg:text-[50px] leading-tight">
                New Trending Collection
              </h2>

              <p className="text-[13px] sm:text-[15px] md:text-[16px] mt-2 text-[#656060] leading-5 sm:leading-6 max-w-[500px]">
                We Believe That Good Design is Always in Season
              </p>

              <Link href={'/productListing'}>
                <div className="border-2 rounded-sm mt-6 sm:mt-8 md:mt-10 lg:mt-15 p-2.5 sm:p-3 w-[125px] sm:w-[150px] md:w-[200px] text-[11px] sm:text-[13px] md:text-[16px] text-center uppercase text-[#c99471] hover:text-white hover:bg-[#c99471] hover:border-[#c99471] cursor-pointer transition-all duration-300">
                  Shopping Now
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrendingCollection;
