import React from "react";
import { BiWorld } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { WiTime4 } from "react-icons/wi";

const WhyChooseUs = () => {
  return (
    <>
      <section className="w-full my-2">
        <div
          className="
            max-w-[1170px]
            mx-auto
            px-4 sm:px-6
            py-7 sm:py-8 md:py-[30px]
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-8 sm:gap-10 md:gap-4
          "
        >
          {/* Free Shipping */}
          <div className="text-center">
            <div
              className="
                w-[65px] h-[65px]
                sm:w-[70px] sm:h-[70px]
                md:w-[80px] md:h-[80px]
                rounded-full
                border
                relative
                mx-auto
                hover:text-[#c99471]
                transition-colors
                duration-300
              "
            >
              <p
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  text-[22px]
                  sm:text-[24px]
                  md:text-[25px]
                "
              >
                <BiWorld />
              </p>
            </div>

            <div className="mt-4 sm:mt-5">
              <p className="font-semibold text-[18px] sm:text-[19px] md:text-[20px]">
                Free Shipping
              </p>

              <p className="text-[#656060] text-sm sm:text-base mt-2 sm:mt-3">
                Free shipping on all order
              </p>
            </div>
          </div>

          {/* Money Return */}
          <div className="text-center">
            <div
              className="
                w-[65px] h-[65px]
                sm:w-[70px] sm:h-[70px]
                md:w-[80px] md:h-[80px]
                rounded-full
                border
                relative
                mx-auto
                hover:text-[#c99471]
                transition-colors
                duration-300
              "
            >
              <p
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  text-[22px]
                  sm:text-[24px]
                  md:text-[25px]
                "
              >
                <IoMdCheckmarkCircleOutline />
              </p>
            </div>

            <div className="mt-4 sm:mt-5">
              <p className="font-semibold text-[18px] sm:text-[19px] md:text-[20px]">
                Money Return
              </p>

              <p className="text-[#656060] text-sm sm:text-base mt-2 sm:mt-3">
                Back guarantee under 7 days
              </p>
            </div>
          </div>

          {/* Online Support */}
          <div className="text-center">
            <div
              className="
                w-[65px] h-[65px]
                sm:w-[70px] sm:h-[70px]
                md:w-[80px] md:h-[80px]
                rounded-full
                border
                relative
                mx-auto
                hover:text-[#c99471]
                transition-colors
                duration-300
              "
            >
              <p
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  text-[22px]
                  sm:text-[24px]
                  md:text-[25px]
                "
              >
                <WiTime4 />
              </p>
            </div>

            <div className="mt-4 sm:mt-5">
              <p className="font-semibold text-[18px] sm:text-[19px] md:text-[20px]">
                Online Support
              </p>

              <p className="text-[#656060] text-sm sm:text-base mt-2 sm:mt-3">
                Support online 24 hours a day
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
