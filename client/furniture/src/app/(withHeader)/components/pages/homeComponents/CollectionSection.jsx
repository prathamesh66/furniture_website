import Image from 'next/image';
import React from 'react'

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
      <section className="w-full py-5 md:py-10">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {chairCollection.map((value,index)=> {
                return <ChairComponents key={index} value={value} />;
            })}
        </div>
      </section>
    </>
  );
}

export default CollectionSection


let ChairComponents=({value})=>{

    let {name, description, image} = value

    return (
      <div className="shadow-lg ">
        <div className="relative shadow-lg group overflow-hidden ">
          <Image
            src={image}
            alt="image"
            width={570}
            height={394}
            className="group-hover:scale-110 duration-300"
          />

          <div className="absolute top-0 p-5">
            <p className="">{name}</p>
            <p className="font-bold text-[25px]">{description}</p>
          </div>
        </div>
      </div>
    );
}
