import Contact from '@/components/Contact';
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

        
              

      </div>
      {/* Contact Section */}
        <Contact />
    </main>
  );
};

export default Page;