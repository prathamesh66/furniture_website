import React, { useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb';
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { CiSearch } from 'react-icons/ci';

const ContactEnquirys = () => {

    let [showdiv, setShowDiv] = useState(false)

  return (
    <>
      <section className="w-full">
        <div>
          <Breadcrumb
            path="Contact Enquirys"
            link="/enquiry/contact-enquirys"
            path2="view"
          />
        </div>

        <div className="m-5">
          <div className={`${showdiv ? "block" : "hidden"}`}>
            <div className="w-full border-1 border-[#ccc] p-3 rounded-lg">
              <div className="m-3 flex gap-2 items-center">
                <div className="">
                  <input
                    type="text"
                    placeholder="Search Name"
                    className=" border-1 w-[300px] bg-[#374151] text-white border-[#ccc] p-2 rounded-lg"
                  />
                </div>

                <div className="p-2 border-1 border-[#ccc] rounded-lg bg-[#1D4ED8] text-white">
                  <button className="" type="submit">
                    <CiSearch />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[30px] border-1 overflow-hidden rounded-lg ">
            <div className="flex justify-between p-3 ">
              <div className="text-[25px] font-semibold">
                Contact Enquiry Management
              </div>

              <div className="flex items-center gap-3">
                <div className="border-1 border-[#ccc] rounded-lg text-white bg-[#2563EB]">
                  <button
                    className="p-3 cursor-pointer"
                    onClick={() => setShowDiv(!showdiv)}
                  >
                    {showdiv ? <BiHide /> : <BiShow />}
                  </button>
                </div>

                <div className="border-1 border-[#ccc] rounded-lg text-white bg-[#15803D]">
                  <button className="p-2 cursor-pointer">Change Status</button>
                </div>

                <div className="border-1 border-[#ccc] rounded-lg text-white bg-[#B91C1C]">
                  <button className="p-2 cursor-pointer">Delete</button>
                </div>
              </div>
            </div>

            <hr className="border-1 text-[#ccc]" />

            <div className="mt-3 border-0 border-[#ccc] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="w-full bg-gray-600 ">
                  <tr className="w-full text-[#cccccc7d]">
                    <th className=" p-3 text-center">
                      <input type="checkbox" />
                    </th>

                    <th className="p-3 text-left">USER INFO</th>

                    <th className="p-3 text-left">SUBJECT</th>

                    <th className="p-3 text-left">MESSAGE</th>

                    <th className="p-3 text-center cursor-pointer">STATUS</th>

                    <th className="p-3 text-center cursor-pointer">ACTION</th>
                  </tr>
                </thead>

                <tbody className="bg-gray-700 text-white ">
                  <tr className="">
                    <td className="p-3  py-8  text-center">
                      <input type="checkbox" />
                    </td>

                    <td className="p-3 py-8">Prathamesh Deshmukh </td>

                    <td className="p-3 py-8">Prathame@gmail.com</td>

                    <td className="p-3 py-8">+911234567890</td>

                    <td className="p-3 py-8 text-center">
                      <span className="p-2  bg-[#1DB655] rounded-lg cursor-pointer px-3">
                        Active
                      </span>
                    </td>

                    <td className="p-3 py-8 text-center">
                      <span className="p-2 bg-[#1D4ED8] rounded-lg cursor-pointer px-3">
                        Edit
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 py-8 text-center">
                      <input type="checkbox" />
                    </td>

                    <td className="p-3 py-8">
                      Prathamesh Pravinkumar Deshmukh
                    </td>

                    <td className="p-3 py-8">Prathame@gmail.com</td>

                    <td className="p-3 py-8">+911234567890</td>

                    <td className="p-3 py-8 text-center">
                      <span className="p-2  bg-[#DE2929] rounded-lg cursor-pointer px-3">
                        Deactive
                      </span>
                    </td>

                    <td className="p-3 py-8 text-center">
                      <span className="p-2 bg-[#1D4ED8] rounded-lg cursor-pointer px-3">
                        Edit
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 py-8 text-center">
                      <input type="checkbox" />
                    </td>

                    <td className="p-3 py-8">
                      Prathamesh Pravinkumar Deshmukh
                    </td>

                    <td className="p-3 py-8">Prathame@gmail.com</td>

                    <td className="p-3 py-8">+911234567890</td>

                    <td className="p-3 py-8 text-center">
                      <span className="p-2  bg-[#1DB655] rounded-lg cursor-pointer px-3">
                        Active
                      </span>
                    </td>

                    <td className="p-3 py-8 text-center">
                      <span className="p-2 bg-[#1D4ED8] rounded-lg cursor-pointer px-3">
                        Edit
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactEnquirys
