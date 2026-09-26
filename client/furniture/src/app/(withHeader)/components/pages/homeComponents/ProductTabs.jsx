// // "use client";

// // import Link from "next/link";
// // import React, { useEffect, useState } from "react";
// // import { FaHeart } from "react-icons/fa";

// // import { useDispatch } from "react-redux";
// // import { addToCart } from "@/app/(withHeader)/redux/cartSlice";

// // const ProductTabs = () => {
// //   const [currentCategory, setCurrentCategory] = useState("Featured");

// //   const [products, setProducts] = useState({
// //     Featured: [],
// //     "New Arrivals": [],
// //     Onsale: [],
// //   });

// //   const [imagePath, setImagePath] = useState("");

// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const getProducts = async () => {
// //       try {
// //         const baseURL = process.env.NEXT_PUBLIC_APIBASEPATH;

// //         const [featuredRes, newArrivalRes, onSaleRes] = await Promise.all([
// //           fetch(`${baseURL}product/featured`),
// //           fetch(`${baseURL}product/new-arrivals`),
// //           fetch(`${baseURL}product/on-sale`),
// //         ]);

// //         const featuredData = await featuredRes.json();
// //         const newArrivalData = await newArrivalRes.json();
// //         const onSaleData = await onSaleRes.json();

// //         setProducts({
// //           Featured: featuredData.productData || [],
// //           "New Arrivals": newArrivalData.productData || [],
// //           Onsale: onSaleData.productData || [],
// //         });

// //         // Product image path coming from backend
// //         setImagePath(featuredData.path || "");

// //         setLoading(false);
// //       } catch (error) {
// //         console.log("Product API Error:", error);
// //         setLoading(false);
// //       }
// //     };

// //     getProducts();
// //   }, []);

// //   const categoryData = ["Featured", "New Arrivals", "Onsale"];

// //   const finalData = products[currentCategory];

// //   return (
// //     <section className="w-full my-5 md:my-10">
// //       <div className="max-w-[1320px] mx-auto">
// //         {/* =========================
// //             CATEGORY TABS
// //         ========================= */}

// //         <div className="flex items-center justify-center gap-4 mb-10">
// //           <hr className="w-[100px] border-gray-300" />

// //           <div className="flex flex-col md:flex-row">
// //             {categoryData.map((category) => (
// //               <button
// //                 key={category}
// //                 onClick={() => setCurrentCategory(category)}
// //                 className={`px-3 md:px-8 my-2 py-2 md:py-3 text-[18px] font-semibold cursor-pointer transition-all duration-300 border w-[200px] border-gray-300 ${
// //                   category === currentCategory
// //                     ? "text-[#c99471] bg-gray-50"
// //                     : "text-black hover:text-[#c99471]"
// //                 }`}
// //               >
// //                 {category}
// //               </button>
// //             ))}
// //           </div>

// //           <hr className="w-[100px] border-gray-300" />
// //         </div>

// //         {/* =========================
// //             LOADING
// //         ========================= */}

// //         {loading ? (
// //           <div className="text-center py-10">Loading Products...</div>
// //         ) : finalData.length > 0 ? (
// //           /* =========================
// //              PRODUCTS
// //           ========================= */

// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {finalData.map((item) => (
// //               <ProductShowComponents
// //                 key={item._id}
// //                 value={item}
// //                 imagePath={imagePath}
// //               />
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="text-center py-10 text-gray-500">
// //             No products available
// //           </div>
// //         )}
// //       </div>
// //     </section>
// //   );
// // };

// // export default ProductTabs;

// // /* =====================================================
// //    PRODUCT CARD
// // ===================================================== */

// // const ProductShowComponents = ({ value, imagePath }) => {
// //   const { _id, productName, productImage, productPrice, productActualPrice } =
// //     value;

// //     const dispatch = useDispatch();

// //   // Create complete backend image URL
// //   const imageUrl = productImage
// //     ? `${imagePath}${encodeURIComponent(productImage)}`
// //     : "";

