"use client";

import React from "react";
import { Rubik } from "next/font/google";
import Image from "next/image";
import { MdSearch, MdMenu, MdClose } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { logout } from "../../redux/loginSlice";
import { toast } from "react-toastify";

const rubik = Rubik({
  subsets: ["latin"],
});

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userLogin = useSelector((state) => state.login.userLogin);

  const [mounted, setMounted] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Search
  const [searchText, setSearchText] = useState("");

  // Sub Category Data
  const [subCategoryData, setSubCategoryData] = useState([]);

  // Mobile Menu
  const [mobileMenu, setMobileMenu] = useState(false);

  // Mobile Dropdown
  const [mobileDropdown, setMobileDropdown] = useState("");

  const cart = useSelector((state) => state.cartStore?.cart || []);

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.productPrice * item.qty,
    0,
  );

  // ==========================================
  // MOUNTED
  // ==========================================

  useEffect(() => {
    setMounted(true);
  }, []);

  // ==========================================
  // STICKY HEADER
  // ==========================================

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("user_login");
    toast.success("Logout successful!");
  };

  // ==========================================
  // GET SUB CATEGORY
  // ==========================================

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_APIBASEPATH}sub-category`)
      .then((res) => {
        console.log("SUB CATEGORY RESPONSE:", res.data);

        if (res.data._status) {
          console.log("ALL SUB CATEGORIES:", res.data.subCategoryData);

          res.data.subCategoryData.forEach((item) => {
            console.log(
              "SUB CATEGORY:",
              item.subCategoryName,
              "PARENT:",
              item.parentCategory?.categoryName,
            );
          });

          setSubCategoryData(res.data.subCategoryData);
        }
      })
      .catch((error) => {
        console.log("SUB CATEGORY ERROR:", error);
      });
  }, []);

  // ==========================================
  // GET SUB CATEGORY ACCORDING TO PARENT
  // ==========================================

  const getSubCategories = (categoryName) => {
    const normalize = (value) => {
      return value?.toLowerCase().replace(/\s+/g, " ").trim();
    };

    return subCategoryData.filter(
      (item) =>
        normalize(item.parentCategory?.categoryName) ===
        normalize(categoryName),
    );
  };

  // ==========================================
  // SEARCH PRODUCT
  // ==========================================

  const handleSearch = () => {
    if (searchText.trim() === "") {
      router.push("/productListing");
      return;
    }

    router.push(
      `/productListing?search=${encodeURIComponent(searchText.trim())}`,
    );
  };

  return (
    <section className="w-full">
      {/* ==========================================
          FIRST HEADER
      ========================================== */}

      <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row sm:justify-between items-center gap-2 sm:gap-0 px-4 lg:px-0 py-3">
        <div
          className={`${rubik.className} text-[12px] sm:text-[14px] text-center sm:text-left`}
        >
          Contact us 24/7 : +91-98745612330 / furniture@gmail.com
        </div>

        {!mounted ? (
          <div className={`${rubik.className} text-[12px] sm:text-[14px]`}>
            Login / Register
          </div>
        ) : userLogin === 1 ? (
          <button
            onClick={handleLogout}
            className={`${rubik.className} text-[12px] sm:text-[14px] cursor-pointer`}
          >
            Logout
          </button>
        ) : (
          <Link href="/login-register">
            <div className={`${rubik.className} text-[12px] sm:text-[14px]`}>
              Login / Register
            </div>
          </Link>
        )}
      </div>

      <hr className="text-[#ccc]" />

      {/* ==========================================
          SECOND HEADER
      ========================================== */}

      <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0 px-4 lg:px-0 py-4">
        {/* Logo */}

        <div className="flex-shrink-0">
          <Image
            src="/images/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
            alt="Sofa"
            width={155}
            height={40}
            className="w-[130px] sm:w-[155px] h-auto"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4 w-full lg:w-auto">
          {/* Search */}

          <div className="flex rounded-sm items-center border border-[#ccc] flex-1 lg:flex-none">
            <input
              type="text"
              placeholder="Search product..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="p-2 outline-none w-full lg:w-[220px] text-sm"
            />

            <p
              onClick={handleSearch}
              className="p-2 cursor-pointer hover:text-[#c99471] flex-shrink-0"
            >
              <MdSearch />
            </p>
          </div>

          {/* Wishlist */}

          <Link href="/wishlist">
            <div className="hover:text-[#c99471] cursor-pointer p-3 rounded-sm border border-[#ccc]">
              <FaHeart />
            </div>
          </Link>

          {/* Cart */}

          <Link href="/cart">
            <div className="flex items-center hover:text-[#c99471] rounded-sm p-2 border border-[#ccc] cursor-pointer">
              <div className="w-[32px] sm:w-[40px] h-[20px] bg-[#c99471] text-white rounded-full text-xs flex items-center justify-center">
                {mounted ? cartCount : 0}
              </div>

              <p className="px-2 border-r border-[#ccc]">
                <MdShoppingCart />
              </p>

              <p className="px-2 sm:px-4 whitespace-nowrap text-sm">
                Rs. {mounted ? cartTotal : 0}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <hr className="text-[#ccc]" />

      {/* ==========================================
          THIRD HEADER
      ========================================== */}

      {isSticky && <div className="h-[60px] lg:h-[70px]"></div>}

      <div
        className={`w-full bg-white z-50 transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 shadow-md" : "relative"
        }`}
      >
        {/* ==========================================
            DESKTOP NAVIGATION
        ========================================== */}

        <div className="max-w-[1320px] mx-auto hidden lg:flex items-center">
          {/* Sticky Logo */}

          {isSticky && (
            <div className="flex-shrink-0 mr-8">
              <Link href="/">
                <Image
                  src="/images/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
                  alt="Monsta"
                  width={120}
                  height={35}
                  className="object-contain"
                />
              </Link>
            </div>
          )}

          {/* Navigation */}

          <ul className="flex items-center justify-center flex-1">
            {/* HOME */}

            <Link href="/">
              <li className="py-5 font-semibold uppercase hover:text-[#c99471] cursor-pointer px-[25px]">
                Home
              </li>
            </Link>

            {/* ================= LIVING ================= */}

            <li className="relative flex items-center font-semibold hover:text-[#c99471] cursor-pointer group py-5 px-[25px]">
              LIVING
              <div className="absolute left-0 top-full min-w-[550px] z-20 bg-white shadow-lg origin-top opacity-0 invisible transition-all duration-500 ease-out [transform:perspective(600px)_rotateX(-15deg)_translateY(0px)] group-hover:opacity-100 group-hover:visible group-hover:[transform:perspective(600px)_rotateX(0deg)_translateY(0)]">
                <div className="flex gap-15 py-2 px-5 bg-white">
                  {/* TABLES */}

                  <div>
                    <h2 className="text-[16px] font-semibold text-black hover:text-[#c99471] py-5">
                      Tables
                    </h2>

                    <ul className="py-2">
                      {getSubCategories("Tables").map((subCategory) => (
                        <li
                          key={subCategory._id}
                          className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]"
                        >
                          <Link
                            href={`/productListing?subCategory=${subCategory._id}`}
                          >
                            {subCategory.subCategoryName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* MIRRORS */}

                  <div>
                    <h2 className="text-[16px] font-semibold text-black hover:text-[#c99471] py-5">
                      Mirrors
                    </h2>

                    <ul className="py-2">
                      {getSubCategories("Mirror").map((subCategory) => (
                        <li
                          key={subCategory._id}
                          className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]"
                        >
                          <Link
                            href={`/productListing?subCategory=${subCategory._id}`}
                          >
                            {subCategory.subCategoryName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* LIVING STORAGE */}

                  <div>
                    <h2 className="text-[16px] font-semibold text-black hover:text-[#c99471] py-5">
                      Living
                      <br />
                      storage/collection
                    </h2>

                    <ul className="py-2">
                      {getSubCategories("Living Storage").map((subCategory) => (
                        <li
                          key={subCategory._id}
                          className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]"
                        >
                          <Link
                            href={`/productListing?subCategory=${subCategory._id}`}
                          >
                            {subCategory.subCategoryName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <p className="mt-[2px]">
                <IoIosArrowDown />
              </p>
            </li>

            {/* ================= SOFA ================= */}

            <li className="relative flex items-center font-semibold hover:text-[#c99471] cursor-pointer group py-5 px-[25px]">
              SOFA
              <div className="absolute left-0 top-full min-w-[550px] z-20 bg-white shadow-lg origin-top opacity-0 invisible transition-all duration-500 ease-out [transform:perspective(600px)_rotateX(-15deg)_translateY(0px)] group-hover:opacity-100 group-hover:visible group-hover:[transform:perspective(600px)_rotateX(0deg)_translateY(0)]">
                <div className="flex gap-15 py-2 px-5 bg-white">
                  {/* SOFA CUM BED */}

                  <div>
                    <h2 className="text-[16px] font-semibold text-black hover:text-[#c99471] py-5">
                      SOFA CUM BED
                    </h2>

                    <ul className="py-2">
                      {getSubCategories("Sofa Cum Bed").map((subCategory) => (
                        <li
                          key={subCategory._id}
                          className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]"
                        >
                          <Link
                            href={`/productListing?subCategory=${subCategory._id}`}
                          >
                            {subCategory.subCategoryName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* SOFA SETS */}

                  <div>
                    <h2 className="text-[16px] font-semibold text-black hover:text-[#c99471] py-5">
                      SOFA SETS
                    </h2>

                    <ul className="py-2">
                      {getSubCategories("Sofa Sets").map((subCategory) => (
                        <li
                          key={subCategory._id}
                          className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]"
                        >
                          <Link
                            href={`/productListing?subCategory=${subCategory._id}`}
                          >
                            {subCategory.subCategoryName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* SWING JHULA */}

                  <div>
                    <h2 className="text-[16px] font-semibold text-black hover:text-[#c99471] py-5">
                      SWING JHULA
                    </h2>

                    <ul className="py-2">
                      {getSubCategories("Swing Jhula").map((subCategory) => (
                        <li
                          key={subCategory._id}
                          className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]"
                        >
                          <Link
                            href={`/productListing?subCategory=${subCategory._id}`}
                          >
                            {subCategory.subCategoryName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <p className="mt-[2px]">
                <IoIosArrowDown />
              </p>
            </li>

            {/* ================= PAGES ================= */}

            <li className="relative flex items-center font-semibold hover:text-[#c99471] cursor-pointer group py-5 px-[25px]">
              PAGES
              <div className="absolute left-0 top-full min-w-[200px] z-20 bg-white shadow-lg origin-top opacity-0 invisible transition-all duration-500 ease-out [transform:perspective(600px)_rotateX(-15deg)_translateY(0px)] group-hover:opacity-100 group-hover:visible group-hover:[transform:perspective(600px)_rotateX(0deg)_translateY(0)]">
                <div className="flex gap-15 py-2 px-5 bg-white">
                  <div>
                    <ul className="py-2">
                      <Link href="/about-us">
                        <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                          About US
                        </li>
                      </Link>

                      <Link href="/cart">
                        <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                          Cart
                        </li>
                      </Link>

                      <Link href="/checkout">
                        <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                          Checkout
                        </li>
                      </Link>

                      <Link href="/faq">
                        <li className="py-1 text-[14px] text-[#918e8e] hover:text-[#c99471]">
                          Frequently Questions
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
              <p className="mt-[2px]">
                <IoIosArrowDown />
              </p>
            </li>

            {/* CONTACT */}

            <Link href="/contact-us">
              <li className="py-5 font-semibold uppercase hover:text-[#c99471] cursor-pointer px-[25px]">
                contact US
              </li>
            </Link>
          </ul>
        </div>

        {/* ==========================================
            MOBILE NAVIGATION
        ========================================== */}

        <div className="lg:hidden px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
              alt="Monsta"
              width={120}
              height={35}
              className="object-contain"
            />
          </Link>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="text-2xl border border-[#ccc] p-2 rounded-sm"
          >
            {mobileMenu ? <MdClose /> : <MdMenu />}
          </button>
        </div>

        {/* ==========================================
            MOBILE MENU CONTENT
        ========================================== */}

        {mobileMenu && (
          <div className="lg:hidden border-t border-[#eee] bg-white shadow-md">
            <ul className="px-4 py-3">
              {/* HOME */}

              <li className="border-b border-[#eee]">
                <Link
                  href="/"
                  onClick={() => setMobileMenu(false)}
                  className="block py-4 font-semibold uppercase"
                >
                  Home
                </Link>
              </li>

              {/* LIVING */}

              <li className="border-b border-[#eee]">
                <button
                  onClick={() =>
                    setMobileDropdown(
                      mobileDropdown === "living" ? "" : "living",
                    )
                  }
                  className="w-full flex items-center justify-between py-4 font-semibold"
                >
                  <span>LIVING</span>

                  <IoIosArrowDown
                    className={`transition-transform ${
                      mobileDropdown === "living" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileDropdown === "living" && (
                  <div className="pb-3 pl-4">
                    {/* TABLES */}

                    <div className="mb-4">
                      <h3 className="font-semibold py-2">Tables</h3>

                      {getSubCategories("Tables").map((subCategory) => (
                        <Link
                          key={subCategory._id}
                          href={`/productListing?subCategory=${subCategory._id}`}
                          onClick={() => setMobileMenu(false)}
                          className="block py-1 text-sm text-[#918e8e]"
                        >
                          {subCategory.subCategoryName}
                        </Link>
                      ))}
                    </div>

                    {/* MIRRORS */}

                    <div className="mb-4">
                      <h3 className="font-semibold py-2">Mirrors</h3>

                      {getSubCategories("Mirror").map((subCategory) => (
                        <Link
                          key={subCategory._id}
                          href={`/productListing?subCategory=${subCategory._id}`}
                          onClick={() => setMobileMenu(false)}
                          className="block py-1 text-sm text-[#918e8e]"
                        >
                          {subCategory.subCategoryName}
                        </Link>
                      ))}
                    </div>

                    {/* LIVING STORAGE */}

                    <div>
                      <h3 className="font-semibold py-2">
                        Living storage/collection
                      </h3>

                      {getSubCategories("Living Storage").map((subCategory) => (
                        <Link
                          key={subCategory._id}
                          href={`/productListing?subCategory=${subCategory._id}`}
                          onClick={() => setMobileMenu(false)}
                          className="block py-1 text-sm text-[#918e8e]"
                        >
                          {subCategory.subCategoryName}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              {/* SOFA */}

              <li className="border-b border-[#eee]">
                <button
                  onClick={() =>
                    setMobileDropdown(mobileDropdown === "sofa" ? "" : "sofa")
                  }
                  className="w-full flex items-center justify-between py-4 font-semibold"
                >
                  <span>SOFA</span>

                  <IoIosArrowDown
                    className={`transition-transform ${
                      mobileDropdown === "sofa" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileDropdown === "sofa" && (
                  <div className="pb-3 pl-4">
                    {/* SOFA CUM BED */}

                    <div className="mb-4">
                      <h3 className="font-semibold py-2">SOFA CUM BED</h3>

                      {getSubCategories("Sofa Cum Bed").map((subCategory) => (
                        <Link
                          key={subCategory._id}
                          href={`/productListing?subCategory=${subCategory._id}`}
                          onClick={() => setMobileMenu(false)}
                          className="block py-1 text-sm text-[#918e8e]"
                        >
                          {subCategory.subCategoryName}
                        </Link>
                      ))}
                    </div>

                    {/* SOFA SETS */}

                    <div className="mb-4">
                      <h3 className="font-semibold py-2">SOFA SETS</h3>

                      {getSubCategories("Sofa Sets").map((subCategory) => (
                        <Link
                          key={subCategory._id}
                          href={`/productListing?subCategory=${subCategory._id}`}
                          onClick={() => setMobileMenu(false)}
                          className="block py-1 text-sm text-[#918e8e]"
                        >
                          {subCategory.subCategoryName}
                        </Link>
                      ))}
                    </div>

                    {/* SWING JHULA */}

                    <div>
                      <h3 className="font-semibold py-2">SWING JHULA</h3>

                      {getSubCategories("Swing Jhula").map((subCategory) => (
                        <Link
                          key={subCategory._id}
                          href={`/productListing?subCategory=${subCategory._id}`}
                          onClick={() => setMobileMenu(false)}
                          className="block py-1 text-sm text-[#918e8e]"
                        >
                          {subCategory.subCategoryName}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              {/* PAGES */}

              <li className="border-b border-[#eee]">
                <button
                  onClick={() =>
                    setMobileDropdown(mobileDropdown === "pages" ? "" : "pages")
                  }
                  className="w-full flex items-center justify-between py-4 font-semibold"
                >
                  <span>PAGES</span>

                  <IoIosArrowDown
                    className={`transition-transform ${
                      mobileDropdown === "pages" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileDropdown === "pages" && (
                  <div className="pb-3 pl-4">
                    <Link
                      href="/about-us"
                      onClick={() => setMobileMenu(false)}
                      className="block py-2 text-sm text-[#918e8e]"
                    >
                      About US
                    </Link>

                    <Link
                      href="/cart"
                      onClick={() => setMobileMenu(false)}
                      className="block py-2 text-sm text-[#918e8e]"
                    >
                      Cart
                    </Link>

                    <Link
                      href="/checkout"
                      onClick={() => setMobileMenu(false)}
                      className="block py-2 text-sm text-[#918e8e]"
                    >
                      Checkout
                    </Link>

                    <Link
                      href="/faq"
                      onClick={() => setMobileMenu(false)}
                      className="block py-2 text-sm text-[#918e8e]"
                    >
                      Frequently Questions
                    </Link>
                  </div>
                )}
              </li>

              {/* CONTACT */}

              <li>
                <Link
                  href="/contact-us"
                  onClick={() => setMobileMenu(false)}
                  className="block py-4 font-semibold uppercase"
                >
                  Contact US
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      <hr className="text-[#ccc]" />
    </section>
  );
};

export default Header;
