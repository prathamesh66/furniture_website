"use client";

import { useState } from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import axios from "axios";

export default function ForgotPassword() {
  let APIBASEURL = process.env.NEXT_PUBLIC_APIBASEPATH;

  let [error, setError] = useState("");
  let [msg, setMsg] = useState("");

  let [buttonLoading, setButtonLoading] = useState(false);

  const handleSubmit = (e) => {
    setError("");

    setMsg("");

    setButtonLoading(true);

    e.preventDefault();

    let obj = {
      email: e.target.email.value,
    };

    axios
      .post(`${APIBASEURL}user/forgotPassword`, obj)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
          setButtonLoading(false);

          e.target.reset();

          setMsg(finalRes._message);
        } else {
          setError(finalRes._message);
        }
      });
  };

  return (
    <section>
      {/* Breadcrumb */}
      <div>
        <Breadcrumb title={"Forgot Password"} />
      </div>

      {/* Main Container */}
      <div className="max-w-[1320px] mx-auto py-4 sm:py-5 px-4 sm:px-6 lg:px-8">
        <hr className="text-[#ccc]" />

        <div className="flex items-center py-6 sm:py-8 md:py-[30px] justify-center">
          <div className="w-full max-w-md bg-white border-1 border-[#ccc] rounded-xl shadow-lg p-5 sm:p-6 md:p-8">
            {/* Heading */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Forgot Password
              </h1>

              <p className="text-sm sm:text-base text-gray-500 mt-2 leading-6">
                Enter your email address to reset your password
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Email */}
              <div>
                {error != "" && (
                  <p className="text-red-500 text-sm sm:text-base break-words">
                    {error}
                  </p>
                )}

                {msg != "" && (
                  <p className="text-blue-600 text-sm sm:text-base break-words">
                    {msg}
                  </p>
                )}

                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2 mt-3"
                >
                  Email Address
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={buttonLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {buttonLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            {/* Back to Login */}
            <div className="text-center mt-5 sm:mt-6">
              <a
                href="/login"
                className="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium"
              >
                Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