// //   // console.log("PRODUCT NAME:", productName);
// //   // console.log("IMAGE PATH:", imagePath);
// //   // console.log("IMAGE NAME:", productImage);
// //   // console.log("IMAGE URL:", imageUrl);

// //   return (
// //     <div className="border border-gray-200 p-2 md:p-4">
// //       {/* =========================
// //           PRODUCT IMAGE
// //       ========================= */}

// //       <Link href={`/newProduct-server/${_id}`}>
// //         <div className="overflow-hidden group">
// //           {imageUrl ? (
// //             <img
// //               src={imageUrl}
// //               alt={productName || "Product image"}
// //               width="670"
// //               height="420"
// //               className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
// //             />
// //           ) : (
// //             <div className="w-full h-[250px] flex items-center justify-center bg-gray-100 text-gray-500">
// //               No Image
// //             </div>
// //           )}
// //         </div>
// //       </Link>

// //       {/* =========================
// //           PRODUCT INFORMATION
// //       ========================= */}

// //       <div className="mt-4">
// //         {/* Product Name */}

// //         <p className="text-[#696464] text-sm">{productName}</p>

// //         {/* Product Description / Name */}

// //         <p className="font-semibold text-lg mt-1 min-h-[40px] md:min-h-[60px]">
// //           {productName}
// //         </p>

// //         <hr className="my-3 border-gray-200" />

// //         {/* =========================
// //             PRICE
// //         ========================= */}

// //         <div className="flex items-center gap-3">
// //           <p className="text-[#696464] line-through">₹{productActualPrice}</p>

// //           <p className="text-[#c99471] font-semibold">₹{productPrice}</p>
// //         </div>

// //         {/* =========================
// //             BUTTONS
// //         ========================= */}

// //         <div className="flex items-center justify-between mt-4">
// //           {/* Wishlist */}

// //           <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-[#c99471] hover:text-white transition-all duration-300 cursor-pointer">
// //             <FaHeart />
// //           </button>

// //           {/* Add To Cart */}

// //           <button
// //             onClick={() =>
// //               dispatch(
// //                 addToCart({
// //                   id: value._id,
// //                   productName: value.productName,
// //                   productImage: value.productImage,
// //                   productPrice: value.productPrice,
// //                   productActualPrice: value.productActualPrice,
// //                 }),
// //               )
// //             }
// //             className="px-4 py-2 bg-[#F1F1F1] text-black font-medium rounded-sm hover:bg-[#c99471] transition-all duration-300 cursor-pointer"
// //           >
// //             Add To Cart
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// "use client";

// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { FaHeart } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { addToCart } from "@/app/(withHeader)/redux/cartSlice";

// const ProductTabs = () => {
//   const [currentCategory, setCurrentCategory] = useState("Featured");

//   const [products, setProducts] = useState({
//     Featured: [],
//     "New Arrivals": [],
//     Onsale: [],
//   });

//   const [imagePath, setImagePath] = useState("");
//   const [loading, setLoading] = useState(true);

//   // =========================
//   // GET PRODUCTS
//   // =========================
//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const baseURL = process.env.NEXT_PUBLIC_APIBASEPATH;

//         const [featuredRes, newArrivalRes, onSaleRes] =
//           await Promise.all([
//             fetch(`${baseURL}product/featured`),
//             fetch(`${baseURL}product/new-arrivals`),
//             fetch(`${baseURL}product/on-sale`),
//           ]);

//         const featuredData = await featuredRes.json();
//         const newArrivalData = await newArrivalRes.json();
//         const onSaleData = await onSaleRes.json();

//         setProducts({
//           Featured: featuredData.productData || [],
//           "New Arrivals": newArrivalData.productData || [],
//           Onsale: onSaleData.productData || [],
//         });

//         // Backend image path
//         setImagePath(featuredData.path || "");

//         setLoading(false);
//       } catch (error) {
//         console.log("Product API Error:", error);
//         setLoading(false);
//       }
//     };

