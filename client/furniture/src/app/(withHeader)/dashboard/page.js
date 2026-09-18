"use client";

import { useDebugValue, useEffect, useState } from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { Login_register } from "../redux/loginSlice";
import { useDispatch } from "react-redux";

export default function MyDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");


  const [userProfile,setUserProfile] = useState('')

  const [selectedTitle,setSelectedTitle] = useState('')

  const router = useRouter();

  const dispatch = useDispatch()

  let APIBASEURL = process.env.NEXT_PUBLIC_APIBASEPATH;


  // useEffect(()=> {

  //   axios.post(
  //     `${APIBASEURL}user/viewProfile`,
  //     {},
  //     {
  //       headers: {
  //         Authorization: `Bearer ${Cookies.get('user_login')}`,
  //       },
  //     },
  //   )
  //   .then((res)=> res.data)
  //   .then((finalRes)=> {
  //      if (finalRes._status) {
  //        // toast.success(finalRes._message);
  //        console.log("USER PROFILE:", userProfile);  // this is not runs 
  //        setUserProfile(finalRes._userProfile);
  //        setSelectedTitle(finalRes._userProfile.gender);
  //      } else {
  //        console.log("What is this ",finalRes._message); // this  gives the no user found
  //      }
  //   })
  //   .catch(()=> {
  //     toast.error("Something Went Wrong");
  //   })
    

  // },[])


useEffect(() => {
  axios
    .post(
      `${APIBASEURL}user/viewProfile`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_login")}`,
        },
      },
    )
    .then((res) => {
      console.log("VIEW PROFILE RESPONSE:", res.data);

      if (res.data._status) {
        setUserProfile(res.data._userProfile);
        setSelectedTitle(res.data._userProfile.gender);
      } else {
        console.log("PROFILE ERROR:", res.data._message);
      }
    })
    .catch((error) => {
      console.log("PROFILE API ERROR:", error);
    });
}, []);

  let handleUpdateProfile = (e) => {

    e.preventDefault()


    axios
      .post(`${APIBASEURL}user/updateProfile`, e.target, {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_login")}`,
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
          toast.success(finalRes._message);
        } else {
          toast.error(finalRes._message);
        }
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      });

  }



  // let handleChangePassword = (e) => {
  //   e.preventDefault();
  //    console.log("COOKIE TOKEN:", Cookies.get("user_login"));

  //   axios
  //     .post(`${APIBASEURL}user/changePassword`, e.target, {
  //       headers: {
  //         Authorization: `Bearer ${Cookies.get("user_login")}`,
  //       },
  //     })
  //     .then((res) => res.data)
  //     .then((finalRes) => {
  //       if (finalRes._status) {
  //         toast.success(finalRes._message);

  //         e.target.reset();
  //       } else {
  //         toast.error(finalRes._message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("CHANGE PASSWORD ERROR:", error);
  //       toast.error("Something Went Wrong");
  //     });
  // };

let handleChangePassword = (e) => {
  e.preventDefault();

  let data = {
    oldPassword: e.target.oldPassword.value,
    newPassword: e.target.newPassword.value,
    confirmPassword: e.target.confirmPassword.value,
  };

  axios
    .post(`${APIBASEURL}user/changePassword`, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("user_login")}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .then((finalRes) => {
      if (finalRes._status) {
        toast.success(finalRes._message);
        e.target.reset();
      } else {
        toast.error(finalRes._message);
      }
    })
    .catch((error) => {
      console.log("CHANGE PASSWORD ERROR:", error);
      toast.error("Something Went Wrong");
    });
};



