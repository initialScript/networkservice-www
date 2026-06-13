'use client'

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCarousel from "../products/ProductCarousel"
import { cn } from "@/lib/utils"

type Props = {
  products: any[] | { data: any[]; success?: boolean; pagination?: any }
  categories: any[]
  media_url?: string
}

const ProductsByCategories = ({ products, categories, media_url }: Props) => {
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  
  const categoryScrollRef = useRef<HTMLDivElement>(null)

  // Get products array from API response structure
  const getProductsArray = () => {
    if (Array.isArray(products)) {
      return products
    }
    if (products && typeof products === 'object' && 'data' in products) {
      return products.data || []
    }
    return []
  }

  const productsArray = getProductsArray()

  // Set first category as active when categories load
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].slug)
    }
  }, [categories, activeCategory])

  // Filter products when active category changes
useEffect(() => {
  if (activeCategory && productsArray.length > 0) {
    const filtered = productsArray.filter(
      (product: any) => {
        // Check if product has categories array and if any category matches
        if (product.categories && Array.isArray(product.categories)) {
          return product.categories.some((category: any) => category.slug === activeCategory);
        }
        // Fallback for other possible structures
        const categorySlug = product.category?.slug || product.Category?.slug;
        return categorySlug === activeCategory;
      }
    );
    setFilteredProducts(filtered);
  } else if (!activeCategory && productsArray.length > 0) {
    setFilteredProducts(productsArray);
  } else {
    setFilteredProducts([]);
  }


}, [activeCategory, productsArray]);

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
      {/* Categories Carousel */}
      <div className="relative group  bg-gray-100 p-2 rounded-2xl">
        {/* Left Navigation Button */}
        {scrollPosition > 0 && (
          <button
            onClick={() => scrollCategories('left')}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 p-1.5 md:p-2 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-100 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous categories"
          >
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
          </button>
        )}

        {/* Right Navigation Button */}
        {scrollPosition < maxScroll - 5 && (
          <button
            onClick={() => scrollCategories('right')}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 p-1.5 md:p-2 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-100 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Next categories"
          >
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
          </button>
        )}

        <div
          ref={categoryScrollRef}
          className={cn(
            "flex overflow-x-auto scroll-smooth gap-3  hide-scrollbar",
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
                "flex-shrink-0 px-4 md:px-6 py-2 md:py-2.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-sm md:text-base",
                activeCategory === category.slug 
                  ? "bg-[#0F3460] text-white shadow-md" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
            >
              {category.name_fr}
            </button>
          ))}
        </div>
      </div>

      {/* Products Carousel */}
      {filteredProducts.length > 0 ? (
        <ProductCarousel 
          key={activeCategory}
          products={filteredProducts.slice(0, 8)} 
          media_url={media_url} 
          title={currentCategoryName}
        />
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg mt-4">
          <p className="text-gray-500">Aucun produit disponible dans cette catégorie</p>
        </div>
      )}
    </div>
  )
}

export default ProductsByCategories