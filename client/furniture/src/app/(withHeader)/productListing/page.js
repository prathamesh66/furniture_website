import React from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import { FaHeart } from "react-icons/fa6";
import Image from "next/image";
// import { ProductData } from "../Data/ProductData";

const page = () => {


  let productData = [
    {
      id: 1,
      category: "Featured",
      name: "Nest Of Tables",
      description: "Caroline Study Tables",
      image: "/images/1617829052195Caroline Study Tables__.jpg",
      originalPrice: "Rs. 3,000",
      salePrice: "Rs. 2,500",
    },

    {
      id: 2,
      category: "Featured",
      name: "Coffee Tables",
      description: "Evan Coffee Table",
      image: "/images/1617829892944Evan%20Coffee%20Table__.jpg",
      originalPrice: "Rs. 2,600",
      salePrice: "Rs. 2,300",
    },
  ];


  

  return (
    <section>
      <div>
        <Breadcrumb title={"Product Listing"} />
      </div>

      <div className="w-[1320px] mx-auto">
        <hr className="text-[#ccc]" />

        <div className="mt-10 flex gap-10">
          {/* left side */}

          <div className="w-[25%] ">
            <div className="h-[400px] overflow-y-auto  border-b border-r-[5px] border-[#ccc] ">
              <h2 className="font-semibold text-[22px]">Categories</h2>

              <div className="mt-8">
                <h3 className="text-[#5A5A5A] font-semibold text-[18px] ">
                  Tables
                </h3>
                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Side and End Tables</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Nest Of Tables</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Coffee Tables Sets</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Cofee Tables</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Dinning Tables</p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-[#5A5A5A] font-semibold text-[18px] ">
                  Mirror
                </h3>
                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Fancy Mirror</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Wooden Mirros</p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-[#5A5A5A] font-semibold text-[18px] ">
                  Living Storage/collections
                </h3>
                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Prayer Units</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Display Unit</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Shoe Racks</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Chest Of Drawers</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Cabinets and Sideboard</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Book Shelves</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Tv Units</p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-[#5A5A5A] font-semibold text-[18px] ">
                  Sofa Cum Bed
                </h3>
                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Wooden Sofa Cum Bed</p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-[#5A5A5A] font-semibold text-[18px] ">
                  Sofa Sets
                </h3>
                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Sofa Cover</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">L Shape Sofa</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">1 Seater Sofa</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">2 Seater Sofa</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">3 Seater Sofa</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Wooden Sofa Sets</p>
                </div>

                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Normal</p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-[#5A5A5A] font-semibold text-[18px] ">
                  Swing Jhula
                </h3>
                <div className="flex gap-2 mt-5">
                  <input type="checkbox" className="w-4" />
                  <p className="text-[#646464]">Wooden Jhula</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-[#5A5A5A] font-semibold text-[18px] ">
                Material
              </h3>
              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Rose Wood</p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Teak Wood</p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Satin Wood</p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Sal Wood</p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Marandi Wood</p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Mahogany Wood</p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Mulberry Wood</p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">JackFruit </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-[#5A5A5A] font-semibold text-[18px] ">
                Color
              </h3>
              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Burnt Amber</p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Golden Teak</p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Carbon Black</p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Faded Oak</p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Weathered French Grey</p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Faded Ochre</p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Weathered Walnut</p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Cobalt Blue </p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Mango Green </p>
              </div>

              <div className="flex gap-2 mt-5">
                <input type="checkbox" className="w-4" />
                <p className="text-[#646464]">Black Finish</p>
              </div>
            </div>
          </div>

          {/* Right Side  */}
          <div className=" w-[74%]">
            <div className="border border-[#ccc] rounded-sm flex gap-8 justify-end p-3  items-center">
              <div className="">
                <label for="sort by" className="mr-4">
                  Sort By:
                </label>
                <select
                  name=""
                  id=""
                  className="border p-2 border-[#ccc] rounded-sm cursor-pointer"
                >
                  <option value="">Sort By</option>
                  <option value="">Featured Products</option>
                  <option value="">New Arrivals</option>
                  <option value="">On Sale</option>
                  <option value="">Best Sellings</option>
                  <option value="">Sort By Price: low to high</option>
                  <option value="">Sort By Price: high to low</option>
                  <option value="">Product Name: A to Z</option>
                  <option value="">Product Name: Z to A</option>
                </select>
              </div>

              <div>
                <p>Showing 1–1 of 1 results</p>
              </div>
            </div>

            <div className="grid grid-cols-3 mt-5">
              {productData.map((value, index) => (
                <div key={index} className="m-2">
                  <ProductShowComponents value={value} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;


const ProductShowComponents = ({ value }) => {
  const { name, description, image, originalPrice, salePrice } = value;

  return (
    <div className="bg-white shadow-md overflow-hidden">
      {/* Image */}
      <div className="overflow-hidden group cursor-pointer">
        <Image
          src={image}
          alt={description}
          width={400}
          height={300}
          className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-center text-gray-500">{name}</p>

        <h3 className="text-center font-bold text-[18px] mt-4 min-h-[60px]">
          {description}
        </h3>

        <hr className="my-4 border-gray-200" />

        <div className="flex justify-center items-center gap-2">
          <span className="line-through text-gray-500">{originalPrice}</span>

          <span className="font-bold text-[#c99471]">{salePrice}</span>
        </div>

        <div className="flex justify-center gap-1 mt-5">
          <button className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-[#c99471] hover:text-white transition cursor-pointer">
            <FaHeart />
          </button>

          <button className="px-5 bg-[#f3f3f3] hover:bg-[#c99471] hover:text-white transition cursor-pointer">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};