import Skeleton from '@/components/ui/Skeleton';

export default function CatalogueLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Skeleton className="h-8 w-48 mb-8" />

      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden lg:flex flex-col gap-4 w-[260px] flex-shrink-0">
          <Skeleton className="h-5 w-32" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-full rounded-lg" />
          ))}
          <Skeleton className="h-px w-full mt-2" />
          <Skeleton className="h-5 w-24" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-3/4" />
          ))}
          <Skeleton className="h-px w-full mt-2" />
          <Skeleton className="h-5 w-16" />
          <div className="flex gap-2">
            <Skeleton className="h-9 flex-1 rounded-lg" />
            <Skeleton className="h-9 flex-1 rounded-lg" />
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="flex-1">
          <Skeleton className="h-10 w-full mb-5 rounded-lg" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
