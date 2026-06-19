'use client';

import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    id: 1,
    img: '/assets/delivery-van.png',
    title: "Livraison rapide partout au Maroc",
    description: "Faites-vous livrer sous 1 à 5 jours où que vous soyez au Maroc. Grâce à notre système de livraison efficace, vous recevrez votre commande rapidement et en toute sécurité.",
    tag: "Livraison",
  },
  {
    id: 2,
    img: '/assets/support.png',
    title: "Service client personnalisé",
    description: "Grâce à nos conseillers en vente, nous offrons pour chaque client un service personnalisé de qualité depuis l'étape de la commande jusqu'à la livraison. Nos conseillers répondent à toutes vos questions au +2125 24 422 830 (prix d'un appel local) ou par WhatsApp au +2126 61 205 448.",
    tag: "Support",
  },
  {
    id: 3,
    img: '/assets/office.png',
    title: "Service dédié aux entreprises",
    description: "Nous vous accompagnons dans votre processus d'achat avec préparation rapide de devis sous 24 heures, facture délivrée avec garantie pour les produits et divers moyens de paiement professionnels.",
    tag: "Entreprise",
  },
];

// Mobile Component - List layout with image on right
const MobileServices = ({ services, expandedId, toggleExpand }: any) => {
  return (
    <div className="flex flex-col gap-4 md:hidden">
      {services.map((service: any) => {
        const isExpanded = expandedId === service.id;
        const shouldTruncate = service.description.length > 120;
        const displayDescription = isExpanded 
          ? service.description 
          : service.description.slice(0, 120) + (shouldTruncate ? '...' : '');

        return (
          <div
            key={service.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md"
          >
            <div className="flex flex-row">
              {/* Content - Left */}
              <div className="flex-1 p-4 flex flex-col order-2">
                <h3 className="text-[#0F3460] text-sm font-bold uppercase tracking-wider mb-1">
                  {service.tag}
                </h3>
                <h4 className="text-sm font-bold text-gray-900 mb-1">
                  {service.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-xs">
                  {displayDescription}
                </p>
                {shouldTruncate && (
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="mt-2 text-[#0F3460] font-medium text-xs flex items-center gap-1 self-start"
                  >
                    {isExpanded ? (
                      <>
                        Voir moins
                        <ChevronUp className="w-3 h-3" />
                      </>
                    ) : (
                      <>
                        Voir plus
                        <ChevronDown className="w-3 h-3" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Image - Right */}
              <div className="relative w-28 h-28 flex-shrink-0 order-1 overflow-hidden bg-gray-100">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Desktop Component - Grid layout with image on top
const DesktopServices = ({ services, expandedId, toggleExpand }: any) => {
  return (
    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {services.map((service: any) => {
        const isExpanded = expandedId === service.id;
        const shouldTruncate = service.description.length > 150;
        const displayDescription = isExpanded 
          ? service.description 
          : service.description.slice(0, 150) + (shouldTruncate ? '...' : '');

        return (
          <div
            key={service.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={service.img}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 flex-1 flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-[#0F3460] transition-colors duration-300">
                {service.title}
              </h3>
              
              <div className="relative overflow-hidden transition-all duration-500 ease-in-out">
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {displayDescription}
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center">
                {shouldTruncate && (
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="text-[#0F3460] font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all duration-300"
                  >
                    {isExpanded ? (
                      <>
                        Voir moins
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Voir plus
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Featured = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#0F3460]/10 text-[#0F3460] text-sm font-semibold rounded-full mb-3">
            Nos Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Des services conçus pour vous
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Découvrez nos services pensés pour faciliter votre expérience d'achat
          </p>
        </div>

        {/* Mobile Component */}
        <MobileServices 
          services={services} 
          expandedId={expandedId} 
          toggleExpand={toggleExpand} 
        />

        {/* Desktop Component */}
        <DesktopServices 
          services={services} 
          expandedId={expandedId} 
          toggleExpand={toggleExpand} 
        />
      </div>
    </section>
  );
};

export default Featured;