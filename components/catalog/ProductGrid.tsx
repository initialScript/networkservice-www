import ProductCard from './ProductCard';
import Skeleton from '@/components/ui/Skeleton';

interface Props {
  products: any[];
  isLoading?: boolean;
  columns?: 'default' | 'related';
}

export default function ProductGrid({ products, isLoading, columns = 'default' }: Props) {
  const gridCls =
    columns === 'related'
      ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'
      : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4';

  if (isLoading) {
    return (
      <div className={gridCls}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 text-sm">Aucun produit trouvé.</p>
      </div>
    );
  }

  return (
    <div className={gridCls}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
