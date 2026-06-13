// components/product/WhatsAppOrderButton.tsx
'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface WhatsAppOrderButtonProps {
  product: {
    id: string;
    name_fr: string;
    sku: string;
    price: string;
    quantity: number;
    images?: Array<{ url: string; is_primary: boolean }>;
    media_url?: string;
  };
  className?: string;
}

export const WhatsAppOrderButton = ({ product, className = "" }: WhatsAppOrderButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const formatMessage = () => {
    // Get the primary image or first image
    const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];
    const imageUrl = primaryImage ? `${product.media_url}${primaryImage.url}` : '';
    
    // Format price with 2 decimals
    const formattedPrice = new Intl.NumberFormat('fr-MA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(parseFloat(product.price));

    // Create the message
    const message = `*🛍️ NOUVELLE COMMANDE*\n\n` +
      `*📦 Produit :* ${product.name_fr}\n` +
      `*🔖 Référence :* ${product.sku}\n` +
      `*💰 Prix unitaire :* ${formattedPrice} DH\n` +
      `*🔢 Quantité :* ${product.quantity}\n` +
      `*💵 Total :* ${(parseFloat(product.price) * product.quantity).toFixed(2)} DH\n\n` +
      `*📝 Détails de la commande :*\n` +
      `- Produit : ${product.name_fr}\n` +
      `- Quantité : ${product.quantity}\n` +
      `- Prix total : ${(parseFloat(product.price) * product.quantity).toFixed(2)} DH\n\n` +
      `*🔗 Lien produit :* ${window.location.href}\n\n` +
      `*📸 Image du produit :* ${imageUrl}\n\n` +
      `---\n` +
      `_Client intéressé par ce produit, merci de le contacter pour finaliser la commande._`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppClick = () => {
    setIsLoading(true);
    
    // Replace with your business WhatsApp number (without + or spaces)
    const phoneNumber = "212611765659"; // Change this to your number
    
    const message = formatMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
    setIsLoading(false);
  };

  // Get the WhatsApp number from environment variable (optional)
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";

  return (
    <Button
      onClick={handleWhatsAppClick}
      disabled={isLoading}
      className={`bg-green-600 hover:bg-green-700 text-white gap-2 rounded-xl py-3 sm:py-4 transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base font-semibold ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
	<path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
</svg>
      {isLoading ? "Préparation..." : "Commander par WhatsApp"}
    </Button>
  );
};