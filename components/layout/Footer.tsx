import Link from 'next/link';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-0.5 mb-3">
              <span className="text-2xl font-extrabold text-white">IRIS</span>
              <span className="text-2xl font-extrabold text-[#E94560]">.</span>
              <span className="text-sm font-medium text-gray-500 ms-0.5">MA</span>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Votre partenaire informatique au Maroc. Imprimantes, ordinateurs, accessoires et bien plus, livrés partout au Royaume.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: Facebook, href: '#', hover: 'hover:bg-[#0F3460]', label: 'Facebook' },
                { Icon: Instagram, href: '#', hover: 'hover:bg-[#E94560]', label: 'Instagram' },
                { Icon: Linkedin, href: '#', hover: 'hover:bg-[#0F3460]', label: 'LinkedIn' },
              ].map(({ Icon, href, hover, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`p-2 rounded-lg bg-gray-800 ${hover} text-gray-400 hover:text-white transition-all`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Accueil', href: '/fr' },
                { label: 'Catalogue', href: '/fr/catalogue' },
                { label: 'Marques', href: '#' },
                { label: 'B2B / Entreprises', href: '/fr/b2b' },
                { label: 'Contact', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mon compte */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Mon compte</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Se connecter', href: '/fr/auth/login' },
                { label: 'Créer un compte', href: '/fr/auth/register' },
                { label: 'Mes commandes', href: '/fr/compte/commandes' },
                { label: 'Wishlist', href: '/fr/compte/wishlist' },
                { label: 'Mes adresses', href: '/fr/compte/adresses' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                <span>123 Boulevard Mohammed V, Casablanca, Maroc</span>
              </li>
              <li>
                <a href="tel:+212600000000" className="flex items-center gap-2.5 hover:text-white transition">
                  <Phone className="w-4 h-4 flex-shrink-0 text-gray-500" />
                  +212 6 00 00 00 00
                </a>
              </li>
              <li>
                <a href="mailto:contact@iris.ma" className="flex items-center gap-2.5 hover:text-white transition">
                  <Mail className="w-4 h-4 flex-shrink-0 text-gray-500" />
                  contact@iris.ma
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 flex-shrink-0 text-gray-500" />
                Lun–Ven : 9h–18h
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© 2025 IRIS.MA — Tous droits réservés</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {['Paiement à la livraison', 'Virement bancaire', 'CIH Bank'].map((label) => (
              <span key={label} className="px-2 py-0.5 rounded border border-gray-700">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
