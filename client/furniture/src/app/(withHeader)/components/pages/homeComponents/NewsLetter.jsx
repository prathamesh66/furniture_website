import React from 'react'

const NewsLetter = () => {
  return (
    <>
      <section className="bg-[#F8F9F9] w-full py-[50px] px-2">
        <div className="max-w-[600px] mx-auto  text-center">
          <div className="text-[25px] font-semibold ">Our Newsletter</div>
          <div className="text-[#656060] mt-4">
            Get E-mail updates about our latest shop and special offers.
          </div>

          <div className="flex justify-center text-center mt-6  rounded-sm border-1 border-[#ccc]">
            <input
              type="text"
              placeholder="Enter Address..."
              className="px-4 py-2 rounded-sm w-full "
            />
            <button className="rounded-sm px-5 text-white bg-[#C09578]">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewsLetter
