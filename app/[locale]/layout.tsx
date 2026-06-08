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

interface Category {
  id: number;
  name_fr: string;
  name_ar: string;
  slug: string;
  children?: Category[];
}

async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.categories ?? data.data ?? data ?? [];
  } catch {
    return [];
  }
}

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale)) notFound();

  const [messages, categories] = await Promise.all([getMessages(), fetchCategories()]);

  const isArabic = locale === 'ar';
  const fontClass = isArabic
    ? `${notoArabic.variable} ${notoArabic.className}`
    : `${inter.variable} ${inter.className}`;

  return (
    <NextIntlClientProvider messages={messages}>
      <CartDrawerProvider>
        <div lang={locale} dir={isArabic ? 'rtl' : 'ltr'} className={`${fontClass} bg-white antialiased`}>
          <Header categories={categories} />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </div>
      </CartDrawerProvider>
    </NextIntlClientProvider>
  );
}
