// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import Slider from "react-slick";
// import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
// import { FaHeart } from "react-icons/fa6";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import axios from "axios";

// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, deleteCart } from "@/app/(withHeader)/redux/cartSlice";

// import { toast, ToastContainer } from "react-toastify";
// import Cookies from "js-cookie";

// const BestSelling = () => {
//   const sliderRef = useRef(null);

//   const [products, setProducts] = useState([]);
//   const [imagePath, setImagePath] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getBestSellingProducts = async () => {
//       try {
//         const baseURL = process.env.NEXT_PUBLIC_APIBASEPATH;

//         const response = await fetch(`${baseURL}product/best-selling`);

//         const data = await response.json();

//         setProducts(data.productData || []);
//         setImagePath(data.path || "");
//         setLoading(false);
//       } catch (error) {
//         console.log("BEST SELLING ERROR:", error);
//         setLoading(false);
//       }
//     };

//     getBestSellingProducts();
//   }, []);

//   const settings = {
//     dots: false,
//     infinite: products.length > 4,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     arrows: false,

//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 4,
//         },
//       },
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 576,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <section className="w-full py-10 bg-[#f5f5f5]">
//       <ToastContainer />

//       <div className="max-w-[1320px] mx-auto px-4">
//         {/* Heading */}
//         <div className="flex items-center gap-5 mb-8">
//           <h2 className="text-[32px] font-bold whitespace-nowrap">
//             Bestselling Products
//           </h2>

//           <div className="flex-1 h-[1px] bg-gray-300"></div>

//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               onClick={() => sliderRef.current?.slickPrev()}
//               className="text-[20px] cursor-pointer hover:text-[#c99471]"
//             >
//               <MdArrowBackIosNew />
//             </button>

//             <button
//               type="button"
//               onClick={() => sliderRef.current?.slickNext()}
//               className="text-[20px] cursor-pointer hover:text-[#c99471]"
//             >
//               <MdOutlineArrowForwardIos />
//             </button>
//           </div>
//         </div>

//         {/* Products */}
//         {loading ? (
//           <div className="text-center py-10">
//             Loading Bestselling Products...
//           </div>
//         ) : products.length === 0 ? (
//           <div className="text-center py-10 text-gray-500">
//             No Bestselling Products Available
//           </div>
//         ) : (
//           <Slider ref={sliderRef} {...settings}>
//             {products.map((product) => (
//               <div key={product._id} className="px-2">
//                 <ProductShowComponents value={product} imagePath={imagePath} />
//               </div>
//             ))}
//           </Slider>
//         )}
//       </div>
//     </section>
//   );
// };

// export default BestSelling;

// /* =========================================================
//    PRODUCT COMPONENT
// ========================================================= */

// const ProductShowComponents = ({ value, imagePath }) => {
//   const { _id, productName, productImage, productPrice, productActualPrice } =
//     value;

//   const dispatch = useDispatch();

//   /* =========================
//      CART
//   ========================= */

//   const cart = useSelector((state) => state.cartStore?.cart || []);

//   const isInCart = cart.some((item) => item._id === value._id);

//   /* =========================
//      WISHLIST
//   ========================= */

//   const [isWishlisted, setIsWishlisted] = useState(false);

//   const [wishlistLoading, setWishlistLoading] = useState(false);

//   /* =========================
//      PRODUCT IMAGE
//   ========================= */

//   const imageUrl = productImage
//     ? `${imagePath}${encodeURIComponent(productImage)}`
//     : "";

//   /* =========================
//      CHECK WISHLIST
//   ========================= */

//   const checkWishlist = async () => {
//     try {
//       const token = Cookies.get("user_login");

//       if (!token) return;

//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_APIBASEPATH}wishlist`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       console.log("CHECK WISHLIST RESPONSE:", response.data);

//       if (response.data._status) {
//         const wishlistData = response.data._wishlistData || [];

//         const exists = wishlistData.some((item) => item.productId?._id === _id);

//         setIsWishlisted(exists);
//       }
//     } catch (error) {
//       console.log("CHECK WISHLIST ERROR:", error);
//     }
//   };

//   useEffect(() => {
//     checkWishlist();
//   }, [_id]);

//   /* =========================
//      WISHLIST
//   ========================= */

//   const handleWishlist = async () => {
//     try {
//       const token = Cookies.get("user_login");

//       if (!token) {
//         toast.error("Please login first");
//         return;
//       }

//       setWishlistLoading(true);

//       if (isWishlisted) {
//         const response = await axios.delete(
//           `${process.env.NEXT_PUBLIC_APIBASEPATH}wishlist/remove/${_id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         console.log("REMOVE WISHLIST RESPONSE:", response.data);

//         if (response.data._status) {
//           setIsWishlisted(false);

//           toast.success("Product removed from wishlist");
//         } else {
//           toast.error(response.data._message);
//         }
//       } else {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_APIBASEPATH}wishlist/add`,
//           {
//             productId: _id,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         console.log("ADD WISHLIST RESPONSE:", response.data);

//         if (response.data._status) {
//           setIsWishlisted(true);

//           toast.success("Product added to wishlist");
//         } else {
//           toast.info(response.data._message);
//         }
//       }
//     } catch (error) {
//       console.log("WISHLIST ERROR:", error);

//       toast.error("Something went wrong");
//     } finally {
//       setWishlistLoading(false);
//     }
//   };

//   /* =========================
//      CART
//   ========================= */

//   const handleCart = () => {
//     if (isInCart) {
//       // Remove product from cart
//       dispatch(deleteCart(value._id));

//       toast.success("Product removed from cart");
//     } else {
//       // Add product to cart
//       dispatch(
//         addToCart({
//           _id: value._id,
//           productName: value.productName,
//           productImage: value.productImage,
//           productPrice: value.productPrice,
//           productActualPrice: value.productActualPrice,
//         }),
//       );

//       toast.success("Product added to cart");
//     }
//   };

//   return (
//     <div className="bg-white shadow-md overflow-hidden">
//       {/* Product Image */}

//       <Link href={`/newProduct-server/${_id}`}>
//         <div className="overflow-hidden group cursor-pointer">
//           {imageUrl ? (
//             <img
//               src={imageUrl}
//               alt={productName || "Product image"}
//               width="400"
//               height="300"
//               className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
//             />
//           ) : (
//             <div className="w-full h-[220px] flex items-center justify-center bg-gray-100 text-gray-500">
//               No Image
//             </div>
//           )}
//         </div>
//       </Link>

//       {/* Product Details */}

//       <div className="p-5">
//         <p className="text-center text-gray-500">{productName}</p>

//         <h3 className="text-center font-bold text-[18px] mt-4 min-h-[60px]">
//           {productName}
//         </h3>

//         <hr className="my-4 border-gray-200" />

//         {/* Price */}

//         <div className="flex justify-center items-center gap-2">
//           <span className="line-through text-gray-500">
//             ₹{productActualPrice}
//           </span>

//           <span className="font-bold text-[#c99471]">₹{productPrice}</span>
//         </div>

//         {/* Buttons */}

//         <div className="flex justify-center gap-1 mt-5">
//           {/* Wishlist */}

//           <button
//             type="button"
//             onClick={handleWishlist}
//             disabled={wishlistLoading}
//             className={`w-12 h-12 border border-gray-200 flex items-center justify-center transition cursor-pointer ${
//               isWishlisted
//                 ? "bg-[#c99471] text-white"
//                 : "hover:bg-[#c99471] hover:text-white"
//             }`}
//           >
//             <FaHeart />
//           </button>

//           {/* Cart */}

//           <button
//             type="button"
//             onClick={handleCart}
//             className={`px-5 transition cursor-pointer ${
//               isInCart
//                 ? "bg-[#c99471] text-white hover:bg-[#b77f5e]"
//                 : "bg-[#f3f3f3] hover:bg-[#c99471] hover:text-white"
//             }`}
//           >
//             {isInCart ? "Remove From Cart" : "Add To Cart"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteCart } from "@/app/(withHeader)/redux/cartSlice";

import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

const BestSelling = () => {
  const sliderRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBestSellingProducts = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_APIBASEPATH;

        const response = await fetch(`${baseURL}product/best-selling`);

        const data = await response.json();

        setProducts(data.productData || []);
        setImagePath(data.path || "");
        setLoading(false);
      } catch (error) {
        console.log("BEST SELLING ERROR:", error);
        setLoading(false);
      }
    };

    getBestSellingProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: products.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="hidden lg:block w-full py-10 bg-[#f5f5f5]">
      <ToastContainer />

      <div className="max-w-[1320px] mx-auto px-4">
        {/* ================= HEADING ================= */}

        <div className="flex items-center gap-5 mb-8">
          <h2 className="text-[32px] font-bold whitespace-nowrap">
            Bestselling Products
          </h2>

          <div className="flex-1 h-[1px] bg-gray-300"></div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => sliderRef.current?.slickPrev()}
              className="text-[20px] cursor-pointer hover:text-[#c99471]"
            >
              <MdArrowBackIosNew />
            </button>

            <button
              type="button"
              onClick={() => sliderRef.current?.slickNext()}
              className="text-[20px] cursor-pointer hover:text-[#c99471]"
            >
              <MdOutlineArrowForwardIos />
            </button>
          </div>
        </div>

        {/* ================= PRODUCTS ================= */}

        {loading ? (
          <div className="text-center py-10">
            Loading Bestselling Products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No Bestselling Products Available
          </div>
        ) : (
          <Slider ref={sliderRef} {...settings}>
            {products.map((product) => (
              <div key={product._id} className="px-2">
                <ProductShowComponents value={product} imagePath={imagePath} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default BestSelling;

/* =========================================================
   PRODUCT COMPONENT
========================================================= */

const ProductShowComponents = ({ value, imagePath }) => {
  const { _id, productName, productImage, productPrice, productActualPrice } =
    value;

  const dispatch = useDispatch();

  /* =========================
     CART
  ========================= */

  const cart = useSelector((state) => state.cartStore?.cart || []);

  const isInCart = cart.some((item) => item._id === value._id);

  /* =========================
     WISHLIST
  ========================= */

  const [isWishlisted, setIsWishlisted] = useState(false);

  const [wishlistLoading, setWishlistLoading] = useState(false);

  /* =========================
     PRODUCT IMAGE
  ========================= */

  const BACKENDURL = "https://furniture-website-ienf.onrender.com";

  const imageUrl = productImage
    ? `${BACKENDURL}/uploads/product/${encodeURIComponent(productImage)}`
    : "";

  /* =========================
     CHECK WISHLIST
  ========================= */

  const checkWishlist = async () => {
    try {
      const token = Cookies.get("user_login");

      if (!token) return;

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

  useEffect(() => {
    checkWishlist();
  }, [_id]);

  /* =========================
     WISHLIST
  ========================= */

  const handleWishlist = async () => {
    try {
      const token = Cookies.get("user_login");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      setWishlistLoading(true);

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
      } else {
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

  /* =========================
     CART
  ========================= */

  const handleCart = () => {
    if (isInCart) {
      dispatch(deleteCart(value._id));

      toast.success("Product removed from cart");
    } else {
      dispatch(
        addToCart({
          _id: value._id,
          productName: value.productName,
          productImage: value.productImage,
          productPrice: value.productPrice,
          productActualPrice: value.productActualPrice,
        }),
      );

      toast.success("Product added to cart");
    }
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="bg-white shadow-md overflow-hidden">
      {/* Product Image */}

      <Link href={`/newProduct-server/${_id}`}>
        <div className="overflow-hidden group cursor-pointer">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={productName || "Product image"}
              width="400"
              height="300"
              className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-[220px] flex items-center justify-center bg-gray-100 text-gray-500">
              No Image
            </div>
          )}
        </div>
      </Link>

      {/* Product Details */}

      <div className="p-5">
        <p className="text-center text-gray-500">{productName}</p>

        <h3 className="text-center font-bold text-[18px] mt-4 min-h-[60px]">
          {productName}
        </h3>

        <hr className="my-4 border-gray-200" />

        {/* Price */}

        <div className="flex justify-center items-center gap-2">
          <span className="line-through text-gray-500">
            ₹{productActualPrice}
          </span>

          <span className="font-bold text-[#c99471]">₹{productPrice}</span>
        </div>

        {/* Buttons */}

        <div className="flex justify-center gap-1 mt-5">
          {/* Wishlist */}

          <button
            type="button"
            onClick={handleWishlist}
            disabled={wishlistLoading}
            className={`w-12 h-12 border border-gray-200 flex items-center justify-center transition cursor-pointer ${
              isWishlisted
                ? "bg-[#c99471] text-white"
                : "hover:bg-[#c99471] hover:text-white"
            }`}
          >
            <FaHeart />
          </button>

          {/* Cart */}

          <button
            type="button"
            onClick={handleCart}
            className={`px-5 transition cursor-pointer ${
              isInCart
                ? "bg-[#c99471] text-white hover:bg-[#b77f5e]"
                : "bg-[#f3f3f3] hover:bg-[#c99471] hover:text-white"
            }`}
          >
            {isInCart ? "Remove From Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};