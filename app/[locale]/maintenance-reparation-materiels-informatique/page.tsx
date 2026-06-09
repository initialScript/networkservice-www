import FixedBackgroundSection from '@/components/FixedBackgroundSection'
import React from 'react'

const Page = () => {
  return (
    <main className='my-10'>
      <FixedBackgroundSection />
      
      {/* Why Choose Us Section */}
      <section className="w-full bg-white py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir <span className="text-[#0a9099]">Network Service Info</span> ?
            </h2>
            <div className="w-20 h-1 bg-[#0a9099] mx-auto rounded-full" />
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 - Notre expérience */}
            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
              <div className="w-20 h-20 bg-[#0a9099]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#0a9099] transition-colors duration-300">
                <svg className="w-10 h-10 text-[#0a9099] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Notre expérience
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nous fournissons des systèmes informatiques et de télécommunication depuis plus de dix ans
              </p>
            </div>

            {/* Feature 2 - Nos compétences */}
            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
              <div className="w-20 h-20 bg-[#0a9099]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#0a9099] transition-colors duration-300">
                <svg className="w-10 h-10 text-[#0a9099] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Nos compétences
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Notre expertise nous permet de concevoir des solutions personnalisées, entièrement adaptées à vos besoins
              </p>
            </div>

            {/* Feature 3 - Nos techniques d'experts */}
            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
              <div className="w-20 h-20 bg-[#0a9099]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#0a9099] transition-colors duration-300">
                <svg className="w-10 h-10 text-[#0a9099] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Nos techniques d'experts
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nos techniciens, experts dans leur domaine, sont tous certifiés et hautement qualifiés
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section - 4 Cards */}
<section className="w-full bg-white ">
  <div className="max-w-7xl mx-auto px-4 lg:px-0">
    {/* Section Header */}
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Dépannage, Assistance et <br />
        <span className="text-[#0a9099]">Maintenance Informatique</span>
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        La Société NETWORK SERVICE INFO s'engage à intervenir sur site dans les plus brefs délais pour le dépannage 
        de logiciels (applications lentes, virus, OS instable...) ou de matériels informatiques (réseau instable, 
        pièces défectueuses...) pour les particuliers et entreprises.
      </p>
    </div>

    {/* Services Grid - 4 columns */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Card 1 - Dépannage Informatique */}
      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <img 
            src="/images/depanage-1.webp" 
            alt="Dépannage Informatique"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h3 className="absolute bottom-4 left-4 text-white text-base md:text-lg font-bold">
            Dépannage Informatique
          </h3>
        </div>
        <div className="p-4">
          <p className="text-gray-600 text-xs mb-2">(Matériel et Logiciel)</p>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Installation et maintenance des matériels
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Installer des périphériques internes
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Installer et configurer des logiciels
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Paramétrer un réseau
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Paramétrer et sécuriser un réseau Wifi
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Éradiquer des virus
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Clone de disques durs
            </li>
          </ul>
        </div>
      </div>

      {/* Card 2 - Assistance Technique */}
      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <img 
            src="/images/depanage-2.webp" 
            alt="Assistance Technique"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h3 className="absolute bottom-4 left-4 text-white text-base md:text-lg font-bold">
            Assistance Technique
          </h3>
        </div>
        <div className="p-4">
          <p className="text-gray-600 text-xs mb-2">en Informatique</p>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Répondre à des questions techniques sur Windows
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Répondre à des questions sur les fonctionnalités avancées d'Excel
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Configurer un compte de messagerie
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Configurer un accès Internet
            </li>
          </ul>
        </div>
      </div>

      {/* Card 3 - Contrat de Maintenance */}
      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <img 
            src="/images/depanage-3.webp" 
            alt="Contrat de Maintenance"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h3 className="absolute bottom-4 left-4 text-white text-base md:text-lg font-bold">
            Contrat de Maintenance
          </h3>
        </div>
        <div className="p-4">
          <p className="text-gray-600 text-xs mb-2">Informatique (Matériel et Logiciel)</p>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Installer des nouvelles configurations
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Contrôler l'état des serveurs
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mises à jour Antivirus
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Vérifier les sauvegardes
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Optimiser les emplacements Wifi
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              La liste est exhaustive
            </li>
          </ul>
        </div>
      </div>

      {/* Card 4 - Sécurité & Protection */}
      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <img 
            src="/images/depanage-4.webp" 
            alt="Sécurité & Protection"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h3 className="absolute bottom-4 left-4 text-white text-base md:text-lg font-bold">
            Sécurité & Protection
          </h3>
        </div>
        <div className="p-4">
          <p className="text-gray-600 text-xs mb-2">(Données et Réseau)</p>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Protection contre les virus et malwares
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Sécurisation du réseau Wifi
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Sauvegarde et restauration des données
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Pare-feu et filtrage
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-[#0a9099] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Surveillance 24h/24
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
          </section>
          
          <section className='w-full max-w-7xl mx-auto px-4 lg:px-0'>
               {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
        {/* Feature 1 - Livraison Gratuite */}
        <div className="group bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
            <div className="w-14 h-14 bg-[#0a9099]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0a9099] transition-colors duration-300">
            <svg className="w-7 h-7 text-[#0a9099] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">LIVRAISON GRATUITE</h4>
            <p className="text-sm text-gray-500">Livraison gratuite sur toutes les commandes</p>
        </div>

        {/* Feature 2 - Retour */}
        <div className="group bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
            <div className="w-14 h-14 bg-[#0a9099]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0a9099] transition-colors duration-300">
            <svg className="w-7 h-7 text-[#0a9099] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">RETOUR</h4>
            <p className="text-sm text-gray-500">Garantie de remboursement sous 7 jours</p>
        </div>

        {/* Feature 3 - Assistance 24h/24 */}
        <div className="group bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
            <div className="w-14 h-14 bg-[#0a9099]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0a9099] transition-colors duration-300">
            <svg className="w-7 h-7 text-[#0a9099] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636L16.95 7.05M7.05 16.95l-1.414 1.414M12 4a8 8 0 100 16 8 8 0 000-16zM9.879 14.121a3 3 0 104.242-4.242 3 3 0 00-4.242 4.242z" />
            </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">ASSISTANCE 24H/24</h4>
            <p className="text-sm text-gray-500">Assistance en ligne 24 heures sur 24</p>
        </div>

        {/* Feature 4 - Paiements */}
        <div className="group bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
            <div className="w-14 h-14 bg-[#0a9099]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0a9099] transition-colors duration-300">
            <svg className="w-7 h-7 text-[#0a9099] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">PAIEMENTS</h4>
            <p className="text-sm text-gray-500">Paiement sécurisé à 100%</p>
        </div>
        </div>
          </section>
    </main>
  )
}

export default Page