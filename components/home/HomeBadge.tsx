import Image from "next/image";
import React from "react";

const badges = [
  {
    id: 1,
    desc: "Livraison rapide",
    title: "Partout au Maroc",
    img: "/images/maroc.png",
  },
  {
    id: 2,
    desc: "Garantie incluse",
    title: "Produits garantis",
    img: "/images/garantie.png",
  },
  {
    id: 3,
     desc: "Service professionnel",
    title: "Installation & Conseil",
    img: "/images/services.png",
  },
];

const HomeBadge = () => {

  return (
    <section className="bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundImage: 'url("/images/pattern.jpg")',
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="relative h-[250px] overflow-hidden rounded-2xl bg-white px-8 flex items-center justify-between holographic-card"
          >
            <div className="max-w-[180px] z-10">
              <p className="text-gray-600 ">{item.desc}</p>

              <h2 className="mt-3 text-xl font-bold text-gray-900 leading-tight">
                {item.title}
              </h2>

            </div>

            <div className={`relative w-[140px] h-[140px] shrink-0 ${item.title === 'Partout au Maroc' ? 'w-[180px] h-[180px]' : 'w-[150px] h-[150px]'}`}>
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeBadge;