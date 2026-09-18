"use client";

import { useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "next/navigation";
import axios from "axios";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  let {id} = useParams();

  let APIBASEURL = process.env.NEXT_PUBLIC_APIBASEPATH;


  const handleSubmit = (e) => {
    e.preventDefault();


    let obj = {
      newPassword: e.target.newPassword.value,
      confirmPassword: e.target.confirmPassword.value 
    }


    axios
      .put(`${APIBASEURL}user/resetPassword/${id}`, obj)
      .then((res) => res.data)
      .then((finalRes) => {
         if(finalRes._status){
          toast.success(finalRes._message)
         }
         else {
          toast.error(finalRes._message)

         }
      });

   };

  return (
    <section>
      <div>
        <Breadcrumb title={"Reset Password"} />
      </div>

      <div className="max-w-[1320px] mx-auto py-[10px] px-4">
      <ToastContainer/>
        <hr className="text-[#ccc]" />

        <div className="flex items-center py-[30px] justify-center">
          <div className="w-full max-w-md bg-white border-[#ccc] border-1 rounded-xl shadow-lg p-8">
            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Reset Your Password
              </h1>

              <p className="text-gray-500 mt-2">
                Enter your new password below
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  New Password
                </label>

                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>

                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 cursor-pointer"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
