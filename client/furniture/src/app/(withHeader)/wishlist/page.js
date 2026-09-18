import React from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";

const page = () => {
  return (
    <section className="w-full py-2">
      <div>
        <Breadcrumb title={"My WishList"} />
      </div>

      <div className="max-w-[1320px] mx-auto my-2 ">
        <hr className="text-[#ccc]" />

        <div className="mt-10">
          <table className="w-full">
            <thead>
              <tr className="text-center bg-[#F2F2F2] border-b-3 border-[#c98d6d] bg-[#F2F2F2]">
                <th className="py-3 px-10">Delete</th>
                <th className="py-3 px-10">Image</th>
                <th className="py-3 px-10">Product</th>
                <th className="py-3 px-10">Price</th>
                <th className="py-3 px-10">Stock Status</th>
                <th className="py-3 px-10">Add To Cart</th>
              </tr>
            </thead>

            <tbody className="border border-[#ccc]">
              <tr>
                <td className="py-2 border border-[#ccc]">
                  <p className="flex text-center">
                    <RiDeleteBin6Line
                      size={22}
                      className="cursor-pointer text-orange-400 hover:text-red-600 transition mx-auto"
                    />
                  </p>
                </td>
                <td className="py-2 text-center border border-[#ccc]">
                  <Image
                    src={"/images/1617981904164Hrithvik Stool__.jpg"}
                    alt="image"
                    width={232}
                    height={145}
                    className="mx-auto"
                  />
                </td>
                <td className="py-2 text-center border border-[#ccc]">
                  Hritvik Stool 
                </td>
                <td className="py-2 text-center border border-[#ccc]">
                  {" "}
                  Rs. 6,000
                </td>
                <td className="py-2 text-center border border-[#ccc]">
                  Out Of Stock
                </td>
                <td className="py-2 text-center border border-[#ccc]">
                  <button className="border py-2 px-3 rounded-lg bg-[#C09578] text-white">
                    Add To Cart
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default page;
