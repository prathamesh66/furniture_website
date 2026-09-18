import Image from 'next/image';
import React from 'react'

const WhyChooseUsAboutUS = () => {
  return (
    <>
      <section className="max-w-[1320px] mx-auto my-3">
        <div className="text-center text-3xl font-semibold">Why chose us?</div>

        <div className="grid grid-cols-3 gap-8 mt-5">
          <div className="">
            <div>
              <Image
                src={
                  "/images/89df96b6-b70d-463b-affb-58a74d49ed6b-1670161065.jpg"
                }
                alt="image"
                width={100}
                height={100}
                className="block mx-auto"
              />
            </div>

            <div className="mt-2 text-center font-semibold">
              100% Money Back Guarantee
            </div>
            <div className="mt-2 text-center text-[#575656]">
              rat metus sodales eget dolor consectetuer, porta ut purus at et
              alias, nulla ornare velit amet enim
            </div>
          </div>

          <div className="">
            <div>
              <Image
                src={
                  "/images/eb6a7519-f0f9-469f-af25-4ba0536060fd-1670161090.jpg"
                }
                alt="image"
                width={100}
                height={100}
                className="block mx-auto"
              />
            </div>

            <div className="mt-2 text-center font-semibold">
              Online Support 24/7
            </div>
            <div className="mt-2 text-center text-[#575656]">
              rat metus sodales eget dolor consectetuer, porta ut purus at et
              alias, nulla ornare velit amet enim
            </div>
          </div>

          <div>
            <div>
              <Image
                src={
                  "/images/d86a55b7-bbd1-4565-86ad-b3463e728fdc-1760712425.jpg"
                }
                alt="image"
                width={400}
                height={595}
              />
            </div>

            <div className="text-center mt-2 text-[20px] font-semibold">
              Creative-Design
            </div>
            <div className="text-center mt-2 text-[#575656]">
              Erat metus sodales eget dolor consectetuer, porta ut purus at et
              alias, nulla ornare velit amet enim God has created everything
              like air,water,tree and metal
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-10">
          <div className="">
            <div>
              <Image
                src={
                  "/images/dbfbc372-1550-40ef-a372-19566e1776b2-1671213170.jpg"
                }
                alt="image"
                width={370}
                height={250}
                className="block mx-auto"
              />
            </div>

            <div className="mt-2 text-center font-semibold">What Do We Do?</div>
            <div className="mt-2 text-center text-[#575656]">
              Mirum est notare quam littera gothica, quam nunc putamus parum
              claram, anteposuerit litterarum formas humanitatis per seacula
              quarta decima et quinta decima.
            </div>
          </div>

          <div className="">
            <div>
              <Image
                src={
                  "/images/0eb1dffc-23c4-4a66-bb02-f5028e3658d3-1671213170.jpg"
                }
                alt="image"
                width={370}
                height={250}
                className="block mx-auto"
              />
            </div>

            <div className="mt-2 text-center font-semibold">Our Mission</div>
            <div className="mt-2 text-center text-[#575656]">
              Mirum est notare quam littera gothica, quam nunc putamus parum
              claram, anteposuerit litterarum formas humanitatis per seacula
              quarta decima et quinta decima.
            </div>
          </div>

          <div className="">
            <div>
              <Image
                src={
                  "/images/028a3c98-0fb9-4fc0-8e7c-0076d254de41-1671213170.jpg"
                }
                alt="image"
                width={370}
                height={250}
                className="block mx-auto"
              />
            </div>

            <div className="mt-2 text-center font-semibold">History Of Us</div>
            <div className="mt-2 text-center text-[#575656]">
              Mirum est notare quam littera gothica, quam nunc putamus parum
              claram, anteposuerit litterarum formas humanitatis per seacula
              quarta decima et quinta decima.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyChooseUsAboutUS;
