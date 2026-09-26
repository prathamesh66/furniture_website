"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "../components/common/Breadcrumb";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { addToCart, deleteCart } from "@/app/(withHeader)/redux/cartSlice";
import Link from "next/link";
import Cookies from "js-cookie";

const page = () => {
  const APIBASEURL = process.env.NEXT_PUBLIC_APIBASEPATH;
  const ADMINAPI = process.env.NEXT_PUBLIC_APIBASEPATH_ADMIN;

  const [productData, setProductData] = useState([]);

  const [materialData, setMaterialData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);

  // Selected filters
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // Price Filter
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Sort
  const [sort, setSort] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);

  // ==========================================
  // Pagination
  // ==========================================

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  // ==========================================
  // Get Sub Categories
  // ==========================================

  useEffect(() => {
    if (!APIBASEURL) return;

    axios
      .get(`${APIBASEURL}sub-category/`)
      .then((res) => {
        console.log("SUB CATEGORY LIST RESPONSE:", res.data);

        if (res.data._status) {
          setSubCategoryData(res.data.subCategoryData || []);
        } else {
          setSubCategoryData([]);
        }
      })
      .catch((err) => {
        console.log("SUB CATEGORY LIST ERROR:", err);
        setSubCategoryData([]);
      });
  }, [APIBASEURL]);

  // ==========================================
  // Get Material
  // ==========================================

  useEffect(() => {
    if (!ADMINAPI) return;

    axios
      .get(`${ADMINAPI}material/view`)
      .then((res) => {
        console.log("MATERIAL LIST RESPONSE:", res.data);

        if (res.data._status) {
          setMaterialData(res.data.materialData || []);
        }
      })
      .catch((err) => {
        console.log("MATERIAL LIST ERROR:", err);
      });
  }, [ADMINAPI]);

  // ==========================================
  // Get Color
  // ==========================================

  useEffect(() => {
    if (!APIBASEURL) return;

    axios
      .get(`${APIBASEURL}color/list`)
      .then((res) => {
        console.log("COLOR API RESPONSE:", res.data);

        if (res.data._status) {
          setColorData(res.data.colorData || []);
        }
      })
      .catch((err) => {
        console.log("COLOR API ERROR:", err);
      });
  }, [APIBASEURL]);

  // ==========================================
  // Get Products
  // ==========================================

  const getProducts = async () => {
    try {
      if (!APIBASEURL) return;

      setLoading(true);

      const params = new URLSearchParams();

      // ----------------------------------------
      // Sub Category
      // ----------------------------------------

      if (selectedSubCategories.length > 0) {
        params.append("subCategory", selectedSubCategories.join(","));
      }

      // ----------------------------------------
      // Material
      // ----------------------------------------

      if (selectedMaterials.length > 0) {
        params.append("material", selectedMaterials.join(","));
      }

      // ----------------------------------------
      // Color
      // ----------------------------------------

      if (selectedColors.length > 0) {
        params.append("color", selectedColors.join(","));
      }

      // ----------------------------------------
      // Minimum Price
      // ----------------------------------------

      if (minPrice) {
        params.append("minPrice", minPrice);
      }

      // ----------------------------------------
      // Maximum Price
      // ----------------------------------------

      if (maxPrice) {
        params.append("maxPrice", maxPrice);
      }

      // ----------------------------------------
      // Sort
      // ----------------------------------------

      if (sort) {
        params.append("sort", sort);
      }

      const url = `${APIBASEURL}product/listing${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      console.log("PRODUCT API URL:", url);

      const response = await axios.get(url);

      console.log("PRODUCT LIST RESPONSE:", response.data);

      if (response.data._status) {
        setProductData(response.data._productData || []);
      } else {
        setProductData([]);
      }
    } catch (error) {
      console.log("PRODUCT LIST ERROR:", error);

      setProductData([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Run API when filters change
  // ==========================================

  useEffect(() => {
    setCurrentPage(1);

    getProducts();
  }, [
    selectedSubCategories,
    selectedMaterials,
    selectedColors,
    minPrice,
    maxPrice,
    sort,
  ]);

  // ==========================================
  // Sub Category Filter
  // ==========================================

  const handleSubCategoryChange = (id) => {
    setSelectedSubCategories((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id);
      }

      return [...previous, id];
    });
  };

  // ==========================================
  // Material Filter
  // ==========================================

  const handleMaterialChange = (id) => {
    setSelectedMaterials((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id);
      }

      return [...previous, id];
    });
  };

  // ==========================================
  // Color Filter
  // ==========================================

  const handleColorChange = (id) => {
    setSelectedColors((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id);
      }

      return [...previous, id];
    });
  };

  // ==========================================
  // Clear Filters
  // ==========================================

  const clearFilters = () => {
    setSelectedSubCategories([]);
    setSelectedMaterials([]);
    setSelectedColors([]);
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    setCurrentPage(1);
  };

  // ==========================================
  // Pagination Calculations
  // ==========================================

  const totalPages = Math.ceil(productData.length / productsPerPage);

  const lastProductIndex = currentPage * productsPerPage;

  const firstProductIndex = lastProductIndex - productsPerPage;

  const currentProducts = productData.slice(
    firstProductIndex,
    lastProductIndex,
  );

  // ==========================================
  // Previous Page
  // ==========================================

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((previous) => previous - 1);
    }
  };

  // ==========================================
  // Next Page
  // ==========================================

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((previous) => previous + 1);
    }
  };

  return (
    <section>
      <Breadcrumb title={"Product Listing"} />

      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <ToastContainer />

        <hr className="text-[#ccc]" />

        <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* ======================================
              LEFT SIDE
          ====================================== */}

          <div className="w-full lg:w-[25%]">
            {/* ======================================
                CATEGORIES
            ====================================== */}

            <div className="h-[400px] overflow-y-auto border-b border-r-[5px] border-[#ccc]">
              <h2 className="font-semibold text-xl sm:text-[22px]">
                Categories
              </h2>

              {/* TABLES */}

              <div className="mt-6 sm:mt-8">
                <h3 className="text-[#5A5A5A] font-semibold text-base sm:text-[18px]">
                  Tables
                </h3>

                {subCategoryData
                  .filter(
                    (subCategory) =>
                      subCategory.parentCategory?.categoryName === "Tables",
                  )
                  .map((subCategory) => (
                    <div
                      key={subCategory._id}
                      className="flex gap-2 mt-4 sm:mt-5"
                    >
                      <input
                        type="checkbox"
                        className="w-4 shrink-0"
                        value={subCategory._id}
                        checked={selectedSubCategories.includes(
                          subCategory._id,
                        )}
                        onChange={() =>
                          handleSubCategoryChange(subCategory._id)
                        }
                      />

                      <p className="text-[#646464] break-words">
                        {subCategory.subCategoryName}
                      </p>
                    </div>
                  ))}
              </div>

              {/* MIRROR */}

              <div className="mt-5">
                <h3 className="text-[#5A5A5A] font-semibold text-base sm:text-[18px]">
                  Mirror
                </h3>

                {subCategoryData
                  .filter(
                    (subCategory) =>
                      subCategory.parentCategory?.categoryName === "Mirror",
                  )
                  .map((subCategory) => (
                    <div
                      key={subCategory._id}
                      className="flex gap-2 mt-4 sm:mt-5"
                    >
                      <input
                        type="checkbox"
                        className="w-4 shrink-0"
                        value={subCategory._id}
                        checked={selectedSubCategories.includes(
                          subCategory._id,
                        )}
                        onChange={() =>
                          handleSubCategoryChange(subCategory._id)
                        }
                      />

                      <p className="text-[#646464] break-words">
                        {subCategory.subCategoryName}
                      </p>
                    </div>
                  ))}
              </div>

              {/* LIVING STORAGE / COLLECTIONS */}

              <div className="mt-5">
                <h3 className="text-[#5A5A5A] font-semibold text-base sm:text-[18px] break-words">
                  Living Storage/collections
                </h3>

                {subCategoryData
                  .filter(
                    (subCategory) =>
                      subCategory.parentCategory?.categoryName ===
                      "Living Storage/collections",
                  )
                  .map((subCategory) => (
                    <div
                      key={subCategory._id}
                      className="flex gap-2 mt-4 sm:mt-5"
                    >
                      <input
                        type="checkbox"
                        className="w-4 shrink-0"
                        value={subCategory._id}
                        checked={selectedSubCategories.includes(
                          subCategory._id,
                        )}
                        onChange={() =>
                          handleSubCategoryChange(subCategory._id)
                        }
                      />

                      <p className="text-[#646464] break-words">
                        {subCategory.subCategoryName}
                      </p>
                    </div>
                  ))}
              </div>

              {/* SOFA CUM BED */}

              <div className="mt-5">
                <h3 className="text-[#5A5A5A] font-semibold text-base sm:text-[18px]">
                  Sofa Cum Bed
                </h3>

                {subCategoryData
                  .filter(
                    (subCategory) =>
                      subCategory.parentCategory?.categoryName ===
                      "Sofa Cum Bed",
                  )
                  .map((subCategory) => (
                    <div
                      key={subCategory._id}
                      className="flex gap-2 mt-4 sm:mt-5"
                    >
                      <input
                        type="checkbox"
                        className="w-4 shrink-0"
                        value={subCategory._id}
                        checked={selectedSubCategories.includes(
                          subCategory._id,
                        )}
                        onChange={() =>
                          handleSubCategoryChange(subCategory._id)
                        }
                      />

                      <p className="text-[#646464] break-words">
                        {subCategory.subCategoryName}
                      </p>
                    </div>
                  ))}
              </div>

              {/* SOFA SETS */}

              <div className="mt-5">
                <h3 className="text-[#5A5A5A] font-semibold text-base sm:text-[18px]">
                  Sofa Sets
                </h3>

                {subCategoryData
                  .filter(
                    (subCategory) =>
                      subCategory.parentCategory?.categoryName === "Sofa Sets",
                  )
                  .map((subCategory) => (
                    <div
                      key={subCategory._id}
                      className="flex gap-2 mt-4 sm:mt-5"
                    >
                      <input
                        type="checkbox"
                        className="w-4 shrink-0"
                        value={subCategory._id}
                        checked={selectedSubCategories.includes(
                          subCategory._id,
                        )}
                        onChange={() =>
                          handleSubCategoryChange(subCategory._id)
                        }
                      />

                      <p className="text-[#646464] break-words">
                        {subCategory.subCategoryName}
                      </p>
                    </div>
                  ))}
              </div>

              {/* SWING JHULA */}

              <div className="mt-5">
                <h3 className="text-[#5A5A5A] font-semibold text-base sm:text-[18px]">
                  Swing Jhula
                </h3>

                {subCategoryData
                  .filter(
                    (subCategory) =>
                      subCategory.parentCategory?.categoryName ===
                      "Swing Jhula",
                  )
                  .map((subCategory) => (
                    <div
                      key={subCategory._id}
                      className="flex gap-2 mt-4 sm:mt-5"
                    >
                      <input
                        type="checkbox"
                        className="w-4 shrink-0"
                        value={subCategory._id}
                        checked={selectedSubCategories.includes(
                          subCategory._id,
                        )}
                        onChange={() =>
                          handleSubCategoryChange(subCategory._id)
                        }
                      />

                      <p className="text-[#646464] break-words">
                        {subCategory.subCategoryName}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* MATERIAL */}

            <div className="mt-6 sm:mt-8">
              <h3 className="text-[#5A5A5A] font-semibold text-base sm:text-[18px]">
                Material
              </h3>

              {materialData.map((material) => (
                <div key={material._id} className="flex gap-2 mt-4 sm:mt-5">
                  <input
                    type="checkbox"
                    className="w-4 shrink-0"
                    value={material._id}
                    checked={selectedMaterials.includes(material._id)}
                    onChange={() => handleMaterialChange(material._id)}
                  />

                  <p className="text-[#646464] break-words">
                    {material.materialName}
                  </p>
                </div>
              ))}
            </div>

            {/* COLOR */}

            <div className="mt-6 sm:mt-8">
              <h3 className="text-[#5A5A5A] font-semibold text-base sm:text-[18px]">
                Color
              </h3>

              {colorData.map((color) => (
                <div
                  key={color._id}
                  className="flex gap-2 mt-4 sm:mt-5 items-center"
                >
                  <input
                    type="checkbox"
                    className="w-4 shrink-0"
                    value={color._id}
                    checked={selectedColors.includes(color._id)}
                    onChange={() => handleColorChange(color._id)}
                  />

                  <span
                    className="w-5 h-5 shrink-0 rounded-full border border-gray-300"
                    style={{
                      backgroundColor: color.colorCode,
                    }}
                  />

                  <p className="text-[#646464] break-words">
                    {color.colorName}
                  </p>
                </div>
              ))}
            </div>

            {/* PRICE */}

            <div className="mt-6 sm:mt-8">
              <h3 className="text-[#5A5A5A] font-semibold text-base sm:text-[18px]">
                Price
              </h3>

              <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-5">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full sm:w-[50%] border border-[#ccc] p-2 outline-none"
                />

                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full sm:w-[50%] border border-[#ccc] p-2 outline-none"
                />
              </div>
            </div>

            {/* CLEAR */}

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 sm:mt-8 px-6 py-3 bg-[#c99471] text-white cursor-pointer w-full sm:w-auto"
            >
              Clear Filters
            </button>
          </div>

          {/* ======================================
              RIGHT SIDE
          ====================================== */}

          <div className="w-full lg:w-[74%] min-w-0">
            {/* SORT BAR */}

            <div className="border border-[#ccc] rounded-sm flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-end p-3 sm:p-4 items-stretch sm:items-center">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label htmlFor="sort" className="mb-2 sm:mb-0 sm:mr-4">
                  Sort By:
                </label>

                <select
                  name="sort"
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border p-2 border-[#ccc] rounded-sm cursor-pointer w-full sm:w-auto max-w-full"
                >
                  <option value="">Sort By</option>

                  <option value="featured">Featured Products</option>

                  <option value="newest">New Arrivals</option>

                  <option value="onSale">On Sale</option>

                  <option value="bestSelling">Best Sellings</option>

                  <option value="priceLow">Sort By Price: low to high</option>

                  <option value="priceHigh">Sort By Price: high to low</option>

                  <option value="nameAZ">Product Name: A to Z</option>

                  <option value="nameZA">Product Name: Z to A</option>
                </select>
              </div>

              <div>
                <p className="break-words">
                  Showing {productData.length} results
                </p>
              </div>
            </div>

            {/* PRODUCTS */}

            {loading ? (
              <div className="text-center py-16 sm:py-20">
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : productData.length === 0 ? (
              <div className="text-center py-16 sm:py-20">
                <p className="text-gray-500">No products found.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-3 sm:gap-4">
                  {currentProducts.map((value) => (
                    <div key={value._id} className="m-1 sm:m-2 min-w-0">
                      <ProductShowComponents value={value} />
                    </div>
                  ))}
                </div>

                {/* PAGINATION */}

                {totalPages > 1 && (
                  <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-8 sm:mt-10 mb-8 sm:mb-10">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      disabled={currentPage === 1}
                      className={`px-3 sm:px-5 py-2 border border-[#ccc] transition text-sm sm:text-base ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "hover:bg-[#c99471] hover:text-white cursor-pointer"
                      }`}
                    >
                      Previous
                    </button>

                    <div className="px-3 sm:px-5 py-2 border border-[#ccc] text-sm sm:text-base">
                      Page {currentPage} of {totalPages}
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className={`px-3 sm:px-5 py-2 border border-[#ccc] transition text-sm sm:text-base ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "hover:bg-[#c99471] hover:text-white cursor-pointer"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;

// ======================================
// PRODUCT COMPONENT
// ======================================

const ProductShowComponents = ({ value }) => {
  const dispatch = useDispatch();

  const {
    _id,
    productName,
    productImage,
    productActualPrice,
    productPrice,
    parentCategory,
  } = value;

  const cart = useSelector((state) => state.cartStore?.cart || []);

  const isInCart = cart.some((item) => item._id === _id);

  const imagePath = "http://localhost:8000/uploads/product/";

  const imageUrl = productImage
    ? `https://furniture-website-ienf.onrender.com/uploads/product/${encodeURIComponent(productImage)}`
    : "";
    

  // ==========================================
  // WISHLIST STATE
  // ==========================================

  const [isWishlisted, setIsWishlisted] = useState(false);

  // ==========================================
  // CHECK WISHLIST
  // ==========================================

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

  // ==========================================
  // CHECK WISHLIST WHEN PRODUCT LOADS
  // ==========================================

  useEffect(() => {
    checkWishlist();
  }, [_id]);

  // ==========================================
  // ADD / REMOVE WISHLIST
  // ==========================================

  const handleWishlist = async () => {
    try {
      const token = Cookies.get("user_login");

      // User not logged in
      if (!token) {
        toast.error("Please login first");
        return;
      }

      // ==========================================
      // REMOVE FROM WISHLIST
      // ==========================================

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

        return;
      }

      // ==========================================
      // ADD TO WISHLIST
      // ==========================================

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
    } catch (error) {
      console.log("WISHLIST ERROR:", error);

      toast.error("Something went wrong");
    }
  };

  // ==========================================
  // CART
  // ==========================================

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
          productActualPrice: productActualPrice,
          productPrice: productPrice,
          qty: 1,
        }),
      );

      toast.success("Product added to cart!");
    }
  };

  return (
    <div className="bg-white shadow-md overflow-hidden h-full">
      {/* ==========================================
          IMAGE
      ========================================== */}

      <div className="overflow-hidden group">
        <Link href={`/newProduct-server/${_id}`}>
          <img
            src={imageUrl}
            alt={productName || "Product"}
            className="w-full h-[200px] sm:h-[220px] object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
          />
        </Link>
      </div>

      <div className="p-4 sm:p-5">
        {/* ==========================================
            CATEGORY
        ========================================== */}

        <p className="text-center text-gray-500 text-sm sm:text-base break-words">
          {parentCategory?.categoryName || "Furniture"}
        </p>

        {/* ==========================================
            PRODUCT NAME
        ========================================== */}

        <h3 className="text-center font-bold text-base sm:text-[18px] mt-3 sm:mt-4 min-h-[50px] sm:min-h-[60px] break-words">
          <Link
            href={`/newProduct-server/${_id}`}
            className="hover:text-[#c99471] transition"
          >
            {productName}
          </Link>
        </h3>

        <hr className="my-3 sm:my-4 border-gray-200" />

        {/* ==========================================
            PRICE
        ========================================== */}

        <div className="flex flex-wrap justify-center items-center gap-2">
          <span className="line-through text-gray-500 text-sm sm:text-base">
            ₹{productActualPrice}
          </span>

          <span className="font-bold text-[#c99471] text-sm sm:text-base">
            ₹{productPrice}
          </span>
        </div>

        {/* ==========================================
            BUTTONS
        ========================================== */}

        <div className="flex flex-col sm:flex-row justify-center gap-2 mt-5">
          {/* ==========================================
              WISHLIST
          ========================================== */}

          <button
            type="button"
            onClick={handleWishlist}
            className={`w-full sm:w-12 h-11 sm:h-12 border flex items-center justify-center transition cursor-pointer ${
              isWishlisted
                ? "bg-[#c99471] text-white border-[#c99471]"
                : "border-gray-200 hover:bg-[#c99471] hover:text-white"
            }`}
          >
            <FaHeart />
          </button>

          {/* ==========================================
              CART
          ========================================== */}

          <button
            type="button"
            onClick={handleCart}
            className={`w-full sm:w-auto min-h-11 sm:min-h-12 px-4 sm:px-5 py-2 transition cursor-pointer text-sm sm:text-base break-words ${
              isInCart
                ? "bg-[#c99471] text-white hover:bg-[#b47d5d]"
                : "bg-[#f3f3f3] text-black hover:bg-[#c99471] hover:text-white"
            }`}
          >
            {isInCart ? "Remove From Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
