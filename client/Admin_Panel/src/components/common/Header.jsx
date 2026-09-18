import { CgProfile } from "react-icons/cg";
import { RiProfileLine } from "react-icons/ri";
import { IoBagSharp } from "react-icons/io5";
import Profile from "../pages/Profile";
import { Link } from "react-router";


const Header = () => {
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <span>
              <svg
                fill="currentColor"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[25px] text-[#64748B]">
              Dashboard
            </p>
          </div>

          {/* this div for the image */}
          <div>
            <div className="group relative">
              <img
                className="w-[50px] h-[50px] group rounded-full object-fit-cover "
                src="/images/pexels-photo-2379005.jpg"
                alt=""
              />

              <div className="hidden bg-[#fff] group-hover:block absolute top-[50px] left-[-140px] border-1 border-[#ccccccad] rounded-sm">
                <Link to={"/profile"}>
                  <div className="flex items-center gap-2 font-semibold pb-1 hover:text-blue-500 px-2 py-1 hover:bg-[#cccccc5c] cursor-pointer">
                    <p>
                      <CgProfile />
                    </p>
                    <p>Profile</p>
                  </div>
                </Link>

                <hr className="text-[#ccc]" />

                <Link to={"/company-profile"}>
                  <div className="flex items-center gap-2 font-semibold pb-2 hover:text-blue-500 px-2 py-1 hover:bg-[#cccccc5c]  cursor-pointer">
                    <p>
                      <RiProfileLine />
                    </p>
                    <p>Company Profile</p>
                  </div>
                </Link>

                <hr className="text-[#383636]" />

                <div className="flex px-2 py-1 items-center gap-2 font-semibold hover:text-blue-500 hover:bg-[#cccccc5c]  cursor-pointer">
                  <p>
                    <IoBagSharp />
                  </p>
                  <p>Logout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

// import React from "react";
// import { Link } from "react-router-dom";
// import { RiProfileFill } from "react-icons/ri";

// const Header = () => {
//   return (
//     <>
//       <div className="p-5 border-b">
//         <div className="flex justify-between items-center">
//           {/* Left Side */}
//           <div className="flex items-center gap-5">
//             <span>
//               <svg
//                 fill="currentColor"
//                 className="w-5 h-5 text-gray-500"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 448 512"
//               >
//                 <path d="M0 96C0 78.3 14.3 64 32 64h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z" />
//               </svg>
//             </span>

//             <p className="font-semibold text-[25px] text-[#64748B]">
//               Dashboard
//             </p>
//           </div>

//           {/* Profile Section */}
//           <div className="relative group">
//             <img
//               className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer"
//               src="/images/pexels-photo-2379005.jpg"
//               alt="profile"
//             />

//             {/* Dropdown */}
//             <div className="absolute right-0 top-full w-48 bg-white shadow-lg rounded-lg hidden group-hover:block z-50">
//               <Link
//                 to="/profile"
//                 className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 border-b"
//               >
//                 Profile
//               </Link>

//               <Link
//                 to="/company-profile"
//                 className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 border-b"
//               >
//                 <RiProfileFill />
//                 Company Profile
//               </Link>

//               <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;
