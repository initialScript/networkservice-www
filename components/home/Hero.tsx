'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const Hero = ({locale}:{locale:string}) => {
  const backgroundImages = [
    {
      url: "/assets/desktop.jpg",
      alt: "Ordinateurs gaming et PC"
    },
    {
      url: "/assets/phones.jpg",
      alt: "phones"
    },
    {
      url: "/assets/impression.jpg",
      alt: "Imprimantes professionnelles"
    },
    {
      url: "/assets/laptop.png",
      alt: "Bureau informatique complet"
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [backgroundImages.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  

  return (
    <section className="relative h-[calc(100vh-65px)] lg:h-[calc(100vh-139px)] flex items-center overflow-hidden">
      {/* Background Carousel with Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 scale-110 animate-ken-burns">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="60vw"
              />
            </div>
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 lg:py-32 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-start">
            <span className="inline-block mb-4 text-xs font-bold tracking-widest uppercase text-[#E94560] bg-black/30 backdrop-blur-sm border border-[#E94560]/30 px-3 py-1 rounded-full">
              Nouveautés {new Date().getFullYear()}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              Votre matériel informatique<br />
              <span className="text-[#E94560]">livré partout au Maroc</span>
            </h1>
            <p className="text-gray-200 text-lg mb-8 max-w-lg mx-auto lg:mx-0 backdrop-blur-sm bg-black/20 rounded-xl p-4">
              Imprimantes, ordinateurs, accessoires — qualité garantie, prix compétitifs, livraison rapide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href={`/catalogue`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E94560] text-white font-semibold rounded-xl hover:bg-[#c73350] transition-all hover:scale-105 text-sm shadow-lg"
              >
                Voir le catalogue <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {backgroundImages.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-4 h-2 bg-[#E94560]'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Add custom animation for Ken Burns effect */}
      <style jsx>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        .animate-ken-burns {
          animation: kenBurns 20s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  )
}

export default Hero