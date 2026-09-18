import Image from 'next/image'
import React from 'react'

const MapSection = () => {
  return (
    <>
      <section className="max-w-[1320px] mx-auto py-2">
        <hr className="text-[#ccc]" />

        <div className="py-5">
          <Image src={"/images/Screenshot 2026-07-01 103511.png"} alt="image"
          width={1620} 
          height={560}
          />

        </div>
      </section>
    </>
  );
}

export default MapSection
