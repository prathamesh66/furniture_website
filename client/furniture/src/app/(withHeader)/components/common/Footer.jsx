import React from 'react'
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <section className="w-full mt-[50px] my-[5px] ">
        <hr className="text-[#ccc]" />

        <div className="max-w-[1170px] mx-auto mt-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[4fr_2fr_2fr_4fr] gap-[50px] py-[50px]">
            <div className="">
              <h2 className="text-[25px] font-semibold">Contact US</h2>
              <p className="mt-[30px] text-[#5A5A5A]">
                Address: Claritas est etiam processus dynamicus
              </p>
              <p className="mt-[5px] text-[#5A5A5A]">Phone: 98745612330</p>
              <p className="mt-[5px] text-[#5A5A5A]">
                Email: furniture@gmail.com
              </p>

              <div className="flex items-center gap-4 mt-[20px]">
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[50%] border-[#ccc] border-1 text-[#969494]  hover:text-[#c99471] hover:border-[#c99471]">
                  <TiSocialFacebook />
                </div>

                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[50%] border-[#ccc] border-1 text-[#969494]  hover:text-[#c99471] hover:border-[#c99471]">
                  <FaInstagram />
                </div>

                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[50%] border-[#ccc] border-1 text-[#969494]  hover:text-[#c99471] hover:border-[#c99471]">
                  <FaTwitter />
                </div>

                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[50%] border-[#ccc] border-1 text-[#969494]  hover:text-[#c99471] hover:border-[#c99471]">
                  <BsYoutube />
                </div>

                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[50%] border-[#ccc] border-1 text-[#969494]  hover:text-[#c99471] hover:border-[#c99471]">
                  <FaTelegram />
                </div>
              </div>
            </div>

            <div className="">
              <h2 className="text-[25px] font-semibold">Information</h2>
              <p className="mt-[30px] text-[#5A5A5A]">
                <Link href={"/about-us"}>About Us</Link>
              </p>
              <p className="mt-[5px] text-[#5A5A5A]">
                <Link href={"/contact-us"}>Contact Us</Link>
              </p>
              <p className="mt-[5px] text-[#5A5A5A]">
                <Link href={"/faq"}>Frequently Questions</Link>
              </p>
            </div>

            <div>
              <h2 className="text-[25px] font-semibold">My Account</h2>
              <p className="mt-[30px] text-[#5A5A5A]">
                <Link href={"/dashboard"}>My Dashboard</Link>
              </p>
              <p className="mt-[5px] text-[#5A5A5A]">
                <Link href={"/wishlist"}>WishList</Link>
              </p>
              <p className="mt-[5px] text-[#5A5A5A]">
                <Link href={"/cart"}>Cart</Link>
              </p>
              <p className="mt-[5px] text-[#5A5A5A]">
                <Link href={"/checkout"}>Checkout</Link>
              </p>
            </div>

            <div>
              <h2 className="text-[25px] font-semibold">Top Rated Products</h2>

              <div className="mt-[30px] flex  gap-4">
                <div>
                  <Image
                    src="/images/1615277326496Sapien Sofa Cum Bed__.jpg"
                    alt="image"
                    width={92}
                    height={58}
                  />
                </div>

                <div className="">
                  <p className="text-[#5A5A5A]">Wooden Sofa Cum Bed</p>
                  <p className="mt-1 text-[#3131da95]">Sapien Sofa Cum Bed</p>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-[#5A5A5A] line-through">Rs. 64,000</p>
                    <p className="text-[#c99471]">Rs. 54,000</p>
                  </div>
                </div>
              </div>

              <hr className="mt-[20px] text-[#ccc]" />

              <div className="mt-[30px] flex gap-4">
                <div>
                  <Image
                    src="/images/1615277326496Sapien Sofa Cum Bed__.jpg"
                    alt="image"
                    width={92}
                    height={58}
                  />
                </div>

                <div className="">
                  <p className="text-[#5A5A5A]">Prayer Units</p>
                  <p className="mt-1 text-[#3131da95]">
                    Hardwell Temple Prayer Unit
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-[#5A5A5A] line-through">Rs. 10,000</p>
                    <p className="text-[#c99471]"> Rs. 9,400</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="text-[#ccc]" />

          <div className=" py-[15px]">
            <ul className="flex items-center gap-10 justify-center">
              <li className="cursor-pointer hover:text-[#c99471]">Home</li>
              <li className="cursor-pointer hover:text-[#c99471]">
                Online Store
              </li>
              <li className="cursor-pointer hover:text-[#c99471]">
                Privacy Policy
              </li>
              <li className="cursor-pointer hover:text-[#c99471]">
                Terms Of Use
              </li>
            </ul>
          </div>

          <hr className="text-[#ccc]" />

          <div className="mt-[20px] text-center">
            <div>All Rights Reserved By Furniture | © 2026</div>
            <div className="flex justify-center items-center mt-[25px]">
              <Image
                src="/images/papyel2.png"
                alt="image"
                width={250}
                height={70}
                style={{ width: "250px", height: "70px" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer









{/* <footer class="footer_widgets footer_other">
    <div class="container">  
        <div class="footer_top">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-8">
                    <div class="widgets_container contact_us">
                        <h3 class="">Contact Us</h3>
                        <div class="footer_contact">
                            <p class="">Address: Claritas est etiam processus dynamicus</p>
                            <p>Phone: <a href="tel:98745612330">98745612330</a></p>
                            <p>Email: furniture@gmail.com</p>
                            <ul>
                                                                    <li><a href="https://instagram.com" target="_blank"><i class="fa fa-facebook"></i></a></li>
                                                                                                    <li><a href="https://instagram.com" target="_blank"><i class="fa fa-instagram"></i></a></li>
                                                                                                    <li><a href="https://twitter.com" target="_blank"><i class="fa fa-twitter"></i></a></li>
                                                                                                                                    <li><a href="https://youtube.com" target="_blank"><i class="ion-social-youtube"></i></a></li>
                                                                                                    <li><a href="https://telegram.com" target="_blank"><i class="fa fa-telegram"></i></a></li>
                                                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-4 col-6">
                    <div class="widgets_container widget_menu">
                        <h3>Information</h3>
                        <div class="footer_menu">
                            <ul>
                                <li><a href="https://wscubetech.co/Assignments/furniture/about-us">About Us</a></li>
                                <li><a href="https://wscubetech.co/Assignments/furniture/contact-us">Contact Us</a></li>
                                <!-- <li><a href="https://wscubetech.co/Assignments/furniture/sitemap">Site Map</a></li> -->
                                <li><a href="https://wscubetech.co/Assignments/furniture/frequently-questions">Frequently Questions</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-5 col-6">
                    <div class="widgets_container widget_menu">
                        <h3>My Account</h3>
                        <div class="footer_menu">
                            <ul>
                                <li><a href="https://wscubetech.co/Assignments/furniture/my-dashboard">My Dashboard</a></li>
                                <li><a href="https://wscubetech.co/Assignments/furniture/wishlist">Wishlist</a></li>
                                <li><a href="https://wscubetech.co/Assignments/furniture/cart">Cart</a></li>
                                <li><a href="https://wscubetech.co/Assignments/furniture/checkout">Checkout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-7">
                    <div class="widgets_container product_widget">
                        <h3 class="">Top Rated Products</h3>
                        <div class="simple_product">
                                                            <div class="simple_product_items">
                                    <div class="simple_product_thumb">
                                        <a href="https://wscubetech.co/Assignments/furniture/product-details/sapien-sofa-cum-bed">
                                            <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1615277326496Sapien%20Sofa%20Cum%20Bed__.jpg" alt="">
                                        </a>
                                    </div>
                                    <div class="simple_product_content">
                                        <div class="tag_cate">
                                                                                                                                            <a class="">Wooden Sofa Cum Bed</a>
                                                                                    </div>
                                        <div class="product_name">
                                            <h3 class=""><a href="https://wscubetech.co/Assignments/furniture/product-details/sapien-sofa-cum-bed" class="">Sapien Sofa Cum Bed</a></h3>
                                        </div>
                                        <div class="product_price">
                                            <span class="old_price">Rs. 64,000</span>
                                            <span class="current_price">Rs. 54,000</span>
                                        </div>
                                    </div>
                                </div>
                                                            <div class="simple_product_items">
                                    <div class="simple_product_thumb">
                                        <a href="https://wscubetech.co/Assignments/furniture/product-details/hardwell-temple-prayer-unit">
                                            <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253179270591620747711033Hardwell%20Temple%20Prayer%20Unit__.jpg" alt="">
                                        </a>
                                    </div>
                                    <div class="simple_product_content">
                                        <div class="tag_cate">
                                                                                                                                            <a>Prayer Units</a>
                                                                                    </div>
                                        <div class="product_name">
                                            <h3 class=""><a href="https://wscubetech.co/Assignments/furniture/product-details/hardwell-temple-prayer-unit">Hardwell Temple Prayer Unit</a></h3>
                                        </div>
                                        <div class="product_price">
                                            <span class="old_price">Rs. 10,000</span>
                                            <span class="current_price">Rs. 9,400</span>
                                        </div>
                                    </div>
                                </div>
                                                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer_middel">
            <div class="row">
                <div class="col-12">
                    <div class="footer_middel_menu">
                        <ul>
                            <li><a href="https://wscubetech.co/Assignments/furniture">Home</a></li>
                            <li><a href="https://wscubetech.co/Assignments/furniture/online-store">Online Store</a></li>
                            <li><a href="https://wscubetech.co/Assignments/furniture/privacy-policy">Privacy Policy</a></li>
                            <li><a href="https://wscubetech.co/Assignments/furniture/term-of-use">Terms Of Use</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer_bottom">
           <div class="row">
                <div class="col-12">
                    <div class="copyright_area">
                        <p>All Rights Reserved By Furniture | © 2026 </p>
                        <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/papyel2.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>     
</footer> */}








// import React from "react";
// import {
//   TiSocialFacebook,
//   TiSocialTwitter,
// } from "react-icons/ti";
// import { FaInstagram, FaTelegram } from "react-icons/fa6";
// import { BsYoutube } from "react-icons/bs";
// import Image from "next/image";
// import Link from "next/link";

// const Footer = () => {
//   return (
//     <footer className="w-full mt-[50px]">
//       <hr className="border-[#ccc]" />

//       <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-0">

//         {/* ================= FOOTER TOP ================= */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[4fr_2fr_2fr_4fr] gap-10 lg:gap-12 py-12">

//           {/* ================= CONTACT ================= */}
//           <div>
//             <h2 className="text-[22px] sm:text-[25px] font-semibold">
//               Contact Us
//             </h2>

//             <div className="mt-6 text-[#5A5A5A] text-[14px] sm:text-[15px] leading-7">
//               <p>
//                 Address: Claritas est etiam processus dynamicus
//               </p>

//               <p>
//                 Phone: 98745612330
//               </p>

//               <p>
//                 Email: furniture@gmail.com
//               </p>
//             </div>

//             {/* Social Icons */}
//             <div className="flex flex-wrap items-center gap-3 mt-6">

//               <a
//                 href="#"
//                 className="w-[40px] h-[40px] flex items-center justify-center rounded-full border border-[#ccc] text-[#969494] hover:text-[#c99471] hover:border-[#c99471] transition"
//               >
//                 <TiSocialFacebook size={22} />
//               </a>

//               <a
//                 href="#"
//                 className="w-[40px] h-[40px] flex items-center justify-center rounded-full border border-[#ccc] text-[#969494] hover:text-[#c99471] hover:border-[#c99471] transition"
//               >
//                 <FaInstagram size={17} />
//               </a>

//               <a
//                 href="#"
//                 className="w-[40px] h-[40px] flex items-center justify-center rounded-full border border-[#ccc] text-[#969494] hover:text-[#c99471] hover:border-[#c99471] transition"
//               >
//                 <TiSocialTwitter size={22} />
//               </a>

//               <a
//                 href="#"
//                 className="w-[40px] h-[40px] flex items-center justify-center rounded-full border border-[#ccc] text-[#969494] hover:text-[#c99471] hover:border-[#c99471] transition"
//               >
//                 <BsYoutube size={17} />
//               </a>

//               <a
//                 href="#"
//                 className="w-[40px] h-[40px] flex items-center justify-center rounded-full border border-[#ccc] text-[#969494] hover:text-[#c99471] hover:border-[#c99471] transition"
//               >
//                 <FaTelegram size={17} />
//               </a>

//             </div>
//           </div>


//           {/* ================= INFORMATION ================= */}
//           <div>
//             <h2 className="text-[22px] sm:text-[25px] font-semibold">
//               Information
//             </h2>

//             <ul className="mt-6 space-y-2 text-[14px] sm:text-[15px] text-[#5A5A5A]">

//               <li>
//                 <Link
//                   href="/about-us"
//                   className="hover:text-[#c99471] transition"
//                 >
//                   About Us
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   href="/contact-us"
//                   className="hover:text-[#c99471] transition"
//                 >
//                   Contact Us
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   href="/frequently-questions"
//                   className="hover:text-[#c99471] transition"
//                 >
//                   Frequently Questions
//                 </Link>
//               </li>

//             </ul>
//           </div>


//           {/* ================= MY ACCOUNT ================= */}
//           <div>
//             <h2 className="text-[22px] sm:text-[25px] font-semibold">
//               My Account
//             </h2>

//             <ul className="mt-6 space-y-2 text-[14px] sm:text-[15px] text-[#5A5A5A]">

//               <li>
//                 <Link
//                   href="/my-dashboard"
//                   className="hover:text-[#c99471] transition"
//                 >
//                   My Dashboard
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   href="/wishlist"
//                   className="hover:text-[#c99471] transition"
//                 >
//                   Wishlist
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   href="/cart"
//                   className="hover:text-[#c99471] transition"
//                 >
//                   Cart
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   href="/checkout"
//                   className="hover:text-[#c99471] transition"
//                 >
//                   Checkout
//                 </Link>
//               </li>

//             </ul>
//           </div>


//           {/* ================= TOP PRODUCTS ================= */}
//           <div>
//             <h2 className="text-[22px] sm:text-[25px] font-semibold">
//               Top Rated Products
//             </h2>

//             {/* Product 1 */}
//             <div className="mt-6 flex gap-4">

//               <div className="shrink-0">
//                 <Image
//                   src="/images/1615277326496Sapien Sofa Cum Bed__.jpg"
//                   alt="Sapien Sofa Cum Bed"
//                   width={92}
//                   height={58}
//                   className="w-[92px] h-[58px] object-cover"
//                 />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[13px] sm:text-[14px] text-[#5A5A5A]">
//                   Wooden Sofa Cum Bed
//                 </p>

//                 <p className="mt-1 text-[13px] sm:text-[14px] text-[#3131da95]">
//                   Sapien Sofa Cum Bed
//                 </p>

//                 <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
//                   <p className="text-[13px] text-[#5A5A5A] line-through">
//                     Rs. 64,000
//                   </p>

//                   <p className="text-[13px] text-[#c99471]">
//                     Rs. 54,000
//                   </p>
//                 </div>
//               </div>

//             </div>

//             <hr className="mt-5 border-[#ccc]" />

//             {/* Product 2 */}
//             <div className="mt-6 flex gap-4">

//               <div className="shrink-0">
//                 <Image
//                   src="/images/1615277326496Sapien Sofa Cum Bed__.jpg"
//                   alt="Hardwell Temple Prayer Unit"
//                   width={92}
//                   height={58}
//                   className="w-[92px] h-[58px] object-cover"
//                 />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[13px] sm:text-[14px] text-[#5A5A5A]">
//                   Prayer Units
//                 </p>

//                 <p className="mt-1 text-[13px] sm:text-[14px] text-[#3131da95]">
//                   Hardwell Temple Prayer Unit
//                 </p>

//                 <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
//                   <p className="text-[13px] text-[#5A5A5A] line-through">
//                     Rs. 10,000
//                   </p>

//                   <p className="text-[13px] text-[#c99471]">
//                     Rs. 9,400
//                   </p>
//                 </div>
//               </div>

//             </div>
//           </div>

//         </div>


//         {/* ================= MIDDLE FOOTER MENU ================= */}
//         <hr className="border-[#ccc]" />

//         <div className="py-5">
//           <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10 text-[14px] sm:text-[15px]">

//             <li>
//               <Link
//                 href="/"
//                 className="hover:text-[#c99471] transition"
//               >
//                 Home
//               </Link>
//             </li>

//             <li>
//               <Link
//                 href="/product"
//                 className="hover:text-[#c99471] transition"
//               >
//                 Online Store
//               </Link>
//             </li>

//             <li>
//               <Link
//                 href="/privacy-policy"
//                 className="hover:text-[#c99471] transition"
//               >
//                 Privacy Policy
//               </Link>
//             </li>

//             <li>
//               <Link
//                 href="/terms-of-use"
//                 className="hover:text-[#c99471] transition"
//               >
//                 Terms Of Use
//               </Link>
//             </li>

//           </ul>
//         </div>


//         {/* ================= COPYRIGHT ================= */}
//         <hr className="border-[#ccc]" />

//         <div className="py-5 text-center">

//           <p className="text-[13px] sm:text-[14px]">
//             All Rights Reserved By Furniture | © 2026
//           </p>

//           <div className="flex justify-center items-center mt-5">

//             <Image
//               src="/images/papyel2.png"
//               alt="Payment Methods"
//               width={250}
//               height={70}
//               className="w-[180px] sm:w-[250px] h-auto"
//             />

//           </div>

//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;
// ;
