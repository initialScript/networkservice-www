'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Smartphone, 
  Wifi, 
  Mouse, 
  Gamepad, 
  Laptop,
  ChevronRight
} from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Téléphones",
    name_fr: "Téléphones",
    name_en: "Phones",
    slug: "telephones",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop",
    icon: Smartphone,
    description: "Smartphones et téléphones mobiles",
  },
  {
    id: 2,
    name: "Réseaux & WiFi",
    name_fr: "Réseaux & WiFi",
    name_en: "Networks & WiFi",
    slug: "reseaux-wifi",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    icon: Wifi,
    description: "Routeurs, switchs et équipements réseau",
  },
  {
    id: 3,
    name: "Périphériques",
    name_fr: "Périphériques",
    name_en: "Peripherals",
    slug: "peripheriques",
    img: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=400&fit=crop",
    icon: Mouse,
    description: "Claviers, souris, écrans et accessoires",
  },
  {
    id: 4,
    name: "Espace Gaming",
    name_fr: "Espace Gaming",
    name_en: "Gaming Space",
    slug: "espace-gaming",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
    icon: Gamepad,
    description: "PC gamer, accessoires et équipements gaming",
  },
  {
    id: 5,
    name: "Ordinateurs",
    name_fr: "Ordinateurs",
    name_en: "Computers",
    slug: "ordinateurs",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
    icon: Laptop,
    description: "PC portables, fixes et stations de travail",
  },
];

interface CategoryCardProps {
  category: typeof categories[0];
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const IconComponent = category.icon;

  return (
    <Link
      href={`/catalogue?category=${category.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden bg-gray-100">
        {/* Category Image */}
        <Image
          src={category.img}
          alt={category.name}
          fill
          className="object-cover rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500 o"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Icon on top */}
        <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-md">
          <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-[#0F3460]" />
        </div>
        
        {/* Category Name at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
          <h3 className="text-white text-lg md:text-xl lg:text-2xl font-bold">
            {category.name}
          </h3>
          <p className="text-white/80 text-xs md:text-sm mt-1 line-clamp-1">
            {category.description}
          </p>
        </div>
      </div>
      
      {/* Hover overlay with "View Products" button */}
      <div className="absolute inset-0 bg-[#0F3460]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
        <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm font-medium mb-2">Voir les produits</p>
          <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition-colors">
            Explorer
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const CategoriesGrid = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Catégories
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-1">
            Découvrez nos catégories
          </p>
        </div>
        <Link 
          href="/catalogue" 
          className="text-sm font-medium text-[#0F3460] hover:underline flex items-center gap-1"
        >
          Tout voir
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;