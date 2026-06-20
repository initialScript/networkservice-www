import Contact from '@/components/Contact';
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
              
          
      </div>
      {/* Contact */}
      <Contact />
    </main>
  );
};

export default Page;