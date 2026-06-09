import type { ReactNode } from 'react';
import './globals.css';
import CartHydrator from '@/components/cart-hydrator';


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <CartHydrator />
      </body>
    </html>
  );
}
