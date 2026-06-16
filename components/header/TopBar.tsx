import { Mail, Phone, Truck } from 'lucide-react'
import React from 'react'

const TopBar = () => {
  return (
      <>
      {/* ── Top bar (desktop) ── */}
      <div className="bg-gray-100 border-b border-gray-200">
  {/* Mobile */}
  <div className="md:hidden overflow-hidden py-1.5">
    <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-xs text-gray-600">
      <span className="flex items-center gap-1.5 shrink-0">
        <Truck className="w-3.5 h-3.5 text-[#E94560]" />
        Livraison rapide partout au Maroc
      </span>

      <a
        href="tel:+212524422813"
        className="flex items-center gap-1 shrink-0"
      >
        <Phone className="w-3 h-3" />
        +2125 24 422 813
      </a>

      <a
        href="mailto:Contact@networkservice.ma"
        className="flex items-center gap-1 shrink-0"
      >
        <Mail className="w-3 h-3" />
        Contact@networkservice.ma
      </a>

      {/* duplicate for infinite loop */}
      <span className="flex items-center gap-1.5 shrink-0">
        <Truck className="w-3.5 h-3.5 text-[#E94560]" />
        Livraison rapide partout au Maroc
      </span>

      <a
        href="tel:+212524422813"
        className="flex items-center gap-1 shrink-0"
      >
        <Phone className="w-3 h-3" />
        +2125 24 422 813
      </a>

      <a
        href="mailto:Contact@networkservice.ma"
        className="flex items-center gap-1 shrink-0"
      >
        <Mail className="w-3 h-3" />
        Contact@networkservice.ma
      </a>
    </div>
  </div>

  {/* Desktop */}
  <div className="hidden md:flex max-w-7xl mx-auto px-4 py-1.5 items-center justify-between text-xs text-gray-600">
    <span className="flex items-center gap-1.5">
      <Truck className="w-3.5 h-3.5 text-[#E94560]" />
      Livraison rapide partout au Maroc
    </span>

    <div className="flex items-center gap-5">
      <a href="tel:+212524422813" className="flex items-center gap-1">
        <Phone className="w-3 h-3" />
        +2125 24 422 813
      </a>

      <a href="mailto:Contact@networkservice.ma" className="flex items-center gap-1">
        <Mail className="w-3 h-3" />
        Contact@networkservice.ma
      </a>
    </div>
  </div>
</div>
      </>
  )
}

export default TopBar