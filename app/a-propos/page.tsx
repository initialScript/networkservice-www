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
          <section id='contact' className="w-full max-w-7xl mx-auto px-4 lg:px-0 py-6">
              {/* Contact Section */}
        <div className=" bg-gradient-to-br from-gray-50 to-white rounded-2xl lg:p-12 border border-gray-100 py-3 px-1">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-sm font-semibold text-[#0a9099] uppercase tracking-wider mb-2">
              Contactez Nous
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pour plus d'information
            </h3>
            <p className="text-gray-600">
              Pour toute demande d'information, de devis concernant la vente et l'installation de caméras de surveillance, n'hésitez pas à nous contacter.
              Remplissez simplement le formulaire et laissez-nous le reste.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-3 bg-[#0a9099]/10 rounded-lg">
                  <svg className="w-5 h-5 text-[#0a9099]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Téléphone</h4>
                  <p className="text-gray-600 grid">
                    <span>+2125 24 422 830</span>
                    <span>+2126 61 205 448</span>
                  </p>
                  
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-3 bg-[#0a9099]/10 rounded-lg">
                  <svg className="w-5 h-5 text-[#0a9099]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">Contact@networkservice.ma</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-3 bg-[#0a9099]/10 rounded-lg">
                  <svg className="w-5 h-5 text-[#0a9099]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Adresse</h4>
                  <p className="text-gray-600">mmeuble Achourouk Bureau N°4, 2ème Étage Lotissement,</p>
                  <p className="text-sm text-gray-400">Marrakech</p>
                  <p className="text-sm text-gray-400">Lun-Ven, 8:30 AM–6:30 PM</p>
                  <p className="text-sm text-gray-400">Sam, 8:30 AM–12:30 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-5">Envoyez-nous un message</h4>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                    <input
                      type="text"
                      placeholder="Votre nom complet"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9099] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9099] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9099] focus:border-transparent">
                    <option value="">Sélectionnez un sujet</option>
                    <option value="devis">Demande de devis</option>
                    <option value="information">Information produit</option>
                    <option value="installation">Installation caméra</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Votre message ici..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9099] focus:border-transparent resize-none"
                  />
                </div>
                <button className="w-full bg-[#0a9099] hover:bg-[#0a8992] text-white font-semibold py-2.5 rounded-lg transition-colors">
                  ENVOYER MESSAGE
                </button>
              </form>
            </div>
          </div>
              </div>
               
          </section>
    </main>
  );
};

export default Page;