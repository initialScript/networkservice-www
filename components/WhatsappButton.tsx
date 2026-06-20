'use client';

import Link from 'next/link';

const WhatsAppButton = () => {
  const whatsappNumber = '212750974849';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleClick = () => {
    console.log('WhatsApp button clicked');
    // Add your analytics tracking here
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 group animate-bounce-slow"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
          <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
        </svg>
        
        {/* Pulse ring animation - also slowed down */}
        <span className="absolute inset-0 rounded-full animate-ping-slow bg-[#25D366] opacity-30"></span>
      </Link>
      
      {/* Tooltip on hover */}
      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-800 text-white text-xs py-1.5 px-3 rounded-lg whitespace-nowrap shadow-lg">
          💬 Contactez-nous
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
        </div>
      </div>

      {/* Custom slow animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;