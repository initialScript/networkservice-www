import Link from 'next/link';
import { ArrowRight, ChevronRight, CreditCard} from 'lucide-react';
import ProductCard from '@/components/catalog/ProductCard';
import Hero from '@/components/home/Hero';
import HomeBadge from '@/components/home/HomeBadge';
import Services from '@/components/home/Services';
import { Truck, Headphones, Building2 } from 'lucide-react';
import {
  getAllProducts,
  getCategories,
  getRecentProducts,
} from '@/lib/api/products';
import ProductCarousel from '@/components/products/ProductCarousel';
import ProductsByCategories from '@/components/home/ProductsByCategories';
import BrandsMarquee from '@/components/home/BrandsMarquee';
import { getBrands } from '@/lib/api/brands';
import CategoriesGrid from '@/components/home/CategoriesGrid';
import { services } from '@/utils/data/constants';
import Image from 'next/image';
import Featured from '@/components/home/featured';

export const revalidate = 3600;

interface Props {
  params: { locale: string };
}

export default async function HomePage({ params: { locale } }: Props) {
const [recentProducts, categories, brands, inStockProducts] =
  await Promise.all([
    getRecentProducts(),
    getCategories(),
    getBrands(),
    getAllProducts({
      in_stock: "true",
      limit: "100",
    }),
  ]);

  const media_url =process.env.NEXT_PUBLIC_MEDIA_URL
  process.env.NEXT_PUBLIC_MEDIA_URL
  


  return (
    <div>
      {/* ── Hero ── */}
      <Hero locale={locale} />

      <BrandsMarquee brands={brands} />

      <HomeBadge />

      {/* Recent PRODUCTS */}
      <div className='w-full max-w-7xl mx-auto px-4 lg:px-0 mt-4'>
        <ProductCarousel products={recentProducts.slice(0, 8)} media_url={media_url} title='Nouveaux produits' subTitle='Découvrez nos nouveaux produits' />
      </div>

      <CategoriesGrid />
      
        {/* PRODUCTS BY CATEGORIES */}
      <div className='mt-6 lg:mt-12'>
        <div className='w-full max-w-7xl mx-auto px-4 lg:px-0'>
          <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Découvrez nos produits par catégorie
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-1">
            Découvrez nos produits par catégorie
          </p>
        </div>
        <Link 
          href="/catalogue" 
          className="text-sm font-medium text-[#0F3460] hover:underline flex items-center gap-1"
        >
          Tout voir
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
          
        <ProductsByCategories  categories={categories} media_url={media_url} />
        </div>
        </div>

          <Featured />

      {/* SERVICES */}
      <Services />

      {/* Contact */}
          <section id='contact' className="w-full max-w-7xl mx-auto px-4 lg:px-0">
              {/* Contact Section */}
        <div className=" bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 border border-gray-100">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-sm font-semibold text-[#0a9099] uppercase tracking-wider mb-2">
              Contactez Nous
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pour plus d'information
            </h3>
            <p className="text-gray-600">
              Pour toute demande d'information, de devis concernant la vente et l'installation de caméras de surveillance, n'hésitez pas à nous contacter.
              Remplissez simplement le formulaire et laissez-nous le reste.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-3 bg-[#0a9099]/10 rounded-lg">
                  <svg className="w-5 h-5 text-[#0a9099]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Téléphone</h4>
                  <p className="text-gray-600">+212 5 24 XX XX XX</p>
                  <p className="text-sm text-gray-400">Lun-Ven, 9h-18h</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-3 bg-[#0a9099]/10 rounded-lg">
                  <svg className="w-5 h-5 text-[#0a9099]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">contact@network-service-info.com</p>
                  <p className="text-sm text-gray-400">Réponse sous 24h</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-3 bg-[#0a9099]/10 rounded-lg">
                  <svg className="w-5 h-5 text-[#0a9099]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Adresse</h4>
                  <p className="text-gray-600">Marrakech, Maroc</p>
                  <p className="text-sm text-gray-400">Sur rendez-vous</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-5">Envoyez-nous un message</h4>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                    <input
                      type="text"
                      placeholder="Votre nom complet"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9099] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9099] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9099] focus:border-transparent">
                    <option value="">Sélectionnez un sujet</option>
                    <option value="devis">Demande de devis</option>
                    <option value="information">Information produit</option>
                    <option value="installation">Installation caméra</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Votre message ici..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9099] focus:border-transparent resize-none"
                  />
                </div>
                <button className="w-full bg-[#0a9099] hover:bg-[#0a8992] text-white font-semibold py-2.5 rounded-lg transition-colors">
                  ENVOYER MESSAGE
                </button>
              </form>
            </div>
          </div>
              </div>
               
          </section>

      {/* ── In-stock / quick-delivery products ── */}
      {inStockProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Disponible immédiatement</h2>
              <p className="text-sm text-gray-500 mt-0.5">Expédition sous 24–48h</p>
            </div>
            <Link href={`/catalogue?in_stock=true`} className="text-sm font-medium text-[#0F3460] hover:underline flex items-center gap-1">
              Tout voir <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {inStockProducts.map((product:any) => (
              <ProductCard key={product.id} product={product} media_url={media_url} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
