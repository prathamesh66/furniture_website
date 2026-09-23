import Link from "next/link";
import React from "react";

const Breadcrumb = ({ title }) => {
  return (
    <>
      <section className="py-5 sm:py-6 md:py-8 px-4">
        <h1 className="text-center font-semibold text-2xl sm:text-3xl md:text-4xl">
          {title}
        </h1>

        <div className="text-center py-2 sm:py-3 text-sm sm:text-base">
          <Link className="mr-2 hover:text-[#c99471]" href={"/"}>
            Home
          </Link>

          {`>`}

          <span className="text-[#c99471] ml-2">{title}</span>
        </div>
      </section>
    </>
  );
};

export default Breadcrumb;
