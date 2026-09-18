"use client"

import React, { useEffect, useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { FaCloudUploadAlt, FaMobile } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";

const Profile = () => {

    // let pageTitle = "profile"


    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Submitted");
    };


  const [activeTab, setActiveTab] = useState("editProfile");


    useEffect(() => {
      $(".dropify").dropify({
        messages: {
          default: "Profile",
          replace: "Drag and drop ",  
          remove: "Remove",
          error: "Oops, something went wrong",
        },
      });
    }, [activeTab]);

  return (
    <section className="w-full">
      <div>
        <Breadcrumb path={"profile"} link={"/profile"} />
      </div>

      <div className="p-5 bg-[#F1F4F5] flex gap-[2%] items-start ">
        <div className="basis-[30%] self-start shadow-lg overflow-hidden  rounded-lg ">
          <div className="bg-[#FFFFFF] h-[200px] flex justify-center items-center ">
            <div>
              <img
                className="w-[90px] h-[90px] rounded-full border-1"
                src="/images/pexels-photo-2379005.jpg"
                alt=""
              />
              <h2 className="text-center mt-2">Admin</h2>
            </div>
          </div>
          <div className="bg-[#F6F9FD] p-3">
            <h2>Contact Information</h2>
            <div className="flex items-center gap-3 mt-3">
              <p>
                <FaMobile />
              </p>
              <p>1234567890</p>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <p>
                <IoIosMail />
              </p>
              <p>xyz@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="basis-[65%] rounded-lg shadow-lg bg-white  p-5">
          <div className="flex items-center gap-8">
            <div
              className={`text-[20px] font-semibold text-[#696565] cursor-pointer ${
                activeTab === "editProfile"
                  ? "border-b-4 border-purple-700 text-purple-700"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("editProfile")}
            >
              Edit Profile
            </div>

            <div
              className={`text-[20px] font-semibold text-[#696565] cursor-pointer ${
                activeTab === "changePassword"
                  ? "border-b-4 border-purple-700 text-purple-700"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("changePassword")}
            >
              Change Password
            </div>
          </div>

          {/* This is for the editProfile */}
          {activeTab === "editProfile" && (
            <form onSubmit={handleSubmit}>
              <div className="flex gap-[4%] mt-[30px]">
                {/* Left Side */}
                <div className="basis-[35%]">
                  <label className="">Choose Image</label>

                  <input
                    type="file"
                    accept="image/*"
                    className="dropify"
                    data-height="236"
                  />
                </div>

                {/* Right Side */}
                <div className="basis-[60%]">
                  <div className="flex flex-col">
                    <label>Name</label>
                    <input
                      className="px-3 py-2 border border-[#ccc] rounded-lg mt-[10px]"
                      type="text"
                      placeholder="Enter Name"
                      required
                    />
                  </div>

                  <div className="flex flex-col mt-[15px]">
                    <label>Email</label>
                    <input
                      className="px-3 py-2 border border-[#ccc] rounded-lg mt-[10px]"
                      type="email"
                      placeholder="Enter Email"
                      required
                    />
                  </div>

                  <div className="flex flex-col mt-[15px]">
                    <label>Mobile Number</label>
                    <input
                      className="px-3 py-2 border border-[#ccc] rounded-lg mt-[10px]"
                      type="number"
                      placeholder="Enter Number"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#7E22CE] mt-[20px] text-white p-3 rounded-lg"
              >
                Update Profile
              </button>
            </form>
          )}

          {/* This is for the changePassword */}
          {activeTab === "changePassword" && (
            <form onSubmit={handleSubmit}>
              <div className=" mt-[30px]">
                {/* Right Side */}
                <div className="">
                  <div className="flex flex-col">
                    <label>Current Password</label>
                    <input
                      className="px-3 py-2 border border-[#ccc] rounded-lg mt-[10px]"
                      type="text"
                      placeholder="Current Password"
                      required
                    />
                  </div>

                  <div className="flex flex-col mt-[15px]">
                    <label>New Password</label>
                    <input
                      className="px-3 py-2 border border-[#ccc] rounded-lg mt-[10px]"
                      type="email"
                      placeholder="New Password"
                      required
                    />
                  </div>

                  <div className="flex flex-col mt-[15px]">
                    <label>Confirm Password</label>
                    <input
                      className="px-3 py-2 border border-[#ccc] rounded-lg mt-[10px]"
                      type="number"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#7E22CE] mt-[20px] text-white p-3 rounded-lg"
              >
                Change Password
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile
