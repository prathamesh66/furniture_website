"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Breadcrumb from "../components/common/Breadcrumb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast, ToastContainer } from "react-toastify";

const page = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const APIBASEURL = process.env.NEXT_PUBLIC_APIBASEPATH;

  // GET WISHLIST
  const getWishlist = async () => {
    try {
      const token = Cookies.get("user_login");

      if (!token) {
        setWishlistData([]);
        setLoading(false);
        return;
      }

      const response = await axios.get(`${APIBASEURL}wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("WISHLIST RESPONSE:", response.data);

      if (response.data._status) {
        setWishlistData(response.data._wishlistData || []);
      } else {
        toast.error(response.data._message);
      }
    } catch (error) {
      console.log("WISHLIST ERROR:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  // DELETE WISHLIST
  const handleDeleteWishlist = async (productId) => {
    try {
      const token = Cookies.get("user_login");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const response = await axios.delete(
        `${APIBASEURL}wishlist/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("DELETE WISHLIST RESPONSE:", response.data);

      if (response.data._status) {
        toast.success("Product removed from wishlist");

        // Remove product from UI immediately
        setWishlistData((previousData) =>
          previousData.filter((item) => item.productId?._id !== productId),
        );
      } else {
        toast.error(response.data._message);
      }
    } catch (error) {
      console.log("DELETE WISHLIST ERROR:", error);
      toast.error("Something went wrong");
    }
  };

  // ADD TO CART
  const handleCart = (product) => {
    dispatch(
      addToCart({
        _id: product._id,
        productName: product.productName,
        productImage: product.productImage,
        productActualPrice: product.productActualPrice,
        productPrice: product.productPrice,
        qty: 1,
      }),
    );

    toast.success("Product added to cart!");
  };

  return (
    <section className="w-full py-2">
      <ToastContainer />

      <div>
        <Breadcrumb title={"My WishList"} />
      </div>

      <div className="w-full max-w-[1320px] mx-auto my-2 px-4 sm:px-6 lg:px-8">
        <hr className="text-[#ccc]" />

        <div className="mt-6 sm:mt-8 lg:mt-10">
          {loading ? (
            <div className="text-center py-8 sm:py-10">
              <p className="text-sm sm:text-base">Loading wishlist...</p>
            </div>
          ) : wishlistData.length === 0 ? (
            <div className="text-center py-8 sm:py-10 px-4">
              <p className="text-gray-500 text-base sm:text-lg break-words">
                Your wishlist is empty.
              </p>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="text-center bg-[#F2F2F2] border-b-3 border-[#c98d6d]">
                    <th className="py-3 px-4 sm:px-6 lg:px-10">Delete</th>

                    <th className="py-3 px-4 sm:px-6 lg:px-10">Image</th>

                    <th className="py-3 px-4 sm:px-6 lg:px-10">Product</th>

                    <th className="py-3 px-4 sm:px-6 lg:px-10">Price</th>

                    <th className="py-3 px-4 sm:px-6 lg:px-10">Stock Status</th>

                    <th className="py-3 px-4 sm:px-6 lg:px-10">Add To Cart</th>
                  </tr>
                </thead>

                <tbody className="border border-[#ccc]">
                  {wishlistData.map((item) => {
                    const product = item.productId;

                    const imagePath = "http://localhost:8000/uploads/product/";

                    const imageUrl = product?.productImage
                      ? `${imagePath}${product.productImage}`
                      : "";

                    return (
                      <tr
                        key={item._id}
                        className="border-b border-[#ccc] text-center"
                      >
                        {/* DELETE */}
                        <td className="py-4 px-4 sm:px-6 lg:px-10">
                          <button
                            type="button"
                            onClick={() => handleDeleteWishlist(product?._id)}
                            className="cursor-pointer"
                          >
                            <RiDeleteBin6Line className="text-xl text-gray-600 hover:text-red-500" />
                          </button>
                        </td>

                        {/* IMAGE */}
                        <td className="py-4 px-4 sm:px-6 lg:px-10">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={product?.productName || "Product"}
                              className="w-16 h-16 sm:w-20 sm:h-20 object-cover mx-auto"
                            />
                          ) : (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 mx-auto flex items-center justify-center text-sm">
                              No Image
                            </div>
                          )}
                        </td>

                        {/* PRODUCT */}
                        <td className="py-4 px-4 sm:px-6 lg:px-10">
                          <p className="font-medium break-words">
                            {product?.productName}
                          </p>
                        </td>

                        {/* PRICE */}
                        <td className="py-4 px-4 sm:px-6 lg:px-10">
                          <div className="flex flex-col items-center">
                            {product?.productActualPrice >
                              product?.productPrice && (
                              <span className="text-gray-400 line-through text-xs sm:text-sm">
                                Rs.{" "}
                                {product?.productActualPrice?.toLocaleString()}
                              </span>
                            )}

                            <span className="font-medium text-sm sm:text-base">
                              Rs. {product?.productPrice?.toLocaleString()}
                            </span>
                          </div>
                        </td>

                        {/* STOCK */}
                        <td className="py-4 px-4 sm:px-6 lg:px-10">
                          {product?.totalStock > 0 ? (
                            <span className="text-green-600 text-sm sm:text-base whitespace-nowrap">
                              In Stock
                            </span>
                          ) : (
                            <span className="text-red-500 text-sm sm:text-base whitespace-nowrap">
                              Out Of Stock
                            </span>
                          )}
                        </td>

                        {/* ADD TO CART */}
                        <td className="py-4 px-4 sm:px-6 lg:px-10">
                          <button
                            type="button"
                            onClick={() => handleCart(product)}
                            disabled={product?.totalStock <= 0}
                            className={`px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base text-white transition whitespace-nowrap ${
                              product?.totalStock > 0
                                ? "bg-[#c99471] hover:bg-[#b47d5d] cursor-pointer"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                          >
                            Add To Cart
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
