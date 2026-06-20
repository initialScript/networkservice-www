'use client'

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Grid, Tag } from "lucide-react"
import ProductCard from "../catalog/ProductCard"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Props = {
  categories: any[]
  media_url?: string
}

const ProductsByCategories = ({ categories, media_url }: Props) => {
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  
  const categoryScrollRef = useRef<HTMLDivElement>(null)

  const fetchProducts = async (slug: string) => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products?category=${slug}&limit=8`
      );

      const data = await res.json();

      setProducts(data.data ?? []);
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory) {
      fetchProducts(activeCategory);
    }
  }, [activeCategory]);

  // Set first category as active when categories load
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].slug)
    }
  }, [categories, activeCategory])

  // Handle category scroll position
  const checkCategoryScrollPosition = () => {
    const container = categoryScrollRef.current
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container
      setScrollPosition(scrollLeft)
      setMaxScroll(scrollWidth - clientWidth)
    }
  }

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = categoryScrollRef.current.clientWidth * 0.7
      const newPosition = direction === 'left' 
        ? categoryScrollRef.current.scrollLeft - scrollAmount 
        : categoryScrollRef.current.scrollLeft + scrollAmount
      
      categoryScrollRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })
    }
  }

  // Drag handlers for categories
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX
    setStartX(pageX - (categoryScrollRef.current?.offsetLeft || 0))
    setScrollLeft(categoryScrollRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX
    const x = pageX - (categoryScrollRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 1.5
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Set up scroll event listeners
  useEffect(() => {
    const categoryContainer = categoryScrollRef.current
    
    if (categoryContainer) {
      categoryContainer.addEventListener('scroll', checkCategoryScrollPosition)
      checkCategoryScrollPosition()
    }
    
    window.addEventListener('resize', checkCategoryScrollPosition)
    
    return () => {
      if (categoryContainer) categoryContainer.removeEventListener('scroll', checkCategoryScrollPosition)
      window.removeEventListener('resize', checkCategoryScrollPosition)
    }
  }, [categories])

  const handleActiveCategoryClick = (category: any) => {
    setActiveCategory(category.slug)
  }

  if (!categories || categories.length < 1) {
    return null
  }

  const currentCategoryName = categories.find((c: any) => c.slug === activeCategory)?.name_fr || 'Produits'

  return (
    <div className="w-full">
      {/* Browse Categories Header */}
      <div className="flex items-center gap-2 ">
        <Grid className="w-5 h-5 text-[#0F3460]" />
        <h2 className="text-lg md:text-xl font-bold text-gray-900">
          Parcourir les catégories
        </h2>
      </div>

      {/* Categories Carousel with gradient fade effects */}
      <div className="relative group bg-gray-100 px-3 rounded-3xl shadow mt-3">
        {/* Gradient overlays */}
        {scrollPosition > 0 && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        )}
        {scrollPosition < maxScroll - 5 && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        )}

        {/* Left Navigation Button */}
        {scrollPosition > 0 && (
          <button
            onClick={() => scrollCategories('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-1.5 md:p-2 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition-all duration-200"
            aria-label="Previous categories"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {/* Right Navigation Button */}
        {scrollPosition < maxScroll - 5 && (
          <button
            onClick={() => scrollCategories('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-1.5 md:p-2 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition-all duration-200"
            aria-label="Next categories"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        )}

        <div
          ref={categoryScrollRef}
          className={cn(
            "flex overflow-x-auto scroll-smooth gap-3 md:gap-4 py-2 hide-scrollbar",
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          )}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          {categories.map((category: any) => (
            <button
              key={category.id}
              onClick={() => handleActiveCategoryClick(category)}
              className={cn(
                "flex-shrink-0 px-5 md:px-7 py-2.5 md:py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap text-sm md:text-base border-2",
                activeCategory === category.slug 
                  ? "bg-[#0F3460] text-white border-[#0F3460] shadow-md" 
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#0F3460] hover:text-[#0F3460] hover:shadow-sm"
              )}
            >
              <span className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 md:w-4 md:h-4" />
                {category.name_fr}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="py-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0F3460] border-r-transparent"></div>
          <p className="mt-2 text-gray-500">Chargement des produits...</p>
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="flex items-center justify-between mt-6 md:mt-8 mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              {currentCategoryName}
            </h3>
            <Link href={`/catalogue?category=${activeCategory}`} className="text-sm text-gray-500">
              voir plus
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {products.map((product: any) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                media_url={media_url} 
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg mt-6">
          <p className="text-gray-500">
            Aucun produit disponible dans cette catégorie
          </p>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default ProductsByCategories