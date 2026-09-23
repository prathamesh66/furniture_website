"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Login_register } from "../redux/loginSlice";

const LoginRegister = () => {
  const userLogin = useSelector((data) => {
    return data.login.userLogin;
  });

  const dispatch = useDispatch();

  const navigate = useRouter();

  // useEffect(()=>{

  //   if(userLogin==1){
  //       navigate.push("/");
  //   }

  // },[])

  let APIBASEURL = process.env.NEXT_PUBLIC_APIBASEPATH;

  let handleRegister = (e) => {
    e.preventDefault();

    let obj = {
      name: e.target.name.value,
      email: e.target.email.value,
      mobile_number: e.target.mobile_number.value,
      address: e.target.address.value,
      password: e.target.password.value,
    };

    axios
      .post(`${APIBASEURL}user/create`, obj)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes);

        if (finalRes._status) {
          e.target.reset();
          toast.success(finalRes._message);
          Cookies.set("user_login", finalRes.token);
          dispatch(Login_register(1));
          navigate.push("/dashboard");
        } else {
          finalRes.errors.forEach((errorObj) => {
            Object.values(errorObj).forEach((errorMessage) => {
              toast.error(errorMessage);
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      });
  };

  let handleLogin = (e) => {
    e.preventDefault();

    let userObj = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log("APIBASEURL:", APIBASEURL);
    console.log("LOGIN URL:", `${APIBASEURL}user/login`);
    console.log("USER DATA:", userObj);

    axios
      .post(`${APIBASEURL}user/login`, userObj)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
          e.target.reset();
          toast.success(finalRes._message);
          Cookies.set("user_login", finalRes.token);
          dispatch(Login_register(1));
          setTimeout(() => {
            navigate.push("/dashboard");
          }, 2000);
        } else {
          toast.error(finalRes._message || "Invalid email or password");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      <section className="w-full py-3">
        <div>
          <Breadcrumb title={"My Account"} />
        </div>

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <ToastContainer />

          <hr className="text-[#ccc]" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-5 mt-6 sm:mt-8 lg:mt-10">
            <div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-[25px] font-semibold">
                  Login
                </h2>

                <div className="mt-4 sm:mt-5 py-4 sm:py-3 px-4 sm:px-5 border rounded-lg border-[#ccc]">
                  <form action="" onSubmit={handleLogin}>
                    <div className="flex flex-col">
                      <label htmlFor="">Email *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="mt-2 sm:mt-3 p-2 sm:p-2.5 border border-[#ccc] rounded-lg w-full"
                      />
                    </div>

                    <div className="flex flex-col mt-4 sm:mt-5">
                      <label htmlFor="">Password *</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="mt-2 sm:mt-3 p-2 sm:p-2.5 border border-[#ccc] rounded-lg w-full"
                      />
                    </div>

                    <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <Link href={"/forgot-password"}>
                        <button
                          type="button"
                          className="text-[#c99471] cursor-pointer text-left"
                        >
                          Forgot Your Password?
                        </button>
                      </Link>

                      <button
                        type="submit"
                        className="border py-2 px-6 rounded-4xl border-[#ccc] text-white bg-[#c99471] cursor-pointer hover:bg-black w-full sm:w-auto"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-[25px] font-semibold">
                  Register
                </h2>

                <div className="mt-4 sm:mt-5 py-4 sm:py-3 px-4 sm:px-5 border rounded-lg border-[#ccc]">
                  <form onSubmit={handleRegister}>
                    <div className="flex flex-col">
                      <label htmlFor="">Name *</label>
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        className="mt-2 sm:mt-3 p-2 sm:p-2.5 border border-[#ccc] rounded-lg w-full"
                      />
                    </div>

                    <div className="flex flex-col mt-4 sm:mt-5">
                      <label htmlFor="">Email *</label>
                      <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        className="mt-2 sm:mt-3 p-2 sm:p-2.5 border border-[#ccc] rounded-lg w-full"
                      />
                    </div>

                    <div className="flex flex-col mt-4 sm:mt-5">
                      <label htmlFor="">Mobile Number *</label>
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        name="mobile_number"
                        className="mt-2 sm:mt-3 p-2 sm:p-2.5 border border-[#ccc] rounded-lg w-full"
                      />
                    </div>

                    <div className="flex flex-col mt-4 sm:mt-5">
                      <label htmlFor="">Address *</label>
                      <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        className="mt-2 sm:mt-3 p-2 sm:p-2.5 border border-[#ccc] rounded-lg w-full"
                      />
                    </div>

                    <div className="flex flex-col mt-4 sm:mt-5">
                      <label htmlFor="">Password *</label>
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="mt-2 sm:mt-3 p-2 sm:p-2.5 border border-[#ccc] rounded-lg w-full"
                      />
                    </div>

                    <div className="mt-4 sm:mt-5 flex justify-end">
                      <button
                        type="submit"
                        className="border py-2 px-6 rounded-4xl border-[#ccc] text-white bg-[#c99471] cursor-pointer hover:bg-black w-full sm:w-auto"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginRegister;
