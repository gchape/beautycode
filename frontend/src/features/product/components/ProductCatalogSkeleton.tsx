interface ProductCatalogSkeletonProps {
  count?: number;
}

export const ProductCatalogSkeleton = ({
  count = 6,
}: ProductCatalogSkeletonProps) => (
  <div
    aria-label="პროდუქტები იტვირთება..."
    aria-busy="true"
    className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 mt-8"
  >
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={`relative ${i % 3 === 1 ? "md:mt-16" : ""}`}>
        <div className="skeleton aspect-square w-full rounded-2xl mb-3" />
        <div className="px-0.5 space-y-1.5">
          <div className="skeleton h-2.5 w-12 rounded-full" />
          <div className="skeleton h-4 w-3/4 rounded-lg" />
          <div className="flex justify-between items-center pt-1">
            <div className="skeleton h-4 w-14 rounded-lg" />
            <div className="skeleton h-7 w-7 rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
