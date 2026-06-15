import type { ReactNode } from 'react';
import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CartDrawerProvider } from '@/lib/contexts/CartDrawerContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic' });

const locales = ['fr', 'ar'];


interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale)) notFound();

  const [messages] = await Promise.all([getMessages()]);

  const isArabic = locale === 'ar';
  const fontClass = isArabic
    ? `${notoArabic.variable} ${notoArabic.className}`
    : `${inter.variable} ${inter.className}`;

  return (
    <NextIntlClientProvider messages={messages}>
      <CartDrawerProvider>
        <div lang={locale} dir={isArabic ? 'rtl' : 'ltr'} className={`${fontClass} bg-white antialiased`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </div>
      </CartDrawerProvider>
    </NextIntlClientProvider>
  );
}
