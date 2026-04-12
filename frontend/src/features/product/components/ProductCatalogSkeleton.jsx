/**
 * ProductCatalogSkeleton
 *
 * Shown while the catalog grid is loading.
 * Mirrors the 3-column ProductCatalogGrid layout:
 *   - 3 × N card skeletons (portrait image + text block)
 * Every third card is offset slightly (mimics the `offset` prop).
 */
export const ProductCatalogSkeleton = ({ count = 6 }) => (
  <div
    aria-label="პროდუქტები იტვირთება..."
    aria-busy="true"
    className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12 mt-8"
  >
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={`relative ${i % 3 === 1 ? "md:mt-24" : ""}`}>
        {/* Image block */}
        <div className="skeleton aspect-3/4 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto rounded-2xl mb-5" />

        {/* Text block */}
        <div className="px-1 space-y-2">
          <div className="skeleton h-2.5 w-14 rounded-full" />
          <div className="skeleton h-5 w-3/4 rounded" />
          <div className="skeleton h-4 w-full rounded opacity-70" />
          <div className="skeleton h-4 w-4/5 rounded opacity-50" />

          {/* Price + CTA row */}
          <div className="flex justify-between items-center pt-2">
            <div className="skeleton h-5 w-20 rounded" />
            <div className="skeleton h-4 w-16 rounded" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
