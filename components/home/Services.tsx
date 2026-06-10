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

    {/* Software Solutions Title */}
    <div className="text-center mb-10">
      <h3 className="text-2xl md:text-3xl font-bold text-[#0F3460] mb-3">
        Logiciel de Gestion Commerciale
      </h3>
      <p className="text-gray-600 max-w-3xl mx-auto">
        Vous recherchez face à la concurrence, à la pression exercée sur les volumes et aux exigences 
        des marchés des produits de base actuels, l'efficacité de vos activités de courtage n'a jamais 
        été aussi essentielle à votre succès.
      </p>
    </div>

    {/* Software Cards Grid */}
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      {/* Card 1 - Logiciel 1 */}
      <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="relative h-56 overflow-hidden bg-gradient-to-r from-[#0F3460] to-[#1a4a8a]">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-20 h-20 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
            <h4 className="text-white font-bold text-lg">Logiciel de Gestion</h4>
            <p className="text-white/80 text-sm">Solution complète pour votre entreprise</p>
          </div>
        </div>
        <div className="p-5">
          <p className="text-gray-600 text-sm mb-4">
            Network service info propose des logiciels de gestion commerciale et des solutions 
            permettant d'optimiser les performances de votre entreprise.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Gestion commerciale et comptable
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Automatisation des opérations
            </li>
          </ul>
        </div>
      </div>

      {/* Card 2 - Logiciel 2 */}
      <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="relative h-56 overflow-hidden bg-gradient-to-r from-[#E94560] to-[#c73350]">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-20 h-20 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
            <h4 className="text-white font-bold text-lg">Solution Optimisée</h4>
            <p className="text-white/80 text-sm">Performance et efficacité garanties</p>
          </div>
        </div>
        <div className="p-5">
          <p className="text-gray-600 text-sm mb-4">
            Nos solutions vous aideront à augmenter votre efficacité, à gagner du temps et à réduire 
            le risque d'erreurs.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Tableaux de bord en temps réel
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Analyse des coûts et performance
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Benefits Row */}
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <div className="bg-gradient-to-br from-[#0F3460] to-[#1a4a8a] rounded-2xl p-6 text-white">
        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h4 className="text-lg font-bold mb-2">Sécurité et Efficacité</h4>
        <p className="text-white/80 text-sm leading-relaxed">
          Notre logiciel de gestion commerciale intègre plusieurs fonctionnalités conçues pour simplifier, 
          automatiser et accélérer les opérations répétitives (saisie et gestion des données commerciales 
          et comptables).
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
        <div className="w-12 h-12 bg-[#E94560]/10 rounded-lg flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-[#E94560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h4 className="text-lg font-bold text-gray-900 mb-2">Une Vision Claire</h4>
        <p className="text-gray-600 text-sm leading-relaxed">
          Nos outils d'analyse vous fournissent des informations cruciales pour vous aider à étudier 
          vos coûts, prendre des décisions, améliorer votre productivité et augmenter vos marges.
        </p>
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