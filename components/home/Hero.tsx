'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Hero = ({ locale }: { locale: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const backgroundImages = [
    {
      url: "/assets/tv.png",
      url_mobile: "/assets/tv-mobile.png",
      alt: "Tv",
      href: '/catalogue?category=tv-televiseur'
    },
    {
      url: "/assets/ordinateur.png",
      url_mobile: "/assets/ordinateur-mobile.png",
      alt: "Ordinateurs gaming et PC",
      href: '/catalogue?category=ordinateur'
    },
    {
      url: "/assets/phones.png",
      url_mobile: "/assets/phones-mobile.png",
      alt: "téléphones",
      href: '/catalogue?category=telephonie'
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) goToNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex, isTransitioning])

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToPrevious = () => {
    goToSlide(currentIndex === 0 ? backgroundImages.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    goToSlide((currentIndex + 1) % backgroundImages.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      diff > 0 ? goToNext() : goToPrevious()
    }
  }

  return (
    // ✅ aspect-[832/1472] on mobile = perfect fit for your images, no cropping
    <section className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-[calc(100vh-139px)] overflow-hidden">

      <div
        className="absolute inset-0 z-0"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ pointerEvents: index === currentIndex ? 'auto' : 'none' }}
          >
            <Link href={image.href} className="block w-full h-full relative">

              {/* ── DESKTOP: blurred bg + contained sharp image ── */}
              <div className="hidden lg:block absolute inset-0">
                {/* Blurred ambient background */}
                <Image
                  src={image.url}
                  alt=""
                  fill
                  aria-hidden="true"
                  className="object-cover scale-110 blur-2xl brightness-50"
                  sizes="100vw"
                  quality={60}
                />
                {/* Sharp contained image */}
                <div className="absolute inset-0 animate-ken-burns">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    priority={index === 0}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    quality={100}
                  />
                </div>
              </div>

              {/* ── MOBILE: full-bleed, aspect ratio drives section height ── */}
              <div className="lg:hidden absolute inset-0 animate-ken-burns">
                <Image
                  src={image.url_mobile}
                  alt={image.alt}
                  priority={index === 0}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  quality={100}
                />
              </div>

            </Link>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
        aria-label="Image précédente"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
        aria-label="Image suivante"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {backgroundImages.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? 'w-8 h-2.5 bg-white rounded-full shadow-lg'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80 rounded-full'
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-ken-burns {
          animation: kenBurns 8s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  )
}

export default Hero