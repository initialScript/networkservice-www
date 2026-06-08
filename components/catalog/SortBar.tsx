'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface Props {
  total: number;
  currentSort?: string;
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'name_asc', label: 'Nom A–Z' },
];

export default function SortBar({ total, currentSort }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-100">
      <p className="text-sm text-gray-500">
        <span className="font-semibold text-gray-800">{total}</span> produit{total !== 1 ? 's' : ''} trouvé{total !== 1 ? 's' : ''}
      </p>
      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-sm text-gray-500 whitespace-nowrap hidden sm:block">
          Trier par :
        </label>
        <select
          id="sort-select"
          value={currentSort ?? 'newest'}
          onChange={(e) => handleSort(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F3460]/30 cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
