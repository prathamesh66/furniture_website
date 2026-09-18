"use client";

import { useState } from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import axios from "axios";

export default function ForgotPassword() {

  let APIBASEURL = process.env.NEXT_PUBLIC_APIBASEPATH


  let [error, setError] = useState('')
  let [msg, setMsg] = useState('')

  let [buttonLoading,setButtonLoading] = useState(false)


  const handleSubmit = (e) => {

        setError("");

        setMsg("");


    setButtonLoading(true)

    e.preventDefault();


    let obj = {
      
      email: e.target.email.value
    }

    axios.post(`${APIBASEURL}user/forgotPassword`,obj)
    .then((res)=>res.data)
    .then((finalRes)=> {
      if(finalRes._status) {
        setButtonLoading(false);

        e.target.reset()

        setMsg(finalRes._message)
      }
      else {
        setError(finalRes._message);
      }
    })

    

  };

  return (
    <section>
      {/* Breadcrumb */}
      <div>
        <Breadcrumb title={"Forgot Password"} />
      </div>

      {/* Main Container */}
      <div className="max-w-[1320px] mx-auto py-[20px] px-4">
        <hr className="text-[#ccc]" />

        <div className="flex items-center py-[30px] justify-center">
          <div className="w-full max-w-md bg-white border-1 border-[#ccc] rounded-xl shadow-lg p-8">
            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Forgot Password
              </h1>

              <p className="text-gray-500 mt-2">
                Enter your email address to reset your password
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                {error != "" && <p className="text-red-500">{error}</p>}

                {msg != "" && <p className="text-blue-600">{msg}</p>}

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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={buttonLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
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
            <div className="text-center mt-6">
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
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
