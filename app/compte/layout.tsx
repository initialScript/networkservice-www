import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import AccountSidebar from '@/components/account/AccountSidebar';

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default function AccountLayout({ children, params: { locale } }: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (!token) redirect(`/auth/login?redirect=/compte`);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-[240px] flex-shrink-0">
          <AccountSidebar locale={locale} />
        </div>

        {/* Mobile tab strip */}
        <div className="lg:hidden w-full mb-6">
          <AccountSidebar locale={locale} />
        </div>

        {/* Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
