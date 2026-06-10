import Link from 'next/link';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#047189] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="http://networkservice-info.com/wp-content/uploads/2025/02/networkservies-logo-1707919409.png"
                alt="Network Service Info"
                className="w-[160px] sm:w-[180px]"
              />
            </div>
            <p className="text-sm leading-relaxed mb-5 text-gray-300">
              Votre partenaire informatique au Maroc. Imprimantes, ordinateurs, accessoires et bien plus, livrés partout au Royaume.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: Facebook, href: '#', hover: 'hover:bg-[#1877f2]', label: 'Facebook' },
                { Icon: Instagram, href: '#', hover: 'hover:bg-[#e4405f]', label: 'Instagram' },
                { Icon: Linkedin, href: '#', hover: 'hover:bg-[#0077b5]', label: 'LinkedIn' },
              ].map(({ Icon, href, hover, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`p-2 rounded-lg bg-white/10 ${hover} text-gray-300 hover:text-white transition-all`}
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
                { label: 'Services', href: '/fr/services' },
                { label: 'Contact', href: '/fr#contact' },
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
                { label: 'Panier', href: '/fr/panier' },
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
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                <span className="text-gray-300">Marrakech, Maroc</span>
              </li>
              <li>
                <a href="tel:+212524000000" className="flex items-center gap-2.5 hover:text-white transition">
                  <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
                  +212 5 24 XX XX XX
                </a>
              </li>
              <li>
                <a href="mailto:contact@network-service-info.com" className="flex items-center gap-2.5 hover:text-white transition">
                  <Mail className="w-4 h-4 flex-shrink-0 text-gray-400" />
                  contact@network-service-info.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 flex-shrink-0 text-gray-400" />
                Lun–Ven : 9h–18h
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© 2025 Network Service Info — Tous droits réservés</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {['Paiement à la livraison', 'Virement bancaire', 'Paiement sécurisé'].map((label) => (
              <span key={label} className="px-2 py-0.5 rounded border border-white/20 text-gray-300">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}