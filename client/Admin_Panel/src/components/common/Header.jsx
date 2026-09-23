
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RiProfileLine } from "react-icons/ri";
import { IoBagSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState(null);

  // ==============================
  // GET ADMIN PROFILE
  // ==============================

  const getAdminProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/admin/account/profile",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("admin_login")}`,
          },
        },
      );

      console.log("HEADER ADMIN PROFILE:", response.data);

      if (response.data._status) {
        setAdminData(response.data.adminData);
      }
    } catch (error) {
      console.log("HEADER ADMIN PROFILE ERROR:", error);
    }
  };

  useEffect(() => {
    getAdminProfile();
  }, []);

  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {
    Cookies.remove("admin_login");
    localStorage.removeItem("adminData");

    navigate("/");
  };

  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center">

          {/* ==============================
              LEFT SIDE
          ============================== */}

          <div className="flex items-center gap-5">
            <span>
              <svg
                fill="currentColor"
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288C14.3 288 0 273.7 0 256zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32-14.3 32-32z"></path>
              </svg>
            </span>

            <p className="font-semibold text-[25px] text-[#64748B]">
              Dashboard
            </p>
          </div>

          {/* ==============================
              PROFILE
          ============================== */}

          <div>
            <div className="group relative">

              {/* PROFILE IMAGE */}

              <img
                className="w-[90px] h-[90px] rounded-full border object-cover"
                src={
                  adminData?.profileImage
                    ? `http://localhost:8000/uploads/admin/${adminData.profileImage}`
                    : "/images/pexels-photo-2379005.jpg"
                }
                alt="Admin"
              />

              {/* ==============================
                  DROPDOWN
              ============================== */}

              <div className="hidden bg-white group-hover:block absolute top-[50px] left-[-140px] border border-[#ccccccad] rounded-sm shadow-md z-50">

                {/* Profile */}

                <Link to="/profile">
                  <div className="flex items-center gap-2 font-semibold pb-1 hover:text-blue-500 px-2 py-2 hover:bg-[#cccccc5c] cursor-pointer">
                    <p>
                      <CgProfile />
                    </p>

                    <p>Profile</p>
                  </div>
                </Link>

                <hr className="text-[#ccc]" />

                {/* Company Profile */}

                <Link to="/company-profile">
                  <div className="flex items-center gap-2 font-semibold pb-2 hover:text-blue-500 px-2 py-2 hover:bg-[#cccccc5c] cursor-pointer">
                    <p>
                      <RiProfileLine />
                    </p>

                    <p>Company Profile</p>
                  </div>
                </Link>

                <hr className="text-[#ccc]" />

                {/* Logout */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 font-semibold px-2 py-2 hover:text-red-500 hover:bg-[#cccccc5c] cursor-pointer text-left"
                >
                  <p>
                    <IoBagSharp />
                  </p>

                  <p>Logout</p>
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Header;

