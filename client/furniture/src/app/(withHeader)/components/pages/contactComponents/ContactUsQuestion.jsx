import React from "react";
import { TbAddressBook } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const ContactUsQuestion = () => {
  return (
    <>
      <section className="max-w-[1320px] mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="py-5 sm:py-7 md:py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Contact Information */}
          <div>
            <div className="pb-3">
              <h2 className="text-[20px] sm:text-[22px] font-semibold">
                Contact US
              </h2>
            </div>

            <hr className="text-[#ccc]" />

            <ul>
              <li className="flex items-start gap-3 py-3 sm:py-4 text-[#4c4b4b]">
                <p className="pt-1 shrink-0">
                  <TbAddressBook />
                </p>
                <p className="text-sm sm:text-base leading-6">
                  Address: Pune, Maharashtra, India
                </p>
              </li>

              <hr className="text-[#ccc]" />

              <li className="flex items-center gap-3 py-3 sm:py-4 text-[#4c4b4b]">
                <p className="shrink-0">
                  <FaPhoneAlt />
                </p>
                <p className="text-sm sm:text-base">7058105139</p>
              </li>

              <hr className="text-[#ccc]" />

              <li className="flex items-center gap-3 py-3 sm:py-4 text-[#4c4b4b]">
                <p className="shrink-0">
                  <MdOutlineEmail />
                </p>
                <p className="text-sm sm:text-base break-all">
                  furniture@gmail.com
                </p>
              </li>
            </ul>
          </div>

          {/* Question Form */}
          <div>
            <h2 className="font-semibold text-[20px] sm:text-[22px] capitalize">
              Tell us your question
            </h2>

            <form action="">
              <div className="flex flex-col mt-3 sm:mt-4">
                <label
                  htmlFor=""
                  className="font-semibold text-sm sm:text-base"
                >
                  Your Name (required)
                </label>

                <input
                  type="text"
                  placeholder="Name *"
                  className="p-2.5 sm:p-3 border mt-2 border-[#ccc] rounded-lg w-full outline-none"
                />
              </div>

              <div className="flex flex-col mt-3 sm:mt-4">
                <label
                  htmlFor=""
                  className="font-semibold text-sm sm:text-base"
                >
                  Your Email (required)
                </label>

                <input
                  type="text"
                  placeholder="Email *"
                  className="p-2.5 sm:p-3 border mt-2 border-[#ccc] rounded-lg w-full outline-none"
                />
              </div>

              <div className="flex flex-col mt-3 sm:mt-4">
                <label
                  htmlFor=""
                  className="font-semibold text-sm sm:text-base"
                >
                  Your Mobile Number (required)
                </label>

                <input
                  type="text"
                  placeholder="Mobile Number *"
                  className="p-2.5 sm:p-3 border mt-2 border-[#ccc] rounded-lg w-full outline-none"
                />
              </div>

              <div className="flex flex-col mt-3 sm:mt-4">
                <label
                  htmlFor=""
                  className="font-semibold text-sm sm:text-base"
                >
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Subject *"
                  className="p-2.5 sm:p-3 border mt-2 border-[#ccc] rounded-lg w-full outline-none"
                />
              </div>

              <div className="flex flex-col mt-3 sm:mt-4">
                <label
                  htmlFor=""
                  className="font-semibold text-sm sm:text-base"
                >
                  Your Message
                </label>

                <textarea
                  name=""
                  id=""
                  rows={5}
                  placeholder="Message *"
                  className="p-2.5 sm:p-3 border mt-2 border-[#ccc] rounded-lg resize-none w-full outline-none"
                ></textarea>
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="border py-2 px-6 sm:px-8 rounded-sm text-white bg-black cursor-pointer hover:bg-[#c99471] transition-colors duration-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUsQuestion;