//     getProducts();
//   }, []);

//   const categoryData = ["Featured", "New Arrivals", "Onsale"];

//   const finalData = products[currentCategory];

//   return (
//     <section className="w-full py-8 md:py-12">
//       <div className="max-w-[1320px] mx-auto px-4">

//         {/* =========================
//             CATEGORY TABS
//         ========================= */}
//         <div className="flex items-center justify-center gap-3 md:gap-5 mb-8 md:mb-12">

//           {/* Left Line */}
//           <div className="hidden md:block flex-1 max-w-[100px]">
//             <hr className="border-gray-300" />
//           </div>

//           {/* Tabs */}
//           <div className="flex flex-wrap items-center justify-center">
//             {categoryData.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setCurrentCategory(category)}
//                 className={`
//                   px-5 md:px-8
//                   py-3
//                   text-sm md:text-[17px]
//                   font-semibold
//                   cursor-pointer
//                   transition-all
//                   duration-300
//                   border border-gray-300
//                   min-w-[140px] md:min-w-[180px]
//                   ${
//                     category === currentCategory
//                       ? "text-[#c99471] bg-gray-50"
//                       : "text-gray-800 bg-white hover:text-[#c99471]"
//                   }
//                 `}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           {/* Right Line */}
//           <div className="hidden md:block flex-1 max-w-[100px]">
//             <hr className="border-gray-300" />
//           </div>
//         </div>

//         {/* =========================
//             LOADING
//         ========================= */}
//         {loading ? (
//           <div className="text-center py-16">
//             <p className="text-gray-500 text-lg">
//               Loading Products...
//             </p>
//           </div>
//         ) : finalData.length > 0 ? (
//           /* =========================
//              PRODUCTS
//           ========================= */
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
//             {finalData.map((item) => (
//               <ProductShowComponents
//                 key={item._id}
//                 value={item}
//                 imagePath={imagePath}
//               />
//             ))}
//           </div>
//         ) : (
//           /* =========================
//              NO PRODUCTS
//           ========================= */
//           <div className="text-center py-16">
//             <p className="text-gray-500 text-lg">
//               No products available
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ProductTabs;

// /* =====================================================
//    PRODUCT CARD
// ===================================================== */

// const ProductShowComponents = ({ value, imagePath }) => {

//    console.log("PARENT CATEGORY:", value.parentCategory);
//    console.log("SUB CATEGORY:", value.subCategory);
//    console.log("SUB SUB CATEGORY:", value.subSubCategory);

//   const dispatch = useDispatch();

//   const {
//     _id,
//     productName,
//     parentCategory,
//     productImage,
//     productPrice,
//     productActualPrice,
//   } = value;

//   // =========================
//   // IMAGE URL
//   // =========================
//   const imageUrl = productImage
//     ? `${imagePath}${productImage}`
//     : "";

//   // =========================
//   // ADD TO CART
//   // =========================
//   const handleAddToCart = () => {
//     dispatch(
//       addToCart({
//         id: value._id,
//         productName: value.productName,
//         productImage: value.productImage,
//         productPrice: value.productPrice,
//         productActualPrice: value.productActualPrice,
//       }),
//     );
//   };

//   return (
//     <div className="group border border-gray-200 bg-white p-3 md:p-4 transition-all duration-300 hover:shadow-md">
//       {/* =========================
//           PRODUCT IMAGE
//       ========================= */}
//       <Link href={`/newProduct-server/${_id}`}>
//         <div className="overflow-hidden aspect-[4/3] bg-gray-100">
//           {imageUrl ? (
//             <img
//               src={imageUrl}
//               alt={productName || "Product image"}
//               width={670}
//               height={420}
//               className="
//                 w-full
//                 h-full
//                 object-cover
//                 transition-transform
//                 duration-500
//                 group-hover:scale-105
//               "
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-500">
//               No Image
//             </div>
//           )}
//         </div>
//       </Link>
//       {/* =========================
//           PRODUCT INFORMATION
//       ========================= */}

