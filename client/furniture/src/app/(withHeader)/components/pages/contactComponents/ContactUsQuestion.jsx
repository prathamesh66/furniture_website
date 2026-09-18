import React from 'react'
import { TbAddressBook } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const ContactUsQuestion = () => {
  return (
    <>
      <section className="max-w-[1320px] mx-auto py-2">
        <div className="py-5 grid grid-cols-2 gap-5">
          <div>
            <div className="pb-3">
              <h2 className="text-[22px] font-semibold">Contact US</h2>
            </div>
            <hr className="text-[#ccc]" />
            <ul>
              <li className="flex items-center gap-3 py-3 text-[#4c4b4b]">
                <p>
                  <TbAddressBook />
                </p>
                <p> Address : Claritas est etiam processus dynamicus</p>
              </li>
              <hr className="text-[#ccc]" />
              <li className="flex items-center gap-3 py-3 text-[#4c4b4b]">
                <p>
                  <FaPhoneAlt />
                </p>
                <p>98745612330</p>
              </li>
              <hr className="text-[#ccc]" />
              <li className="flex items-center gap-3 py-3 text-[#4c4b4b]">
                <p>
                  <MdOutlineEmail />
                </p>
                <p>furniture@gmail.com</p>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-[22px] capitalize">
              Tell us your question
            </h2>

            <form action="">
              <div className="flex flex-col mt-3">
                <label htmlFor="" className="font-semibold">
                  Your Name (required)
                </label>
                <input
                  type="text"
                  placeholder="Name *"
                  className="p-3 border mt-2 border-[#ccc] rounded-lg"
                />
              </div>

              <div className="flex flex-col mt-3">
                <label htmlFor="" className="font-semibold">
                  Your Email (required)
                </label>
                <input
                  type="text"
                  placeholder="Email *"
                  className="p-3 border mt-2 border-[#ccc] rounded-lg"
                />
              </div>

              <div className="flex flex-col mt-3">
                <label htmlFor="" className="font-semibold">
                  Your Mobile Number (required)
                </label>
                <input
                  type="text"
                  placeholder="Mobile Number *"
                  className="p-3 border mt-2 border-[#ccc] rounded-lg"
                />
              </div>

              <div className="flex flex-col mt-3">
                <label htmlFor="" className="font-semibold">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject *"
                  className="p-3 border mt-2 border-[#ccc] rounded-lg"
                />
              </div>

              <div className="flex flex-col mt-3">
                <label htmlFor="" className="font-semibold">
                  Your Message
                </label>
                <textarea
                  name=""
                  id=""
                  rows={5}
                  placeholder="Message *"
                  className="p-3 border mt-2 border-[#ccc] rounded-lg resize-none"
                ></textarea>
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="border py-2 px-8 rounded-sm text-white bg-black cursor-pointer hover:bg-[#c99471]"
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
}

export default ContactUsQuestion
