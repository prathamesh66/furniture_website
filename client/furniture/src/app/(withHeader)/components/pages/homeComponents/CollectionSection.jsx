import Image from "next/image";
import React from "react";

const CollectionSection = () => {
  let chairCollection = [
    {
      id: 1,
      name: "Design Creative",
      description: "Chair Collection",
      image: "/images/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp",
    },
    {
      id: 2,
      name: "Bestselling Products",
      description: "Chair Collection",
      image: "/images/0d588bec-d9a0-4645-8e7a-b49ef67b34be-1670180400.webp",
    },
    {
      id: 3,
      name: "Onsale Products",
      description: "Chair Collection",
      image: "/images/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp",
    },
  ];

  return (
    <>
      <section className="w-full py-5 sm:py-7 md:py-10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {chairCollection.map((value, index) => {
            return <ChairComponents key={index} value={value} />;
          })}
        </div>
      </section>
    </>
  );
};

export default CollectionSection;

let ChairComponents = ({ value }) => {
  let { name, description, image } = value;

  return (
    <div className="shadow-lg w-full">
      <div className="relative shadow-lg group overflow-hidden w-full">
        <Image
          src={image}
          alt="image"
          width={570}
          height={394}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <div className="absolute top-0 left-0 p-3 sm:p-4 md:p-5">
          <p className="text-sm sm:text-base">{name}</p>

          <p className="font-bold text-[18px] sm:text-[22px] md:text-[25px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
