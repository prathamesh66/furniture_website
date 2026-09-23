// import Image from 'next/image';
// import React from 'react'

// const WhyChooseUsAboutUS = () => {
//   return (
//     <>
//       <section className="max-w-[1320px] mx-auto my-3">
//         <div className="text-center text-3xl font-semibold">Why chose us?</div>

//         <div className="grid grid-cols-3 gap-8 mt-5">
//           <div className="">
//             <div>
//               <Image
//                 src={
//                   "/images/89df96b6-b70d-463b-affb-58a74d49ed6b-1670161065.jpg"
//                 }
//                 alt="image"
//                 width={100}
//                 height={100}
//                 className="block mx-auto"
//               />
//             </div>

//             <div className="mt-2 text-center font-semibold">
//               100% Money Back Guarantee
//             </div>
//             <div className="mt-2 text-center text-[#575656]">
//               rat metus sodales eget dolor consectetuer, porta ut purus at et
//               alias, nulla ornare velit amet enim
//             </div>
//           </div>

//           <div className="">
//             <div>
//               <Image
//                 src={
//                   "/images/eb6a7519-f0f9-469f-af25-4ba0536060fd-1670161090.jpg"
//                 }
//                 alt="image"
//                 width={100}
//                 height={100}
//                 className="block mx-auto"
//               />
//             </div>

//             <div className="mt-2 text-center font-semibold">
//               Online Support 24/7
//             </div>
//             <div className="mt-2 text-center text-[#575656]">
//               rat metus sodales eget dolor consectetuer, porta ut purus at et
//               alias, nulla ornare velit amet enim
//             </div>
//           </div>

//           <div>
//             <div>
//               <Image
//                 src={
//                   "/images/d86a55b7-bbd1-4565-86ad-b3463e728fdc-1760712425.jpg"
//                 }
//                 alt="image"
//                 width={400}
//                 height={595}
//               />
//             </div>

//             <div className="text-center mt-2 text-[20px] font-semibold">
//               Creative-Design
//             </div>
//             <div className="text-center mt-2 text-[#575656]">
//               Erat metus sodales eget dolor consectetuer, porta ut purus at et
//               alias, nulla ornare velit amet enim God has created everything
//               like air,water,tree and metal
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-8 mt-10">
//           <div className="">
//             <div>
//               <Image
//                 src={
//                   "/images/dbfbc372-1550-40ef-a372-19566e1776b2-1671213170.jpg"
//                 }
//                 alt="image"
//                 width={370}
//                 height={250}
//                 className="block mx-auto"
//               />
//             </div>

//             <div className="mt-2 text-center font-semibold">What Do We Do?</div>
//             <div className="mt-2 text-center text-[#575656]">
//               Mirum est notare quam littera gothica, quam nunc putamus parum
//               claram, anteposuerit litterarum formas humanitatis per seacula
//               quarta decima et quinta decima.
//             </div>
//           </div>

//           <div className="">
//             <div>
//               <Image
//                 src={
//                   "/images/0eb1dffc-23c4-4a66-bb02-f5028e3658d3-1671213170.jpg"
//                 }
//                 alt="image"
//                 width={370}
//                 height={250}
//                 className="block mx-auto"
//               />
//             </div>

//             <div className="mt-2 text-center font-semibold">Our Mission</div>
//             <div className="mt-2 text-center text-[#575656]">
//               Mirum est notare quam littera gothica, quam nunc putamus parum
//               claram, anteposuerit litterarum formas humanitatis per seacula
//               quarta decima et quinta decima.
//             </div>
//           </div>

//           <div className="">
//             <div>
//               <Image
//                 src={
//                   "/images/028a3c98-0fb9-4fc0-8e7c-0076d254de41-1671213170.jpg"
//                 }
//                 alt="image"
//                 width={370}
//                 height={250}
//                 className="block mx-auto"
//               />
//             </div>

