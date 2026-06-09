'use client';

import { AmountBtns } from "@/components/product/AmountBtns";
import ReviewsSection from "@/components/product/ReviewsSection";
import ImageGallery from "@/components/products/ImageGallery";
import ProductCarousel from "@/components/products/ProductCarousel";
import { Button } from "@/components/ui/button";
import { fakeProducts } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { CircleCheck, ShieldCheck, ShoppingCart, Store, Truck, MapPin, Clock, ArrowRight, RefreshCw, Headphones } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ProductsDetailClient = ({
  productId,
}: {
  productId: string;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [infoOpen, setInfoOpen] = useState('description')

  const product = fakeProducts.find(
    (item) => item.id === productId
  );

  const handleInfoOpen = (str: string) => {
    setInfoOpen(str)
  }

 


  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-2xl font-semibold text-gray-800">Product not found</p>
          <p className="text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/products">Back to shop</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const galleryImages = product.images.map((image, index) => ({
    id: `${product.id}-${index}`,
    src: image,
    alt: product.title,
    title: product.title,
  }));

  const specs = product?.specs

  const handleIncrease = () => {
    if (quantity < 99) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

 const addItem = useCartStore((state) => state.addItem);

const handleAddToCart = () => {
  addItem({
    product_id: product.id,
    name: product.title,
    slug: product.slug,
    price: product.price,
    image: product.images[0],
    quantity,
  });
};

  // Format price for better display
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('fr-MA').format(numPrice);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-6 lg:py-10">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery Section */}
        <div className="relative">
          <div className="sticky top-24">
            <ImageGallery images={galleryImages} />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col space-y-6">
          {/* Delivery Badge */}
          <div className="inline-flex w-fit items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium">
            <Truck size={16} className="stroke-emerald-600" />
            <span>Livraison express sous 1-3 jours</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {product.title}
          </h1>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed border-l-2 border-gray-200 pl-4">
            {product.description}
          </p>

          {/* Specs Grid */}
          <div className="bg-gray-50/80 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Spécifications techniques</h3>
            <div className="grid grid-cols-1 gap-3">
              {specs?.processor && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-sm text-gray-500">Processeur</span>
                  <span className="text-sm font-medium text-gray-900">{specs.processor}</span>
                </div>
              )}
              {specs?.ram && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-sm text-gray-500">RAM</span>
                  <span className="text-sm font-medium text-gray-900">{specs.ram}</span>
                </div>
              )}
              {specs?.storage && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-sm text-gray-500">Stockage</span>
                  <span className="text-sm font-medium text-gray-900">{specs.storage}</span>
                </div>
              )}
              {specs?.graphics && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-sm text-gray-500">Carte graphique</span>
                  <span className="text-sm font-medium text-gray-900">{specs.graphics}</span>
                </div>
              )}
              {specs?.display && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-sm text-gray-500">Écran</span>
                  <span className="text-sm font-medium text-gray-900">{specs.display}</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Price Section */}
          <div className="flex items-baseline gap-2 bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 -mx-1">
            <span className="text-3xl lg:text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            <span className="text-lg font-medium text-gray-500">DH</span>
            <span className="text-sm text-gray-400 ml-2">TTC</span>
          </div>

          {/* Assurance Tags */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full">
              <CircleCheck size={16} className="text-emerald-500" />
              <span>Neuf - emballage d'origine</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>Garantie 1 an</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full">
              <Store size={16} className="text-emerald-500" />
              <span>Vendu par Network Service Info</span>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 w-full">
            <div >
              <AmountBtns
                amount={quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                minAmount={1}
                maxAmount={99}
              />
            </div>
            <Button
              onClick={handleAddToCart}
              className="flex-1 gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-6 transition-all duration-200 shadow-md hover:shadow-lg">
              <ShoppingCart size={20} />
              Ajouter au panier
              <ArrowRight size={16} className="opacity-70" />
            </Button>
          </div>

          {/* Delivery and Pickup Options */}
          <div className="mt-4 space-y-3 bg-white rounded-2xl">
            <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl transition-all hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <Truck size={18} className="text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Livraison partout au Maroc</p>
                  <p className="text-sm text-gray-500 mt-0.5">40 DH TTC • Délai 1-3 jours ouvrés</p>
                </div>
              </div>
              <button className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
                Détails
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-emerald-50/30 rounded-xl border border-emerald-100/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <MapPin size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Retrait en magasin (Casablanca)</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      <CircleCheck size={12} />
                      En stock
                    </span>
                    <span className="text-xs text-gray-500">Retrait immédiat</span>
                  </div>
                </div>
              </div>
              <button className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1">
                Horaires & plan
                <Clock size={14} />
              </button>
            </div>
          </div>

          
        </div>
      </div>
        {/* Trust Badge Section */}
      <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
        {/* Paiement sécurisé */}
        <div className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck size={24} className="text-emerald-600" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-gray-800 font-semibold text-sm sm:text-base">Paiement sécurisé</p>
              <p className="text-gray-400 text-xs mt-0.5">100% crypté</p>
            </div>
          </div>
        </div>

        {/* Retours gratuits */}
        <div className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <RefreshCw size={24} className="text-blue-600" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-gray-800 font-semibold text-sm sm:text-base">Retours gratuits</p>
              <p className="text-gray-400 text-xs mt-0.5">Sous 14 jours</p>
            </div>
          </div>
        </div>

        {/* Support client */}
        <div className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Headphones size={24} className="text-orange-600" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-gray-800 font-semibold text-sm sm:text-base">Support client</p>
              <p className="text-gray-400 text-xs mt-0.5">Disponible 7j/7</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* INFO */}
<div className="mt-8 lg:mt-10 w-full">
  <div className="flex items-center gap-6 border-b border-gray-200">
    <button 
      onClick={() => handleInfoOpen('description')} 
      className={`relative pb-3 text-sm font-medium transition-colors duration-200 ${
        infoOpen === 'description' 
          ? 'text-orange-500 border-b-2 border-orange-500' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      DESCRIPTIF
    </button>
    <button 
      onClick={() => handleInfoOpen('fille-technique')} 
      className={`relative pb-3 text-sm font-medium transition-colors duration-200 ${
        infoOpen === 'fille-technique' 
          ? 'text-orange-500 border-b-2 border-orange-500' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      FICHE TECHNIQUE
    </button>
  </div>

  {/* Tab Content */}
  <div className="mt-6">
    {infoOpen === 'description' && product.descriptionHtml && (
      <div 
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
      />
    )}
    
    {infoOpen === 'fille-technique' && product.technicalSheet && (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {product.technicalSheet.map((item, index) => (
              <tr 
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}
              >
                <td className="px-6 py-3 font-medium text-gray-700 border-b border-gray-100 w-1/3">
                  {item.label}
                </td>
                <td className="px-6 py-3 text-gray-600 border-b border-gray-100">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>
      
      {/*  */}
      {/* Similar Products Carousel */}
{(() => {
  const similarProducts = fakeProducts.filter(p => p.id !== product.id).slice(0, 8);
  if (similarProducts.length > 0) {
    return (
      <ProductCarousel
        products={similarProducts}
        title="Produits similaires"
      />
    );
  }
  return null;
      })()}
      
      {/* Reviews Section */}
<ReviewsSection 
  productId={product.id}
  averageRating={product.rating || 4.5}
  totalReviews={128}
/>
    </div>
  );
};

export default ProductsDetailClient;