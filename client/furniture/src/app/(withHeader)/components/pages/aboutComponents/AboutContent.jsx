import Image from 'next/image';
import React from 'react'

const AboutContent = () => {
  return (
    <section className="max-w-[1320px] mx-auto ">
      <hr className="text-[#ccc]" />

      <div className="py-5">
        <div className="w-full mx-auto">
          <Image
            src={"/images/983cc349-1718-4290-b7cd-c8eb20459536-1671213069.jpg"}
            alt="image"
            width={1170}
            height={610}
            className="block mx-auto"
          />
        </div>
      </div>

      <div className="">
        <div className="font-semibold text-center text-2xl">Welcome to Monsta!</div>
        <div className="text-center py-2 text-[#575656]">
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          Nam liber tempor cum soluta nobis eleifend option congue nihil
          imperdiet doming id quod mazim placerat facer possim assum. Typi non
          habent claritatem insitam, est usus legentis in iis qui facit eorum
          claritatem.
        </div>
        <div className="text-center py-2 text-[#c99471] italic">
          “There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form.”
        </div>
      </div>
    </section>
  );
}

export default AboutContent
