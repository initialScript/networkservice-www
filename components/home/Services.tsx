'use client'

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const slides = [
    {
      id: 'camera',
      title: 'Vente et installation de caméra de surveillance à Marrakech',
      description: 'Protégez votre domicile ou votre entreprise avec nos solutions de surveillance haut de gamme. Installation professionnelle par nos experts certifiés.',
      features: ['Caméras HD, 4K et IP', 'Installation rapide et professionnelle', 'Support technique 24/7'],
      link: '/installation-camera-de-surveillance-securite',
      linkText: 'En savoir plus',
      bgImage: '/images/emplacement-camera.webp',
      badge: 'Service Premium'
    },
    {
      id: 'software',
      title: 'Logiciel de Gestion Commerciale',
      description: 'Vous recherchez faire face à la concurrence, à la pression exercée sur les volumes et aux exigences des marchés des produits de base actuels, l\'efficacité de vos activités de courtage n\'a jamais été aussi essentielle à votre succès.',
      features: [
        'Sécurité et Efficacité - Automatisation des opérations répétitives',
        'Une Vision Claire de vos Activités - Tableaux de bord en temps réel',
        'Optimisation des performances de votre entreprise'
      ],
      link: '/logiciel-de-gestion-commerciale-maroc',
      linkText: 'En savoir plus',
      bgImage: '/images/logiciel-1.jpeg',
      badge: 'Logiciel Professionnel'
    }
  ]

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    // Reset auto-play timer on manual navigation
    if (isAutoPlaying) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
    }
  }

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

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

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Slides */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              ref={containerRef}
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="min-w-full">
                  <div className="bg-gradient-to-r from-[#0F3460] to-[#1a4a8a] rounded-2xl overflow-hidden min-h-[500px] md:min-h-[450px] lg:min-h-[480px]">
                    <div className="grid md:grid-cols-2 gap-8 h-full">
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        <div className="inline-block bg-[#E94560]/20 rounded-full px-3 py-1 mb-4 w-fit">
                          <span className="text-[#E94560] text-sm font-semibold">{slide.badge}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                          {slide.title}
                        </h3>
                        <p className="text-white/80 mb-6 leading-relaxed">
                          {slide.description}
                        </p>
                        <ul className="space-y-2 mb-6">
                          {slide.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                              <svg className="w-4 h-4 text-[#E94560] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Link 
                          href={slide.link} 
                          className="bg-[#E94560] hover:bg-[#c73350] text-white px-6 py-2.5 rounded-lg font-semibold transition-colors inline-block w-fit"
                        >
                          {slide.linkText}
                        </Link>
                      </div>
                      <div className="relative h-64 md:h-full bg-cover bg-center" style={{
                        backgroundImage: `url("${slide.bgImage}")`
                      }}>
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0F3460] p-2 rounded-full shadow-lg transition-all hover:scale-105 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0F3460] p-2 rounded-full shadow-lg transition-all hover:scale-105 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 cursor-pointer ${
                  currentSlide === index 
                    ? 'w-8 h-2.5 bg-[#E94560] rounded-full' 
                    : 'w-2.5 h-2.5 bg-gray-400 hover:bg-white/90 rounded-full'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Additional Software Content - Image Left, Content Right */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 lg:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image - Left Side */}
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden order-1 md:order-1">
              <Image
                src="/images/logiciel-2.jpg"
                alt="Logiciel de Gestion Commerciale"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F3460]/20 to-transparent" />
            </div>

            {/* Content - Right Side */}
            <div className="order-2 md:order-2">
              <h3 className="text-2xl md:text-3xl font-bold text-[#0F3460] mb-4">
                Sécurité et Efficacité
              </h3>
              <p className="text-gray-600 mb-4">
                Notre logiciel de gestion commerciale intègre plusieurs fonctionnalités conçues pour simplifier, 
                automatiser et accélérer les opérations répétitives (saisie et gestion des données commerciales 
                et comptables). Ils vous aideront à augmenter votre efficacité, à gagner du temps et à réduire 
                le risque d'erreurs.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2 bg-[#0F3460]/5 px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 text-[#0F3460]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm text-gray-700">Sécurité des données</span>
                </div>
                <div className="flex items-center gap-2 bg-[#0F3460]/5 px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 text-[#0F3460]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm text-gray-700">Automatisation</span>
                </div>
                <div className="flex items-center gap-2 bg-[#0F3460]/5 px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 text-[#0F3460]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-sm text-gray-700">Analyse en temps réel</span>
                </div>
              </div>

              {/* Vision Section - Now part of the right content */}
              <div className="mt-6 p-4 bg-[#0F3460]/5 rounded-xl border border-[#0F3460]/10">
                <h4 className="text-lg font-bold text-[#0F3460] mb-2">Une Vision Claire de vos Activités</h4>
                <p className="text-gray-600 text-sm">
                  Nos solutions de gestion commerciale vous permettront de guider vos activités en toute confiance 
                  grâce à l'utilisation de tableaux de bord, conçus pour vous donner une vue claire en temps réel 
                  des chiffres clés. Nos outils d'analyse vous fournissent des informations cruciales pour vous aider 
                  à étudier vos coûts, prendre des décisions, améliorer votre productivité et augmenter vos marges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services