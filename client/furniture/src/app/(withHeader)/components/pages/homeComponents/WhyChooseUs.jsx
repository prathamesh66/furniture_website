import React from 'react'
import { BiWorld } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { WiTime4 } from "react-icons/wi";

const WhyChooseUs = () => {
  return (
    <>
      <section className="w-full my-2">
        <div className="max-w-[1170px] mx-auto py-[30px] grid gap-4 grid-cols-1
         md:grid-cols-3
        ">
          <div className="text-center">
            <div className="w-[80px] h-[80px] rounded-full border-1 relative mx-auto hover:text-[#c99471]">
              <p className="absolute top-7 left-7 text-[25px]">
                <BiWorld />
              </p>
            </div>

            <div className="mt-[20px]">
              <p className="font-semibold text-[20px]">Free Shipping</p>
              <p className="text-[#656060] mt-3">Free shipping on all order</p>
            </div>
          </div>

          <div className="text-center">
            <div className="w-[80px] h-[80px] rounded-full border-1 relative mx-auto hover:text-[#c99471]">
              <p className="absolute top-7 left-7 text-[25px]">
                <IoMdCheckmarkCircleOutline />
              </p>
            </div>

            <div className="mt-[20px]">
              <p className="font-semibold text-[20px]">Money Return</p>
              <p className="text-[#656060] mt-3">Back guarantee under 7 days</p>
            </div>
          </div>

          <div className="text-center">
            <div className="w-[80px] h-[80px] rounded-full border-1 relative mx-auto hover:text-[#c99471]">
              <p className="absolute top-7 left-7 text-[25px]">
                <WiTime4 />
              </p>
            </div>

            <div className="mt-[20px]">
              <p className="font-semibold text-[20px]">Online Support</p>
              <p className="text-[#656060] mt-3">
                Support online 24 hours a day
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyChooseUs

  

{/* <div className="text-center">
            <div className="w-[50px] h-[50px] rounded-full border-1 relative  mx-auto">
              
            </div>

            <div className="mt-[20px]">
              <p>Free Shipping</p>
              <p>Free shipping on all order</p>
            </div>
          </div> */}
