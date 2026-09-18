import Link from 'next/link';
import React from 'react'

const Breadcrumb = ({ title}) => {
  return (
    <>
      <section className="py-8">
        <h1 className="text-center font-semibold text-4xl">{title}</h1>

        <div className="text-center py-3 ">
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

export default Breadcrumb
