"use client"

import Breadcrumb from "@/app/(withHeader)/components/common/Breadcrumb";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetails = () => {

    let [productDetailsData, setProductDetailsData] = useState(null)

    let { id } = useParams()


    let getProductDetails = () => {
        axios
          .get(`https://dummyjson.com/products/${id}`)
          .then((res) => res.data)
          .then((finalRes) => setProductDetailsData(finalRes));
    }

    useEffect(() => {
        getProductDetails();
    },[id])

    return (
      <>
        {productDetailsData && (
          <section className="max-w-7xl mx-auto px-5 py-10">
            <div>
              <Breadcrumb title={productDetailsData.title} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Product Image */}
              <div className="border rounded-lg p-6 flex justify-center items-center bg-white shadow">
                <Image
                  src={productDetailsData.thumbnail}
                  alt={productDetailsData.title}
                  width={300}
                  height={300}
                  className="rounded-lg object-contain"
                />
              </div>

              {/* Product Details */}
              <div>
                <p className="text-sm text-gray-500 uppercase">
                  {productDetailsData.category}
                </p>

                <h1 className="text-4xl font-bold mt-2">
                  {productDetailsData.title}
                </h1>

                <div className="flex items-center gap-3 mt-4">
                  <span className="text-yellow-500 text-lg">
                    ⭐{productDetailsData.rating}
                  </span>

                  <span className="text-green-600 font-semibold">
                    In Stock ({productDetailsData.stock})
                  </span>
                </div>

                <p className="text-3xl font-bold text-blue-600 mt-6">
                  ${productDetailsData.price}
                </p>

                <p className="text-gray-600 leading-7 mt-6">
                  {productDetailsData.description}
                </p>

                <div className="mt-6 space-y-2">
                  <p>
                    <span className="font-semibold">Brand : </span>
                    {productDetailsData.brand}
                  </p>

                  <p>
                    <span className="font-semibold">Category : </span>{" "}
                    {productDetailsData.category}
                  </p>
                </div>

                <div className="mt-8 flex gap-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    Add to Cart
                  </button>

                  <button className="border border-gray-400 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    );
};

export default ProductDetails;
