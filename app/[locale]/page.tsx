import Link from 'next/link';
import { ArrowRight} from 'lucide-react';
import ProductCard, { type Product } from '@/components/catalog/ProductCard';
import Hero from '@/components/home/Hero';
import { additionalProducts, fakeProducts } from '@/data/products';
import HomeBadge from '@/components/home/HomeBadge';
import ProductsCarouselSection from '@/components/home/ProductsCarouselSection';
import Services from '@/components/home/Services';

export const revalidate = 3600;

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return fallback;
    return res.json();
  } catch {
    return fallback;
  }
}


interface Props {
  params: { locale: string };
}

export default async function HomePage({ params: { locale } }: Props) {
  const [catRes, featuredRes, inStockRes] = await Promise.all([
    safeFetch<unknown>(`${API}/api/categories`, []),
    safeFetch<unknown>(`${API}/api/products?limit=8&sort=newest`, []),
    safeFetch<unknown>(`${API}/api/products?limit=8&in_stock=true&sort=newest`, []),
  ]);

  // Tolerate different API envelope shapes: { categories: [] } | { data: [] } | []
  const norm = <T,>(r: unknown, key: string): T[] => {
    if (Array.isArray(r)) return r as T[];
    if (r && typeof r === 'object') {
      const obj = r as Record<string, unknown>;
      if (Array.isArray(obj[key])) return obj[key] as T[];
      if (Array.isArray(obj['data'])) return obj['data'] as T[];
    }
    return [];
  };

  // const categories = norm<Category>(catRes, 'categories');
  const featuredProducts = norm<Product>(featuredRes, 'products');
  const inStockProducts = norm<Product>(inStockRes, 'products');


  return (
    <div>
      {/* ── Hero ── */}
      <Hero locale={locale} />

      <HomeBadge />

      {/* CATEGORIES PRODUCTS */}
       <ProductsCarouselSection
          locale={locale}
          products={fakeProducts}
          title = "Nos produits informatiques"
          subtitle="Découvrez notre sélection d'ordinateurs, imprimantes,
    accessoires et équipements professionnels."
        banner='Catalogue'
        haveCategories={true}
        />
      
      {/* ── Featured products ── */}
         {/* <FeaturedProductsSection locale={locale} products={additionalProducts} /> */}
        <ProductsCarouselSection
          locale={locale}
          products={fakeProducts}
          title = "Nouveaux produits"
          subtitle="Les dernières arrivées dans notre catalogue"
          banner='Featured'
        />

      <div className="w-full max-w-7xl mx-auto px-4 lg:px-0">
        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
        {/* Feature 1 - Livraison Gratuite */}
        <div className="group bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
            <div className="w-14 h-14 bg-[#0a9099]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0a9099] transition-colors duration-300">
            <svg className="w-7 h-7 text-[#0a9099] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">LIVRAISON GRATUITE</h4>
            <p className="text-sm text-gray-500">Livraison gratuite sur toutes les commandes</p>
        </div>

        {/* Feature 2 - Retour */}
        <div className="group bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
            <div className="w-14 h-14 bg-[#0a9099]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0a9099] transition-colors duration-300">
            <svg className="w-7 h-7 text-[#0a9099] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">RETOUR</h4>
            <p className="text-sm text-gray-500">Garantie de remboursement sous 7 jours</p>
        </div>

        {/* Feature 3 - Assistance 24h/24 */}
        <div className="group bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
            <div className="w-14 h-14 bg-[#0a9099]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0a9099] transition-colors duration-300">
            <svg className="w-7 h-7 text-[#0a9099] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636L16.95 7.05M7.05 16.95l-1.414 1.414M12 4a8 8 0 100 16 8 8 0 000-16zM9.879 14.121a3 3 0 104.242-4.242 3 3 0 00-4.242 4.242z" />
            </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">ASSISTANCE 24H/24</h4>
            <p className="text-sm text-gray-500">Assistance en ligne 24 heures sur 24</p>
        </div>

        {/* Feature 4 - Paiements */}
        <div className="group bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
            <div className="w-14 h-14 bg-[#0a9099]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0a9099] transition-colors duration-300">
            <svg className="w-7 h-7 text-[#0a9099] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">PAIEMENTS</h4>
            <p className="text-sm text-gray-500">Paiement sécurisé à 100%</p>
        </div>
        </div>
      </div>

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
            <Link href={`/${locale}/catalogue?in_stock=true`} className="text-sm font-medium text-[#0F3460] hover:underline flex items-center gap-1">
              Tout voir <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {inStockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
