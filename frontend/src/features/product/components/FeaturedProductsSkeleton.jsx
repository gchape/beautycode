const CARD_HEIGHTS = ["h-64", "h-80", "h-56", "h-72", "h-60", "h-76"];

export const FeaturedProductsSkeleton = ({ count = 3 }) => (
  <section
    aria-label="პროდუქტები იტვირთება..."
    aria-busy="true"
    className="px-6 py-12 md:py-24"
  >
    <div className="max-w-7xl mx-auto">
      <header className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="skeleton h-3 w-24 rounded-full" />
          <div className="skeleton h-9 w-64 rounded-lg" />
        </div>
        <div className="space-y-2 max-w-md w-full">
          <div className="skeleton h-4 w-full rounded-lg" />
          <div className="skeleton h-4 w-4/5 rounded-lg" />
        </div>
      </header>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="break-inside-avoid mb-8">
            <div
              className={`skeleton rounded-2xl w-full ${CARD_HEIGHTS[i % CARD_HEIGHTS.length]} mb-4`}
            />
            <div className="flex justify-between items-start gap-3 px-1">
              <div className="space-y-2 flex-1">
                <div className="skeleton h-3 w-16 rounded-full" />
                <div className="skeleton h-5 w-3/4 rounded-lg" />
              </div>
              <div className="space-y-2 shrink-0">
                <div className="skeleton h-5 w-20 rounded-lg" />
                <div className="skeleton h-3 w-14 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
