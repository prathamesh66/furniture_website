
"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import { FaMobile } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";

const Profile = () => {

  const APIBASEURL = import.meta.env.VITE_APIBASEURL;
  const BACKENDURL = APIBASEURL.replace("/admin/", "");

  const [activeTab, setActiveTab] = useState("editProfile");

  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Selected profile image
  const [selectedImage, setSelectedImage] = useState(null);

  // Change Password States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ==============================
  // GET ADMIN PROFILE
  // ==============================

  const getAdminProfile = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${APIBASEURL}account/profile`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("admin_login")}`,
        },
      });

      console.log("ADMIN PROFILE RESPONSE:", response.data);

      if (response.data._status) {
        setAdminData(response.data.adminData);
      } else {
        console.log(response.data._message);
      }
    } catch (error) {
      console.log("ADMIN PROFILE ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminProfile();
  }, []);

  // ==============================
  // DROPIFY
  // ==============================

  useEffect(() => {
    $(".dropify").dropify({
      messages: {
        default: "Profile",
        replace: "Drag and drop",
        remove: "Remove",
        error: "Oops, something went wrong",
      },
    });
  }, [activeTab]);

  // ==============================
  // UPDATE ADMIN PROFILE
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", adminData.name);
      formData.append("email", adminData.email);
      formData.append("mobile_number", adminData.mobile_number);

      // Add image only if selected
      if (selectedImage) {
        formData.append("profileImage", selectedImage);
      }

      const response = await axios.put(
        `${APIBASEURL}account/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("admin_login")}`,
          },
        },
      );

      console.log("UPDATE ADMIN PROFILE RESPONSE:", response.data);

      if (response.data._status) {
        setAdminData(response.data.adminData);
        setSelectedImage(null);

        alert(response.data._message);
      } else {
        alert(response.data._message);
      }
    } catch (error) {
      console.log("UPDATE ADMIN PROFILE ERROR:", error);

      if (error.response) {
        console.log("SERVER ERROR:", error.response.data);
      }

      alert("Something went wrong");
    }
  };

  // ==============================
  // CHANGE ADMIN PASSWORD
  // ==============================

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${APIBASEURL}account/change-password`,
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("admin_login")}`,
          },
        },
      );

      console.log(
        "CHANGE PASSWORD RESPONSE:",
        response.data,
      );

      if (response.data._status) {
        alert(response.data._message);

        // Clear password fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(response.data._message);
      }
    } catch (error) {
      console.log("CHANGE PASSWORD ERROR:", error);

      if (error.response) {
        console.log("SERVER ERROR:", error.response.data);
      }

      alert("Something went wrong");
    }
  };

  return (
    <section className="w-full">
      <div>
        <Breadcrumb path={"profile"} link={"/profile"} />
      </div>

      <div className="p-5 bg-[#F1F4F5] flex gap-[2%] items-start">
        {/* ==============================
            LEFT PROFILE CARD
        ============================== */}

        <div className="basis-[30%] self-start shadow-lg overflow-hidden rounded-lg">
          <div className="bg-[#FFFFFF] h-[200px] flex justify-center items-center">
            <div>
              <img
                className="w-[90px] h-[90px] rounded-full border object-cover"
                src={
                  adminData?.profileImage
                    ? `${BACKENDURL}/uploads/admin/${adminData.profileImage}`
                    : "/images/pexels-photo-2379005.jpg"
                }
                alt="Admin"
              />

              <h2 className="text-center mt-2">
                {loading ? "Loading..." : adminData?.name}
              </h2>
            </div>
          </div>

          <div className="bg-[#F6F9FD] p-3">
            <h2>Contact Information</h2>

            <div className="flex items-center gap-3 mt-3">
              <p>
                <FaMobile />
              </p>

              <p>{loading ? "Loading..." : adminData?.mobile_number}</p>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <p>
                <IoIosMail />
              </p>

              <p>{loading ? "Loading..." : adminData?.email}</p>
            </div>
          </div>
        </div>

        {/* ==============================
            RIGHT SIDE
        ============================== */}

        <div className="basis-[65%] rounded-lg shadow-lg bg-white p-5">
          {/* ==============================
              TABS
          ============================== */}

          <div className="flex items-center gap-8">
            <div
              className={`text-[20px] font-semibold cursor-pointer ${
                activeTab === "editProfile"
                  ? "border-b-4 border-purple-700 text-purple-700"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("editProfile")}
            >
              Edit Profile
            </div>

            <div
              className={`text-[20px] font-semibold cursor-pointer ${
                activeTab === "changePassword"
                  ? "border-b-4 border-purple-700 text-purple-700"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("changePassword")}
            >
              Change Password
            </div>
          </div>

          {/* ==============================
              EDIT PROFILE
          ============================== */}

          {activeTab === "editProfile" && (
            <form onSubmit={handleSubmit}>
              <div className="flex gap-[4%] mt-[30px]">
                {/* IMAGE */}

                <div className="basis-[35%]">
                  <label>Choose Image</label>

                  <input
                    type="file"
                    accept="image/*"
                    className="dropify"
                    data-height="236"
                    onChange={(e) => {
                      setSelectedImage(e.target.files[0]);
                    }}
                  />
                </div>

                {/* DETAILS */}

                <div className="basis-[60%]">
                  {/* NAME */}

                  <div className="flex flex-col">
                    <label>Name</label>

                    <input
                      className="px-3 py-2 border border-[#ccc] rounded-lg mt-[10px]"
                      type="text"
                      placeholder="Enter Name"
                      value={adminData?.name || ""}
                      onChange={(e) =>
                        setAdminData({
                          ...adminData,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* EMAIL */}

                  <div className="flex flex-col mt-[15px]">
                    <label>Email</label>

                    <input
                      className="px-3 py-2 border border-[#ccc] rounded-lg mt-[10px]"
                      type="email"
                      placeholder="Enter Email"
                      value={adminData?.email || ""}
                      onChange={(e) =>
                        setAdminData({
                          ...adminData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* MOBILE NUMBER */}

                  <div className="flex flex-col mt-[15px]">
                    <label>Mobile Number</label>

                    <input
                      className="px-3 py-2 border border-[#ccc] rounded-lg mt-[10px]"
                      type="text"
                      placeholder="Enter Number"
                      value={adminData?.mobile_number || ""}
                      onChange={(e) =>
                        setAdminData({
                          ...adminData,
                          mobile_number: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* UPDATE BUTTON */}

              <button
                type="submit"
                className="bg-[#7E22CE] mt-[20px] text-white p-3 rounded-lg"
              >
                Update Profile
              </button>
            </form>
          )}

          {/* ==============================
              CHANGE PASSWORD
          ============================== */}

          {activeTab === "changePassword" && (
            <form onSubmit={handleChangePassword}>
              <div className="mt-[30px]">
                {/* CURRENT PASSWORD */}

                <div className="flex flex-col">
                  <label>Current Password</label>

                  <input
                    className="px-3 py-2 border border-[#ccc] rounded-lg mt-[10px]"
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>

                {/* NEW PASSWORD */}

                <div className="flex flex-col mt-[15px]">
                  <label>New Password</label>

                  <input
                    className="px-3 py-2 border border-[#ccc] rounded-lg mt-[10px]"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                {/* CONFIRM PASSWORD */}

                <div className="flex flex-col mt-[15px]">
                  <label>Confirm Password</label>

                  <input
                    className="px-3 py-2 border border-[#ccc] rounded-lg mt-[10px]"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* CHANGE PASSWORD BUTTON */}

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
};

export default Profile;

