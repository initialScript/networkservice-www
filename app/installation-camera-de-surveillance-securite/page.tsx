import Image from 'next/image';
import React from 'react';

const Page = () => {
  return (
    <main className='mt-1'>
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-0">
        {/* Banner Container */}
        <div 
          className="relative w-full h-[280px] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/service-banner.jpg")'
          }}
        >
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
          
          {/* Content - Left aligned with button */}
          <div className="relative h-full flex flex-col justify-center text-white px-6 md:px-12 lg:px-16">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold ">
              Vente et installation de
              <br />
              caméra de surveillance à
              <br />
              <span className="text-[#0a9099]">
                Marrakech
              </span>
            </h1>
            <button className="bg-[#0a9099] hover:bg-[#0a8992] text-white px-6 py-2 rounded-lg font-semibold w-fit transition-colors mt-3">
              Demander un devis
            </button>
          </div>
        </div>

        {/* Content Section 1 */}
        <div className='grid md:grid-cols-2 my-14 gap-6'>
          <div>
            <h3 className='text-2xl md:text-3xl lg:text-4xl font-semibold'>
              Installation caméra
              de <span className='text-[#0a9099]'>Surveillance</span>
            </h3>
            <p className='mt-4 text-gray-600 lg:text-lg'>
              Installation caméra de surveillance, Network service info propose les meilleures caméras de surveillance et un service d'installation de caméras de surveillance abordable dans toutes les villes du Maroc. Notre équipe expérimentée d'installation de caméras de surveillance est composée d'installateurs locaux de caméras de surveillance, à la fois ingénieurs du logiciel et du matériel, et experts dans le domaine. Nous utilisons les dernières technologies innovantes pour répondre à vos besoins en matière de surveillance vidéo et de sécurité.
            </p>
          </div>
          <div className='grid place-items-center'>
            <Image
              src={'/images/camera_interieur_wifi_2.jpg'}
              alt='camera_interieur_wifi_2'
              width={500}
              height={200}
              className="rounded-xl"
            />
          </div>
        </div>

        {/* Content Section 2 */}
        <div className='grid md:grid-cols-2 my-14 gap-6'>
          <div className='grid place-items-center order-2 md:order-1'>
            <Image
              src={'/images/emplacement-camera.webp'}
              alt='emplacement-camera'
              width={500}
              height={200}
              className="rounded-xl"
            />
          </div>
          <div className='order-1 md:order-2'>
            <h3 className='text-2xl md:text-3xl lg:text-4xl font-semibold'>
              Installation caméra
              de <span className='text-[#0a9099]'>Surveillance</span>
            </h3>
            <p className='mt-4 text-gray-600 lg:text-lg'>
              Network service info est un fournisseur direct de caméras de surveillance, de systèmes de surveillance vidéo et d'équipements de vidéosurveillance. Nous fournissons des caméras de vidéosurveillance analogiques, des caméras de sécurité HD, des caméras IP et des systèmes complets de surveillance vidéo dans toutes les villes du Maroc. Profitez d'une installation rapide et efficace, ainsi que d'un suivi personnalisé pour garantir la sécurité de vos biens et de vos proches.
            </p>
          </div>
        </div>

        {/* Content Section 3 */}
        <div className='grid md:grid-cols-2 my-14 gap-6'>
          <div>
            <h3 className='text-2xl md:text-3xl lg:text-4xl font-semibold'>
              Installation caméra
              de <span className='text-[#0a9099]'>sécurité</span>
            </h3>
            <p className='mt-4 text-gray-600 lg:text-lg'>
              Network service info s'est forgé une réputation auprès du meilleur support technique et du meilleur service client du secteur des caméras de surveillance. Nous prenons le service client au sérieux! Vous ne trouverez aucune plainte ni aucun cas négatif signalé sur notre société pour cette raison. Nous encourageons les clients potentiels à rechercher l'excellente réputation en ligne de Network service info. Laissez-nous apporter notre expertise en matière de caméras de surveillance afin que vous puissiez vous concentrer sur ce que vous faites le mieux.
            </p>
          </div>
          <div className='grid place-items-center'>
            <Image
              src={'/images/security-CCTV-camera.webp'}
              alt='security-CCTV-camera'
              width={500}
              height={200}
              className="rounded-xl"
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="my-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 border border-gray-100">
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
                  <p className="text-gray-600">+212 5 24 XX XX XX</p>
                  <p className="text-sm text-gray-400">Lun-Ven, 9h-18h</p>
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
                  <p className="text-gray-600">contact@network-service-info.com</p>
                  <p className="text-sm text-gray-400">Réponse sous 24h</p>
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
                  <p className="text-gray-600">Marrakech, Maroc</p>
                  <p className="text-sm text-gray-400">Sur rendez-vous</p>
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
      </div>
    </main>
  );
};

export default Page;