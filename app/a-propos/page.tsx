import Contact from "@/components/Contact";
import ServicesTabs from "@/components/ServiceTabs";
import React from "react";

const Page = () => {
  return (
    <main>
      <section className="relative bg-[#f5f5f5] py-12 md:py-20 px-4 sm:px-6 overflow-hidden">
  {/* Background Watermark Text - responsive sizing & positioning */}
  <h1 className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 text-[40px] sm:text-[60px] md:text-[80px] lg:text-[120px] font-bold text-gray-200/60 whitespace-nowrap pointer-events-none select-none">
    Network Service Info
  </h1>

  <div className="relative max-w-6xl mx-auto text-center">
    {/* Title - responsive font size */}
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6 md:mb-8">
      Notre Entreprise
    </h2>

    {/* Intro - responsive text and padding */}
    <p className="text-base sm:text-lg md:text-[20px] leading-relaxed font-medium text-gray-800 px-2 sm:px-4">
      Network Service Info est en Partenariat avec des éditeurs et
      Constructeurs internationaux, leader de solutions toujours plus
      complètes, cohérentes et à la pointe des technologies de la sécurité
      informatique : afin de répondre précisément aux besoins de nos
      Partenaires.
    </p>

    {/* Bullet Points - responsive text & spacing */}
    <ul className="mt-6 md:mt-8 space-y-3 md:space-y-4 text-left max-w-3xl mx-auto px-2 sm:px-4">
      {[
        "Connaissance pointues de toutes les technologies du marché.",
        "Offre de solution constamment mises à jour en fonction des nouvelles tendances & performance en termes de sécurité IT.",
        "Support technique assuré par nos ingénieurs experts certifiés.",
        "Sécuriser le flux d’information de tout utilisation, quelque soit le réseau et l’emplacement.",
        "Sécurité & accélération avec la visibilité et le contrôle complets que les clients recherchent primordialement."
      ].map((text, idx) => (
        <li key={idx} className="text-sm sm:text-base md:text-[18px] text-black flex items-start gap-2">
          <span className="inline-block mt-0.5">•</span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  </div>
</section>
          {/*  */}
          <ServicesTabs />
          {/* Contact */}
          <Contact />
    </main>
  );
};

export default Page;