//       <div className="pt-4">
//         <p className="text-[#696464] text-sm">
//           {value.parentCategory?.categoryName}
//         </p>

//         <Link href={`/newProduct-server/${_id}`}>
//           <h3
//             className="
//         font-semibold
//         text-base
//         md:text-lg
//         mt-1
//         min-h-[48px]
//         md:min-h-[56px]
//         leading-6
//         hover:text-[#c99471]
//         transition-colors
//         duration-300
//       "
//           >
//             {productName}
//           </h3>
//         </Link>

//         {/* Divider */}
//         <hr className="my-3 border-gray-200" />

//         {/* Price */}
//         <div className="flex items-center gap-3">
//           <p className="text-gray-500 text-sm md:text-base line-through">
//             ₹{productActualPrice}
//           </p>

//           <p className="text-[#c99471] font-semibold text-base md:text-lg">
//             ₹{productPrice}
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="flex items-center justify-between mt-5">
//           {/* Wishlist */}
//           <button
//             type="button"
//             aria-label="Add to wishlist"
//             className="
//         w-10
//         h-10
//         flex
//         items-center
//         justify-center
//         border
//         border-gray-300
//         rounded-full
//         text-gray-700
//         hover:bg-[#c99471]
//         hover:text-white
//         hover:border-[#c99471]
//         transition-all
//         duration-300
//         cursor-pointer
//       "
//           >
//             <FaHeart size={15} />
//           </button>

//           {/* Add To Cart */}
//           <button
//             type="button"
//             onClick={handleAddToCart}
//             className="
//         px-5
//         py-2.5
//         bg-[#F1F1F1]
//         text-black
//         text-sm
//         md:text-base
//         font-medium
//         rounded-sm
//         hover:bg-[#c99471]
//         hover:text-white
//         transition-all
//         duration-300
//         cursor-pointer
//       "
//           >
//             Add To Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

import { addToCart, deleteCart } from "@/app/(withHeader)/redux/cartSlice";
import axios from "axios";

const ProductTabs = () => {
  const [currentCategory, setCurrentCategory] = useState("Featured");

  const [products, setProducts] = useState({
    Featured: [],
    "New Arrivals": [],
    Onsale: [],
  });

  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // GET PRODUCTS
  // =========================
  useEffect(() => {
    const getProducts = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_APIBASEPATH;

        const [featuredRes, newArrivalRes, onSaleRes] = await Promise.all([
          fetch(`${baseURL}product/featured`),
          fetch(`${baseURL}product/new-arrivals`),
          fetch(`${baseURL}product/on-sale`),
        ]);

        const featuredData = await featuredRes.json();
        const newArrivalData = await newArrivalRes.json();
        const onSaleData = await onSaleRes.json();

        setProducts({
          Featured: featuredData.productData || [],
          "New Arrivals": newArrivalData.productData || [],
          Onsale: onSaleData.productData || [],
        });

        setImagePath(featuredData.path || "");

        setLoading(false);
      } catch (error) {
        console.log("Product API Error:", error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const categoryData = ["Featured", "New Arrivals", "Onsale"];

  const finalData = products[currentCategory];

  return (
    <section className="w-full py-7 sm:py-8 md:py-12">
      <ToastContainer />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-4">
        {/* =========================
            CATEGORY TABS
        ========================= */}
        <div className="flex items-center justify-center gap-3 md:gap-5 mb-7 sm:mb-8 md:mb-12">
          {/* Left Line */}
          <div className="hidden lg:block flex-1 max-w-[100px]">
            <hr className="border-gray-300" />
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center w-full md:w-auto">
            {categoryData.map((category) => (
              <button
                key={category}
                onClick={() => setCurrentCategory(category)}
                className={`
                  px-3 sm:px-5 md:px-8
                  py-2.5 sm:py-3
                  text-xs sm:text-sm md:text-[17px]
                  font-semibold
                  cursor-pointer
                  transition-all
                  duration-300
                  border border-gray-300
                  min-w-[100px] sm:min-w-[130px] md:min-w-[180px]
                  ${
                    category === currentCategory
                      ? "text-[#c99471] bg-gray-50"
                      : "text-gray-800 bg-white hover:text-[#c99471]"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right Line */}
          <div className="hidden lg:block flex-1 max-w-[100px]">
            <hr className="border-gray-300" />
          </div>
        </div>

        {/* =========================
            LOADING
        ========================= */}
        {loading ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-gray-500 text-base sm:text-lg">
              Loading Products...
            </p>
          </div>
        ) : finalData.length > 0 ? (
          /* =========================
             PRODUCTS
          ========================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {finalData.map((item) => (
              <ProductShowComponents key={item._id} value={item} />
            ))}
          </div>
        ) : (
          /* =========================
             NO PRODUCTS
          ========================= */
          <div className="text-center py-12 sm:py-16">
            <p className="text-gray-500 text-base sm:text-lg">
              No products available
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductTabs;

/* =====================================================
   PRODUCT CARD
===================================================== */

const ProductShowComponents = ({ value }) => {
  console.log("PARENT CATEGORY:", value.parentCategory);
  console.log("SUB CATEGORY:", value.subCategory);
  console.log("SUB SUB CATEGORY:", value.subSubCategory);

  const dispatch = useDispatch();

  const {
    _id,
    productName,
    parentCategory,
    productImage,
    productPrice,
    productActualPrice,
  } = value;

  // =========================
  // GET CART FROM REDUX
  // =========================
  const cart = useSelector((state) => state.cartStore?.cart || []);

  // =========================
  // CHECK PRODUCT IN CART
  // =========================
  const isInCart = cart.some((item) => item._id === _id);

  // =========================
  // WISHLIST STATE
  // =========================
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // =========================
  // IMAGE URL
  // =========================
  const BACKENDURL = "https://furniture-website-ienf.onrender.com";

  const imageUrl = productImage
    ? `${BACKENDURL}/uploads/product/${encodeURIComponent(productImage)}`
    : "";

  // =========================
  // CHECK PRODUCT IN WISHLIST
  // =========================
  const checkWishlist = async () => {
    try {
      const token = Cookies.get("user_login");

      if (!token) {
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APIBASEPATH}wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("CHECK WISHLIST RESPONSE:", response.data);

      if (response.data._status) {
        const wishlistData = response.data._wishlistData || [];

        const exists = wishlistData.some((item) => item.productId?._id === _id);

        setIsWishlisted(exists);
      }
    } catch (error) {
      console.log("CHECK WISHLIST ERROR:", error);
    }
  };

  // =========================
  // CHECK WISHLIST ON LOAD
  // =========================
  useEffect(() => {
    checkWishlist();
  }, [_id]);

  // =========================
  // ADD / REMOVE WISHLIST
  // =========================
  const handleWishlist = async () => {
    try {
      const token = Cookies.get("user_login");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      setWishlistLoading(true);

      // =========================
      // REMOVE FROM WISHLIST
      // =========================
      if (isWishlisted) {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_APIBASEPATH}wishlist/remove/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("REMOVE WISHLIST RESPONSE:", response.data);

        if (response.data._status) {
          setIsWishlisted(false);

          toast.success("Product removed from wishlist");
        } else {
          toast.error(response.data._message);
        }
      }

      // =========================
      // ADD TO WISHLIST
      // =========================
      else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_APIBASEPATH}wishlist/add`,
          {
            productId: _id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("ADD WISHLIST RESPONSE:", response.data);

        if (response.data._status) {
          setIsWishlisted(true);

          toast.success("Product added to wishlist");
        } else {
          toast.info(response.data._message);
        }
      }
    } catch (error) {
      console.log("WISHLIST ERROR:", error);

      toast.error("Something went wrong");
    } finally {
      setWishlistLoading(false);
    }
  };

  // =========================
  // ADD / REMOVE CART
  // =========================
  const handleCart = () => {
    if (isInCart) {
      dispatch(deleteCart(_id));

      toast.success("Product removed from cart!");
    } else {
      dispatch(
        addToCart({
          _id: _id,
          productName: productName,
          productImage: productImage,
          productPrice: productPrice,
          productActualPrice: productActualPrice,
          qty: 1,
        }),
      );

      toast.success("Product added to cart!");
    }
  };

  return (
    <div className="group border border-gray-200 bg-white p-2.5 sm:p-3 md:p-4 transition-all duration-300 hover:shadow-md">
      {/* =========================
          PRODUCT IMAGE
      ========================= */}
      <Link href={`/newProduct-server/${_id}`}>
        <div className="overflow-hidden aspect-[4/3] bg-gray-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={productName || "Product image"}
              width={670}
              height={420}
              className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              No Image
            </div>
          )}
        </div>
      </Link>

      {/* =========================
          PRODUCT INFORMATION
      ========================= */}
      <div className="pt-3 sm:pt-4">
        {/* Category */}
        <p className="text-[#696464] text-xs sm:text-sm truncate">
          {parentCategory?.categoryName}
        </p>

        {/* Product Name */}
        <Link href={`/newProduct-server/${_id}`}>
          <h3
            className="
              font-semibold
              text-[15px]
              sm:text-base
              md:text-lg
              mt-1
              min-h-[44px]
              sm:min-h-[48px]
              md:min-h-[56px]
              leading-5
              sm:leading-6
              hover:text-[#c99471]
              transition-colors
              duration-300
              line-clamp-2
            "
          >
            {productName}
          </h3>
        </Link>

        {/* Divider */}
        <hr className="my-2.5 sm:my-3 border-gray-200" />

        {/* Price */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <p className="text-gray-500 text-xs sm:text-sm md:text-base line-through">
            ₹{productActualPrice}
          </p>

          <p className="text-[#c99471] font-semibold text-sm sm:text-base md:text-lg">
            ₹{productPrice}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-2 mt-4 sm:mt-5">
          {/* =========================
              WISHLIST
          ========================= */}
          <button
            type="button"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            onClick={handleWishlist}
            disabled={wishlistLoading}
            className={`
              w-9
              h-9
              sm:w-10
              sm:h-10
              shrink-0
              flex
              items-center
              justify-center
              border
              rounded-full
              transition-all
              duration-300
              ${
                isWishlisted
                  ? "bg-[#c99471] text-white border-[#c99471]"
                  : "border-gray-300 text-gray-700 hover:bg-[#c99471] hover:text-white hover:border-[#c99471]"
              }
              ${
                wishlistLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }
            `}
          >
            <FaHeart size={14} className="sm:w-[15px] sm:h-[15px]" />
          </button>

          {/* =========================
              ADD / REMOVE CART
          ========================= */}
          {/* <button
            type="button"
            onClick={handleCart}
            className="
              flex-1
              min-w-0
              px-2
              sm:px-3
              md:px-5
              py-2
              sm:py-2.5
              bg-[#F1F1F1]
              text-black
              text-xs
              sm:text-sm
              md:text-base
              font-medium
              rounded-sm
              hover:bg-[#c99471]
              hover:text-white
              transition-all
              duration-300
              cursor-pointer
              truncate
            "
          >
            {isInCart ? "Remove From Cart" : "Add To Cart"}
          </button> */}

          <button
            type="button"
            onClick={handleCart}
            className={`
    flex-1
    min-w-0
    px-2
    sm:px-3
    md:px-5
    py-2
    sm:py-2.5
    text-xs
    sm:text-sm
    md:text-base
    font-medium
    rounded-sm
    transition-all
    duration-300
    cursor-pointer
    truncate
    ${
      isInCart
        ? "bg-[#c99471] text-white hover:bg-[#b47d5d]"
        : "bg-[#F1F1F1] text-black hover:bg-[#c99471] hover:text-white"
    }
  `}
          >
            {isInCart ? "Remove From Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