//             <div className="mt-2 text-center font-semibold">History Of Us</div>
//             <div className="mt-2 text-center text-[#575656]">
//               Mirum est notare quam littera gothica, quam nunc putamus parum
//               claram, anteposuerit litterarum formas humanitatis per seacula
//               quarta decima et quinta decima.
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default WhyChooseUsAboutUS;



import Image from "next/image";
import React from "react";

const WhyChooseUsAboutUS = () => {
  return (
    <>
      <section className="max-w-[1320px] mx-auto my-6 px-4 md:px-6">
        {/* Title */}
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900">
          Why chose us?
        </h2>

        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-[100px] h-[100px]">
              <Image
                src="/images/89df96b6-b70d-463b-affb-58a74d49ed6b-1670161065.jpg"
                alt="Money Back Guarantee"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-3 font-semibold text-lg text-gray-900">
              100% Money Back Guarantee
            </div>
            <p className="mt-2 text-[#575656] text-sm leading-relaxed max-w-sm">
              rat metus sodales eget dolor consectetuer, porta ut purus at et
              alias, nulla ornare velit amet enim
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-[100px] h-[100px]">
              <Image
                src="/images/eb6a7519-f0f9-469f-af25-4ba0536060fd-1670161090.jpg"
                alt="Online Support 24/7"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-3 font-semibold text-lg text-gray-900">
              Online Support 24/7
            </div>
            <p className="mt-2 text-[#575656] text-sm leading-relaxed max-w-sm">
              rat metus sodales eget dolor consectetuer, porta ut purus at et
              alias, nulla ornare velit amet enim
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-full max-w-[400px] aspect-[400/595]">
              <Image
                src="/images/d86a55b7-bbd1-4565-86ad-b3463e728fdc-1760712425.jpg"
                alt="Creative Design"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="mt-3 font-semibold text-[20px] text-gray-900">
              Creative-Design
            </div>
            <p className="mt-2 text-[#575656] text-sm leading-relaxed max-w-sm">
              Erat metus sodales eget dolor consectetuer, porta ut purus at et
              alias, nulla ornare velit amet enim God has created everything
              like air,water,tree and metal
            </p>
          </div>
        </div>

        {/* Bottom Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 md:mt-16">
          {/* What Do We Do */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-full max-w-[370px] aspect-[370/250]">
              <Image
                src="/images/dbfbc372-1550-40ef-a372-19566e1776b2-1671213170.jpg"
                alt="What Do We Do?"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="mt-4 font-semibold text-lg text-gray-900">
              What Do We Do?
            </div>
            <p className="mt-2 text-[#575656] text-sm leading-relaxed max-w-sm">
              Mirum est notare quam littera gothica, quam nunc putamus parum
              claram, anteposuerit litterarum formas humanitatis per seacula
              quarta decima et quinta decima.
            </p>
          </div>

          {/* Our Mission */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-full max-w-[370px] aspect-[370/250]">
              <Image
                src="/images/0eb1dffc-23c4-4a66-bb02-f5028e3658d3-1671213170.jpg"
                alt="Our Mission"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="mt-4 font-semibold text-lg text-gray-900">
              Our Mission
            </div>
            <p className="mt-2 text-[#575656] text-sm leading-relaxed max-w-sm">
              Mirum est notare quam littera gothica, quam nunc putamus parum
              claram, anteposuerit litterarum formas humanitatis per seacula
              quarta decima et quinta decima.
            </p>
          </div>

          {/* History Of Us */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-full max-w-[370px] aspect-[370/250]">
              <Image
                src="/images/028a3c98-0fb9-4fc0-8e7c-0076d254de41-1671213170.jpg"
                alt="History Of Us"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="mt-4 font-semibold text-lg text-gray-900">
              History Of Us
            </div>
            <p className="mt-2 text-[#575656] text-sm leading-relaxed max-w-sm">
              Mirum est notare quam littera gothica, quam nunc putamus parum
              claram, anteposuerit litterarum formas humanitatis per seacula
              quarta decima et quinta decima.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUsAboutUS;
