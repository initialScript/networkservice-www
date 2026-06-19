import React from 'react'

const Services = () => {
  return (
<section className="bg-white py-8">
  <div className="max-w-7xl mx-auto px-4">
    {/* Section Header */}
    <div className="text-center mb-12">
      <span className="text-[#E94560] font-semibold uppercase tracking-wider text-sm">
        Nos Services
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-[#0F3460] mt-2 mb-4">
        Solutions Professionnelles
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        Découvrez nos services de haute qualité pour sécuriser et optimiser votre entreprise
      </p>
    </div>

    {/* Camera Installation Card - Full Width */}
    <div className="mb-16 bg-gradient-to-r from-[#0F3460] to-[#1a4a8a] rounded-2xl overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 md:p-10">
          <div className="inline-block bg-[#E94560]/20 rounded-full px-3 py-1 mb-4">
            <span className="text-[#E94560] text-sm font-semibold">Service Premium</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Vente et installation de <br />
            caméra de surveillance à <br />
            <span className="text-[#E94560]">Marrakech</span>
          </h3>
          <p className="text-white/80 mb-6 leading-relaxed">
            Protégez votre domicile ou votre entreprise avec nos solutions de surveillance 
            haut de gamme. Installation professionnelle par nos experts certifiés.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2 text-white/80 text-sm">
              <svg className="w-4 h-4 text-[#E94560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Caméras HD, 4K et IP
            </li>
            <li className="flex items-center gap-2 text-white/80 text-sm">
              <svg className="w-4 h-4 text-[#E94560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Installation rapide et professionnelle
            </li>
            <li className="flex items-center gap-2 text-white/80 text-sm">
              <svg className="w-4 h-4 text-[#E94560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Support technique 24/7
            </li>
          </ul>
          <button className="bg-[#E94560] hover:bg-[#c73350] text-white px-6 py-2.5 rounded-lg font-semibold transition-colors">
            Demander un devis
          </button>
        </div>
        <div className="relative h-64 md:h-auto bg-cover bg-center" style={{
          backgroundImage: 'url("/images/emplacement-camera.webp")'
        }}>
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    </div>

   

    {/* CTA Button */}
    <div className="text-center">
      <button className="bg-[#E94560] hover:bg-[#c73350] text-white px-8 py-3 rounded-xl font-semibold transition-colors">
        Demander une démonstration
      </button>
    </div>
  </div>
</section>
  )
}

export default Services