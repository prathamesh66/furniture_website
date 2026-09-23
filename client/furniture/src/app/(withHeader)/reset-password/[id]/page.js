"use client";

import { useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "next/navigation";
import axios from "axios";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let { id } = useParams();

  let APIBASEURL = process.env.NEXT_PUBLIC_APIBASEPATH;

  const handleSubmit = (e) => {
    e.preventDefault();

    let obj = {
      newPassword: e.target.newPassword.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    axios
      .put(`${APIBASEURL}user/resetPassword/${id}`, obj)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
          toast.success(finalRes._message);
        } else {
          toast.error(finalRes._message);
        }
      });
  };

  return (
    <section className="w-full">
      <div>
        <Breadcrumb title={"Reset Password"} />
      </div>

      <div className="w-full max-w-[1320px] mx-auto py-2.5 sm:py-[10px] px-4 sm:px-6 lg:px-8">
        <ToastContainer />

        <hr className="text-[#ccc]" />

        <div className="flex items-center justify-center py-6 sm:py-8 md:py-[30px]">
          <div className="w-full max-w-md bg-white border-[#ccc] border rounded-xl shadow-lg p-5 sm:p-6 md:p-8">
            {/* Heading */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Reset Your Password
              </h1>

              <p className="text-sm sm:text-base text-gray-500 mt-2 break-words">
                Enter your new password below
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition duration-200 cursor-pointer"
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