let handleLogout = () => {
  Cookies.remove("user_login");

  dispatch(Login_register(0));

  router.push("/login-register");
};
  
  return (
    <section>
      <div>
        <Breadcrumb title={"My Dashboard"} />
      </div>

      <div className=" w-[1320px] mx-auto">
        <ToastContainer />
        <hr className="text-[#ccc]" />

        <div className="flex mt-5 gap-[3%]">
          {/* ================= LEFT SIDEBAR ================= */}
          <aside className="w-[25%]">
            <nav>
              <button
                onClick={() => setActiveSection("dashboard")}
                className={`w-full text-left px-6 py-3 mt-2 rounded-sm cursor-pointer ${
                  activeSection === "dashboard"
                    ? "text-white bg-[#C09578]"
                    : "hover:bg-[#C09578] bg-black text-white"
                }`}
              >
                My Dashboard
              </button>

              <button
                onClick={() => setActiveSection("orders")}
                className={`w-full text-left px-6 py-3 mt-2 rounded-sm cursor-pointer ${
                  activeSection === "orders"
                    ? "text-white bg-[#C09578]"
                    : "hover:bg-[#C09578] bg-black text-white"
                }`}
              >
                Orders
              </button>

              <button
                onClick={() => setActiveSection("addresses")}
                className={`w-full text-left px-6 py-3 mt-2 rounded-sm cursor-pointer ${
                  activeSection === "addresses"
                    ? "text-white bg-[#C09578]"
                    : "hover:bg-[#C09578] bg-black text-white"
                }`}
              >
                Address
              </button>

              <button
                onClick={() => setActiveSection("profile")}
                className={`w-full text-left px-6 py-3 mt-2 rounded-sm cursor-pointer ${
                  activeSection === "profile"
                    ? "text-white bg-[#C09578]"
                    : "hover:bg-[#C09578] bg-black text-white"
                }`}
              >
                Profile
              </button>

              <button
                onClick={() => setActiveSection("password")}
                className={`w-full text-left px-6 py-3 mt-2 rounded-sm cursor-pointer ${
                  activeSection === "password"
                    ? "text-white bg-[#C09578]"
                    : "hover:bg-[#C09578] bg-black text-white"
                }`}
              >
                Change Password
              </button>

              <button
                onClick={() => console.log("Logout")}
                className="w-full text-left px-6 py-3 mt-2 rounded-sm cursor-pointer text-white bg-black hover:bg-[#C09578]"
              >
                {/* Logout */}
                {/* Logout  */}
                <div onClick={handleLogout} className="cursor-pointer">
                  Logout
                </div>
              </button>
            </nav>
          </aside>

          {/* ================= RIGHT CONTENT ================= */}
          <main className="flex-1 p-2">
            {/* DASHBOARD */}
            {activeSection === "dashboard" && (
              <div>
                <h1 className="text-[20px] font-semibold mb-6">My Dashboard</h1>

                <div className="grid grid-cols-3 gap-5">
                  <div className="bg-white p-6 rounded-lg">
                    <h3>Total Orders</h3>
                    <p className="text-3xl font-bold">10</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg">
                    <h3>Pending Orders</h3>
                    <p className="text-3xl font-bold">2</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg">
                    <h3>Completed Orders</h3>
                    <p className="text-3xl font-bold">8</p>
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS */}
            {activeSection === "orders" && (
              <div>
                <h1 className="text-3xl font-semibold mb-6">Orders</h1>

                <div className=" rounded-lg p-2">
                  <table className="w-full box-border">
                    <thead>
                      <tr className="border-b bg-[#F2F2F2]">
                        <th className="text-center py-3 font-normal border-l border-[#ccc]">
                          Order ID
                        </th>
                        <th className="text-center py-3 font-normal">Date</th>
                        <th className="text-center py-3 font-normal">Amount</th>
                        <th className="text-center py-3 font-normal">Status</th>
                        <th className="text-center py-3 font-normal border-r border-[#ccc]">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-b border-[#ccc]">
                        <td className=" text-center py-3 border-l border-r  border-[#ccc]">
                          1
                        </td>
                        <td className=" text-center py-3 border-r   border-[#ccc]">
                          09 Sep 2026
                        </td>
                        <td className=" text-center py-3 border-r   border-[#ccc]">
                          ₹5,000
                        </td>
                        <td className=" text-center py-3 border-r   border-[#ccc]">
                          Completed
                        </td>
                        <td className="text-[#C09578] border-r   border-[#ccc] py-3 text-center">
                          View
                        </td>
                      </tr>

                      <tr className="border-b border-[#ccc]">
                        <td className=" text-center py-3 border-l border-r  border-[#ccc]">
                          1
                        </td>
                        <td className=" text-center py-3 border-r   border-[#ccc]">
                          09 Sep 2026
                        </td>
                        <td className=" text-center py-3 border-r   border-[#ccc]">
                          ₹5,000
                        </td>
                        <td className=" text-center py-3 border-r   border-[#ccc]">
                          Completed
                        </td>
                        <td className="text-[#C09578] border-r   border-[#ccc] py-3 text-center">
                          View
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Address */}
            {activeSection === "addresses" && (
              <div>
                <h1 className="text-[16px] font-normal mb-6">
                  The following addresses will be used on the checkout page by
                  default.
                </h1>

                <div className="flex gap-[3%]">
                  {/* left side form  */}

                  <form className="w-[48%]">
                    <h2 className="font-normal text-[20px]">Billing Address</h2>

                    <div className="border rounded-sm border-[#ccc] mt-2">
                      <div className="px-5 mt-5">
                        <label
                          htmlFor=""
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Billing Name*
                        </label>
                        <input
                          type="text"
                          // placeholder="Name"
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                        />
                      </div>

                      <div className="px-5 mt-5">
                        <label
                          htmlFor=""
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Billing Email*
                        </label>
                        <input
                          type="text"
                          // placeholder="Name"
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                        />
                      </div>

                      <div className="px-5 mt-5">
                        <label
                          htmlFor=""
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Billing Mobile Number*
                        </label>
                        <input
                          type="number"
                          // placeholder="Name"
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                        />
                      </div>

                      <div className="px-5 mt-5">
                        <label
                          htmlFor=""
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Billing Address*
                        </label>
                        <input
                          type="text"
                          // placeholder="Name"
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                        />
                      </div>

                      <div className="px-5 mt-5">
                        <label
                          htmlFor=""
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Country*
                        </label>
                        <br />
                        <select
                          name="country"
                          id="country"
                          className="border border-[#ccc] p-2 rounded-sm mt-2"
                        >
                          <option value="">Select Country</option>
                          <option value="India">India</option>
                          <option value="USA">USA</option>
                          <option value="UK">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>

                      <div className="px-5 mt-5">
                        <label
                          htmlFor=""
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          State*
                        </label>
                        <input
                          type="text"
                          // placeholder="Name"
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                        />
                      </div>

                      <div className="px-5 mt-5">
                        <label
                          htmlFor=""
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          City*
                        </label>
                        <input
                          type="text"
                          // placeholder="Name"
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                        />
                      </div>

                      <div className="px-5 mt-5 flex justify-end">
                        <button className="border border-[#ccc] rounded-lg py-1 px-5 text-white bg-[#C09578] hover:bg-black cursor-pointer mb-5 ">
                          Update
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* right side form  */}

                  <div className="w-[48%]">
                    <h2 className="font-normal text-[20px]">
                      Shipping Address
                    </h2>

                    <form className="border rounded-sm border-[#ccc] mt-2">
                      <div className="px-5 mt-5">
                        <label
                          htmlFor=""
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Shipping Name*
                        </label>
                        <input
                          type="text"
                          // placeholder="Name"
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                        />
                      </div>

                      <div className="px-5 mt-5">
                        <label
                          htmlFor=""
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Shipping Email*
                        </label>
                        <input
                          type="email"
                          // placeholder="Name"
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                        />
                      </div>

                      <div className="px-5 mt-5">
                        <label
                          htmlFor=""
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Shipping Mobile Number*
                        </label>
                        <input
                          type="number"
                          // placeholder="Name"
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                        />
                      </div>

                      <div className="px-5 mt-5">
                        <label
                          htmlFor=""
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Shipping Address*
                        </label>
                        <input
                          type="text"
                          // placeholder="Name"
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                        />
                      </div>

                      <div className="px-5 mt-5">
                        <label
                          htmlFor=""
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          Country*
                        </label>
                        <br />
                        <select
                          name="country"
                          id="country"
                          className="border border-[#ccc] p-2 rounded-sm mt-2"
                        >
                          <option value="">Select Country</option>
                          <option value="India">India</option>
                          <option value="USA">USA</option>
                          <option value="UK">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>

                      <div className="px-5 mt-5">
                        <label
                          htmlFor=""
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          State*
                        </label>
                        <input
                          type="text"
                          // placeholder="Name"
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                        />
                      </div>

                      <div className="px-5 mt-5">
                        <label
                          htmlFor=""
                          className="hover:text-[#C09578] cursor-pointer"
                        >
                          City*
                        </label>
                        <input
                          type="text"
                          // placeholder="Name"
                          className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                        />
                      </div>

                      <div className="px-5 mt-5 flex justify-end">
                        <button className="border border-[#ccc] rounded-lg py-1 px-5 text-white bg-[#C09578] hover:bg-black cursor-pointer mb-5 ">
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE */}
            {activeSection === "profile" && (
              <div>
                <h1 className="text-[20px] font-semibold mb-6">Profile</h1>

                <form
                  onSubmit={handleUpdateProfile}
                  className="border rounded-sm border-[#ccc] mt-2"
                >
                  {/* Gender */}
                  <div className="px-5 mt-5 flex">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="1"
                        checked={selectedTitle === "1"}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                      />

                      <label htmlFor="male" className="ml-2">
                        Male
                      </label>
                    </div>

                    <div className="flex items-center ml-4">
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="2"
                        checked={selectedTitle === "2"}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                      />

                      <label htmlFor="female" className="ml-2">
                        Female
                      </label>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="px-5 mt-5">
                    <label
                      htmlFor="name"
                      className="hover:text-[#C09578] cursor-pointer"
                    >
                      Name*
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      defaultValue={userProfile?.name || ""}
                      className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                    />
                  </div>

                  {/* Email */}
                  <div className="px-5 mt-5">
                    <label
                      htmlFor="email"
                      className="hover:text-[#C09578] cursor-pointer"
                    >
                      Email*
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      defaultValue={userProfile?.email || ""}
                      readOnly
                      className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                    />
                  </div>

                  {/* Mobile */}
                  <div className="px-5 mt-5">
                    <label
                      htmlFor="mobile_number"
                      className="hover:text-[#C09578] cursor-pointer"
                    >
                      Mobile Number*
                    </label>

                    <input
                      id="mobile_number"
                      type="text"
                      name="mobile_number"
                      defaultValue={userProfile?.mobile_number || ""}
                      className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                    />
                  </div>

                  {/* Address */}
                  <div className="px-5 mt-5">
                    <label
                      htmlFor="address"
                      className="hover:text-[#C09578] cursor-pointer"
                    >
                      Address*
                    </label>

                    <input
                      id="address"
                      type="text"
                      name="address"
                      defaultValue={userProfile?.address || ""}
                      className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                    />
                  </div>

                  {/* Button */}
                  <div className="px-5 mt-5 flex justify-end">
                    <button
                      type="submit"
                      className="border border-[#ccc] rounded-lg py-1 px-5 text-white bg-[#C09578] hover:bg-black cursor-pointer mb-5"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* CHANGE PASSWORD */}
            {activeSection === "password" && (
              <div>
                <h1 className="text-[20px] font-semibold mb-6">
                  Change Password
                </h1>

                <form
                  onSubmit={handleChangePassword}
                  className="border rounded-sm border-[#ccc] mt-2"
                >
                  {/* Current Password */}
                  <div className="px-5 mt-5">
                    <label
                      htmlFor="oldPassword"
                      className="hover:text-[#C09578] cursor-pointer"
                    >
                      Current Password
                    </label>

                    <input
                      id="oldPassword"
                      type="password"
                      name="oldPassword"
                      className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                    />
                  </div>

                  {/* New Password */}
                  <div className="px-5 mt-5">
                    <label
                      htmlFor="newPassword"
                      className="hover:text-[#C09578] cursor-pointer"
                    >
                      New Password
                    </label>

                    <input
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="px-5 mt-5">
                    <label
                      htmlFor="confirmPassword"
                      className="hover:text-[#C09578] cursor-pointer"
                    >
                      Confirm Password
                    </label>

                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      className="border p-2 w-full mt-2 rounded-sm border-[#ccc]"
                    />
                  </div>

                  <div className="px-5 mt-5 flex justify-end">
                    <button
                      type="submit"
                      className="border border-[#ccc] rounded-lg py-1 px-5 text-white bg-[#C09578] hover:bg-black cursor-pointer mb-5"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
