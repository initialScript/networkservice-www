import Image from 'next/image';
import React from 'react';

const Page = () => {
  return (
    <main className='mt-1'>
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-0">

        {/* Content Section 1 */}
        <div className='grid md:grid-cols-2 my-14 gap-6'>
          <div>
            <h3 className='text-2xl md:text-3xl lg:text-4xl font-semibold'>
              ILogiciel de Gestion <span className='text-[#0a9099]'>Commerciale</span>
            </h3>
            <p className='mt-4 text-gray-600 lg:text-lg'>
              Vous recherchez faire face à la concurrence, à la pression exercée sur les volumes et aux exigences des marchés des produits de base actuels, l’efficacité de vos activités de courtage n’a jamais été aussi essentielle à votre succès. <a href="#" className='text-blue-500'>Network service info</a> propose des <b>logiciels de gestion commerciale</b> et des solutions permettant d'optimiser les performances de votre entreprise.
            </p>
          </div>
          <div className='grid place-items-center'>
            <Image
              src={'/images/logiciel-1.jpeg'}
              alt='logiciel-1'
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
              src={'/images/logiciel-2.jpg'}
              alt='logiciel-2'
              width={500}
              height={200}
              className="rounded-xl"
            />
          </div>
          <div className='order-1 md:order-2'>
            <h3 className='text-2xl md:text-3xl lg:text-4xl font-semibold'>
              Sécurité et <span className='text-[#0a9099]'>Efficacité</span>
            </h3>
            <p className='mt-4 text-gray-600 lg:text-lg'>
              Notre <b>logiciel de gestion commerciale</b> intègre plusieurs fonctionnalités conçues pour simplifier, automatiser et accélérer les opérations répétitives (saisie et gestion des données commerciales et comptables). Ils vous aideront à augmenter votre efficacité, à gagner du temps et à réduire le risque d’erreurs.
            </p>
          </div>
        </div>

        {/* Content Section 3 */}
        <div className='grid md:grid-cols-2 my-14 gap-6'>
          <div>
            <h3 className='text-2xl md:text-3xl lg:text-4xl font-semibold'>
              Une Vision Claire de vos <span className='text-[#0a9099]'>Activités</span>
            </h3>
            <p className='mt-4 text-gray-600 lg:text-lg'>
              Nos <b>solutions de gestion commerciale</b> vous permettront de guider vos activités en toute confiance grâce à l’utilisation de tableaux de bord, conçus pour vous donner une vue claire en temps réel des chiffres clés. Nos outils d'analyse vous fournissent des informations cruciales pour vous aider à étudier vos coûts, prendre des décisions, améliorer votre productivité et augmenter vos marges.
            </p>
          </div>
          <div className='grid place-items-center'>
            <Image
              src={'/images/logiciel-3.jpg'}
              alt='logiciel-3'
              width={500}
              height={200}
              className="rounded-xl"
            />
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