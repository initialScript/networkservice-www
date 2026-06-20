import Link from 'next/link';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const whatsappNumber = '212750974849'; // Remove the + and special characters
  const whatsappMessage = 'Bonjour, je souhaite obtenir plus d\'informations sur vos produits et services.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // WhatsApp SVG Icon Component
  const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={24} 
      height={24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={2} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
    </svg>
  );

  return (
    <footer className="bg-[#5A7A99] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/assets/main-logo.png"
                alt="Network Service Info"
                className="w-[160px] sm:w-[180px]"
              />
            </div>
            <p className="text-sm leading-relaxed mb-5 text-gray-300">
              Votre partenaire informatique au Maroc. Imprimantes, ordinateurs, accessoires et bien plus, livrés partout au Royaume.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: Facebook, href: 'https://www.facebook.com/NetworkServiceInfo/', hover: 'hover:bg-[#1877f2]', label: 'Facebook' },
                { Icon: Instagram, href: 'https://www.instagram.com/network_service/', hover: 'hover:bg-[#e4405f]', label: 'Instagram' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/network-service-info', hover: 'hover:bg-[#0077b5]', label: 'LinkedIn' },
                { Icon: WhatsAppIcon, href: whatsappUrl, hover: 'hover:bg-[#25D366]', label: 'WhatsApp', custom: true },
              ].map(({ Icon, href, hover, label, custom }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target='_blank'
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-white/10 ${hover} text-white transition hover:text-gray-400 -all`}
                >
                  {custom ? (
                    <Icon className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Catalogue', href: '/catalogue' },
                { label: 'A propos', href: '/a-propos' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-white transition hover:text-gray-400 ">
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
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-100" />
                <span className="text-gray-100">Marrakech, Maroc</span>
              </li>
              <li className='flex items-center gap-3'>
                <a href="tel:+212661205448" className="flex items-center gap-2.5 text-white transition hover:text-gray-400 ">
                  <Phone className="w-4 h-4 flex-shrink-0 text-gray-100" />
                  +2126 61 205 448
                </a>
                <a href="tel:+212524422830" className="flex items-center gap-2.5 text-white transition hover:text-gray-400 ">
                  +2125 24 422 830
                </a>
              </li>
              <li>
                <a href="mailto:Contact@networkservice.ma" className="flex items-center gap-2.5 text-white transition hover:text-gray-400 ">
                  <Mail className="w-4 h-4 flex-shrink-0 text-gray-200" />
                  Contact@networkservice.ma
                </a>
              </li>
              {/* WhatsApp Contact Item */}
              <li>
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white transition hover:text-gray-400 "
                >
                  <WhatsAppIcon className="w-4 h-4 flex-shrink-0 " />
                  +212 750-974849 (WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-gray-200">
                <Clock className="w-4 h-4 flex-shrink-0 text-gray-200" />
                <div className='grid '>
                  <p className="text-sm ">Lun-Ven, 8:30 AM–6:30 PM</p>
                  <p className="text-sm ">Sam, 8:30 AM–12:30 PM</p>
                </div>
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