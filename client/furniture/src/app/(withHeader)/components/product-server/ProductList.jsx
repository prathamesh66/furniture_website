"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Breadcrumb from '../common/Breadcrumb'

const Productlist = ({data}) => {

    let [product, setProduct] = useState(data.products)


  return (
    <div className="max-w-[1320px] mx-auto my-10 ">
      <div>
        <Breadcrumb title={"Product Server"} />
      </div>

      <div className="grid grid-cols-4 gap-5 mt-5">
        {product.map((value, index) => {
          return <ProductCard key={index} value={value} />;
        })}
      </div>
    </div>
  );
}

export default Productlist


function ProductCard({value}) {

    let { id, title, description, price, thumbnail } = value;

    return (
      <div className="bg-neutral-primary-soft block max-w-sm p-6 rounded-base border">
        <div className=" ">
          <Image
            alt="image"
            width={250}
            height={200}
            src={thumbnail}
            style={{ color: "transparent" }}
          />
        </div>
        <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">
          {title}
        </h5>
        <p className="mb-6 text-body">{description}</p>
        <Link
          href={`/product-server/${id}`}
          className="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Read more
          <svg
            className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </Link>
      </div>
    );
}