// import { RiDashboard2Fill } from "react-icons/ri";
// import { CiUser } from "react-icons/ci";
import { GrFormView } from "react-icons/gr";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router";

const Sidebar = () => {

    let [show,setShow] = useState (false)

    let [show2, setShow2] = useState(false);

    let [show3, setShow3] = useState(false);

    let [show4, setShow4] = useState(false);

    let [show5, setShow5] = useState(false);

    let [show6, setShow6] = useState(false);

    let [show7, setShow7] = useState(false);

    let [show8, setShow8] = useState(false);

    let [show9, setShow9] = useState(false);

    let [show10, setShow10] = useState(false);

    let [show11, setShow11] = useState(false);

    let [show12, setShow12] = useState(false);

    let [show13, setShow13] = useState(false);

    let [show14, setShow14] = useState(false);

  return (
    <>
      <div className=" bg-[#435165] p-3">
        <div className="p-2 border-b-1 border-white pb-6 ">
          <img
            className="mx-auto"
            src="/images/ws-cube-white-logo.svg"
            alt=""
          />
        </div>

        <Link to={"/dashboard"}>
          <div className="flex gap-4 items-center mt-5 pl-3 hover:bg-[#374151] p-2 rounded-lg cursor-pointer ">
            <span className="text-2xl text-[#ccc]">
              <svg
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"></path>
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">Dashboard</p>
          </div>
        </Link>

        {/* THis is Users */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow(!show)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 448 512"
                class="text-[20px]  "
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">Users</p>
            <span className="text-white text-[16px] absolute right-5">
              {show ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <Link to={"/user/view"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>View User</p>
            </div>
          </Link>
        </div>

        {/* THis is Enquirys */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow2(!show2)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                class="text-[20px]  "
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">Enquirys</p>
            <span className="text-white text-[16px] absolute right-5">
              {show2 ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <Link to={"/enquiry/contact-enquirys"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show2 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>Contact Enquirys</p>
            </div>
          </Link>
          <Link to={"/enquiry/newsletter"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show2 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>NewsLetters</p>
            </div>
          </Link>
        </div>

        {/* THis is colors */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow3(!show3)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                fill="currentColor"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0l1.8 0c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">Colors</p>
            <span className="text-white text-[16px] absolute right-5">
              {show3 ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <Link to={"/color/add"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show3 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>Add Color</p>
            </div>
          </Link>

          <Link to={"/color/view"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show3 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>View Color</p>
            </div>
          </Link>
        </div>

        {/* this is materials */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow4(!show4)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                fill="currentColor"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M200 32L56 32C42.7 32 32 42.7 32 56l0 144c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l40-40 79 79-79 79L73 295c-6.9-6.9-17.2-8.9-26.2-5.2S32 302.3 32 312l0 144c0 13.3 10.7 24 24 24l144 0c9.7 0 18.5-5.8 22.2-14.8s1.7-19.3-5.2-26.2l-40-40 79-79 79 79-40 40c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l144 0c13.3 0 24-10.7 24-24l0-144c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2l-40 40-79-79 79-79 40 40c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2l0-144c0-13.3-10.7-24-24-24L312 32c-9.7 0-18.5 5.8-22.2 14.8s-1.7 19.3 5.2 26.2l40 40-79 79-79-79 40-40c6.9-6.9 8.9-17.2 5.2-26.2S209.7 32 200 32z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">Materials</p>
            <span className="text-white text-[16px] absolute right-5">
              {show4 ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <Link to={"/material/add"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show4 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>Add Material</p>
            </div>
          </Link>
          <Link to={"/material/view"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show4 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>View Material</p>
            </div>
          </Link>
        </div>

        {/* Parent categorys */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow5(!show5)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                fill="currentColor"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L96 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">
              Parent Categorys
            </p>
            <span className="text-white text-[16px] ml-3 absolute right-5">
              {show5 ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <Link to={"/category/add"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show5 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>Add Category</p>
            </div>
          </Link>
          <Link to={"/category/view"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show5 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>View Category</p>
            </div>
          </Link>
        </div>

        {/* sub categorys */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow6(!show6)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                fill="currentColor"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L96 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">
              Sub Categorys
            </p>
            <span className="text-white text-[16px] absolute right-5">
              {show6 ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <Link to={"/sub-category/add"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show6 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>Add Sub Category</p>
            </div>
          </Link>
          <Link to={"/sub-category/view"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show6 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>View Sub Category</p>
            </div>
          </Link>
        </div>

        {/* sub sub categorys */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow7(!show7)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                fill="currentColor"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L96 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">
              Sub Sub Categorys
            </p>
            <span className="text-white text-[16px] absolute right-5">
              {show7 ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <Link to={"/sub-Sub-category/add"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show7 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>Add Sub Sub Category</p>
            </div>
          </Link>
          <Link to={"/sub-Sub-category/view"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show7 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>View Sub Sub Category</p>
            </div>
          </Link>
        </div>

        {/* Products */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow8(!show8)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">Products</p>
            <span className="text-white text-[16px] absolute right-5">
              {show8 ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <Link to={"/products/add"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show8 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>Add Product</p>
            </div>
          </Link>
          <Link to={"/products/view"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show8 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>View Product</p>
            </div>
          </Link>
        </div>

        {/* why choose us */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow9(!show9)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                fill="currentColor"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9L0 168c0 13.3 10.7 24 24 24l110.1 0c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24l0 104c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65 0-94.1c0-13.3-10.7-24-24-24z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">
              Why Choose US
            </p>
            <span className="text-white text-[16px] absolute right-5">
              {show9 ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <Link to={"/why-choose-us/add"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show9 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>Add Why Choose US</p>
            </div>
          </Link>
          <Link to={"/why-choose-us/view"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show9 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>View Why Choose US</p>
            </div>
          </Link>
        </div>

        {/* orders */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow10(!show10)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                fill="currentColor"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9L0 168c0 13.3 10.7 24 24 24l110.1 0c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24l0 104c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65 0-94.1c0-13.3-10.7-24-24-24z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">Orders</p>
            <span className="text-white text-[16px] absolute right-5">
              {show10 ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <Link to={"/orders"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show10 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>Orders</p>
            </div>
          </Link>
        </div>

        {/* sliders */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow11(!show11)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                fill="currentColor"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">Sliders</p>
            <span className="text-white text-[16px] absolute right-5">
              {show11 ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <Link to={"/slider/add"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show11 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>Add Slider</p>
            </div>
          </Link>
          <Link to={"/slider/view"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show11 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>View Slider</p>
            </div>
          </Link>
        </div>

        {/* country */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow12(!show12)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">Country</p>
            <span className="text-white text-[16px] absolute right-5">
              {show12 ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <Link to={"/country/add"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show12 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>Add Country</p>
            </div>
          </Link>
          <Link to={"/country/view"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show12 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>View Country</p>
            </div>
          </Link>
        </div>

        {/* testimonials */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow13(!show13)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 640 512"
                class="text-[20px]"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">Testimonials</p>
            <span className="text-white text-[16px] absolute right-5">
              {show13 ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <Link to={"/testimonial/add"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show13 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>Add Testimonials</p>
            </div>
          </Link>
          <Link to={"/testimonial/view"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show13 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>View Testimonials</p>
            </div>
          </Link>
        </div>

        {/* faqs */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow14(!show14)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1"
                viewBox="0 0 48 48"
                enable-background="new 0 0 48 48"
                class="text-[20px]  "
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#558B2F"
                  d="M15,40h23l6,6V25c0-2.2-1.8-4-4-4H15c-2.2,0-4,1.8-4,4v11C11,38.2,12.8,40,15,40z"
                ></path>
                <path
                  fill="#1B5E20"
                  d="M28.8,32.8h-3.6l-0.7,2.1h-2.2l3.7-10h1.9l3.7,10h-2.2L28.8,32.8z M25.7,31.2h2.5L27,27.4L25.7,31.2z"
                ></path>
                <path
                  fill="#8BC34A"
                  d="M33,25H10l-6,6V8c0-2.2,1.8-4,4-4h25c2.2,0,4,1.8,4,4v13C37,23.2,35.2,25,33,25z"
                ></path>
                <path
                  fill="#fff"
                  d="M25.4,14.2c0,1-0.2,1.8-0.5,2.5c-0.3,0.7-0.7,1.3-1.3,1.7l1.7,1.3L24,20.9l-2.2-1.7c-0.2,0-0.5,0.1-0.8,0.1 c-0.6,0-1.2-0.1-1.8-0.3c-0.5-0.2-1-0.6-1.4-1c-0.4-0.4-0.7-1-0.9-1.6c-0.2-0.6-0.3-1.3-0.3-2.1v-0.4c0-0.8,0.1-1.5,0.3-2.1 c0.2-0.6,0.5-1.2,0.9-1.6c0.4-0.4,0.8-0.8,1.4-1c0.5-0.2,1.1-0.3,1.8-0.3c0.6,0,1.2,0.1,1.8,0.3c0.5,0.2,1,0.6,1.4,1 c0.4,0.4,0.7,1,0.9,1.6c0.2,0.6,0.3,1.3,0.3,2.1V14.2z M23.2,13.7c0-1.1-0.2-1.9-0.6-2.4c-0.4-0.6-0.9-0.8-1.6-0.8 c-0.7,0-1.3,0.3-1.6,0.8c-0.4,0.6-0.6,1.4-0.6,2.4v0.5c0,0.5,0.1,1,0.2,1.4c0.1,0.4,0.2,0.8,0.4,1c0.2,0.3,0.4,0.5,0.7,0.6 c0.3,0.1,0.6,0.2,0.9,0.2c0.7,0,1.3-0.3,1.6-0.8c0.4-0.6,0.6-1.4,0.6-2.5V13.7z"
                ></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">Faqs</p>
            <span className="text-white text-[16px] absolute right-5">
              {show14 ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <Link to={"/faq/add"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show14 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>Add Faq</p>
            </div>
          </Link>
          <Link to={"/faq/view"}>
            <div
              className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show14 ? "block" : "hidden"}`}
            >
              <span>
                <GrFormView />
              </span>
              <p>View Faq</p>
            </div>
          </Link>
        </div>

        {/* Terms & conditions */}

        <div className=" mt-3 pl-2 rounded-lg cursor-pointer">
          <div
            onClick={() => setShow2(!show2)}
            className="flex gap-4 items-center hover:bg-[#374151] p-2 rounded-lg relative"
          >
            <span className="text-2xl text-white">
              <svg
                fill="currentColor"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"></path>
              </svg>
            </span>
            <p className="font-semibold text-[18px] text-white">
              Terms & Conditions
            </p>
            <span className="text-white text-[16px] absolute right-5">
              {show2 ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          {/* <div
            className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show2 ? "block" : "hidden"}`}
          >
            <span>
              <GrFormView />
            </span>
            <p>Add </p>
          </div>
          <div
            className={`flex gap-4 items-center text-white hover:bg-[#374151] p-2 rounded-lg ${show2 ? "block" : "hidden"}`}
          >
            <span>
              <GrFormView />
            </span>
            <p>view</p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
