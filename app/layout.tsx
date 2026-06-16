import type { ReactNode } from 'react';
import './globals.css';

import { Inter } from 'next/font/google';

import CartHydrator from '@/components/cart-hydrator';
import { CartDrawerProvider } from '@/lib/contexts/CartDrawerContext';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${inter.className}`}>
        <CartDrawerProvider>
          <div className="bg-white antialiased">
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CartDrawer />
          </div>

          <CartHydrator />
        </CartDrawerProvider>
      </body>
    </html>
  );
}