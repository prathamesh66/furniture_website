import React from "react";

const NewsLetter = () => {
  return (
    <>
      <section className="bg-[#F8F9F9] w-full py-8 sm:py-10 md:py-[50px] px-4 sm:px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <div className="text-[22px] sm:text-[25px] font-semibold">
            Our Newsletter
          </div>

          <div className="text-[#656060] text-sm sm:text-base mt-3 sm:mt-4 leading-6">
            Get E-mail updates about our latest shop and special offers.
          </div>

          <div className="flex justify-center text-center mt-5 sm:mt-6 rounded-sm border border-[#ccc] overflow-hidden">
            <input
              type="text"
              placeholder="Enter Address..."
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-sm w-full min-w-0 outline-none text-sm sm:text-base"
            />

            <button className="rounded-sm px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base text-white bg-[#C09578] whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsLetter;
