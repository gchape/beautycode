/**
 * FeaturedProductsSkeleton
 *
 * Shown while the featured product collection is loading.
 * Mirrors the masonry / column-based FeaturedProducts layout:
 *   - section header (label + heading + subtext)
 *   - 3-column card grid (each card: image block + title/price row)
 */

const CARD_HEIGHTS = ["h-64", "h-80", "h-56", "h-72", "h-60", "h-76"];

export const FeaturedProductsSkeleton = ({ count = 3 }) => (
  <section
    aria-label="პროდუქტები იტვირთება..."
    aria-busy="true"
    className="px-6 py-24"
  >
    <div className="max-w-7xl mx-auto">
      {/* ── Section header ── */}
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="skeleton h-3 w-24 rounded-full" />
          <div className="skeleton h-9 w-64 rounded" />
        </div>
        <div className="space-y-2 max-w-md w-full">
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-4/5 rounded" />
        </div>
      </header>

      {/* ── Card grid ── */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="break-inside-avoid mb-8">
            {/* Card image */}
            <div
              className={`skeleton rounded-2xl w-full ${CARD_HEIGHTS[i % CARD_HEIGHTS.length]} mb-4`}
            />
            {/* Card text row */}
            <div className="flex justify-between items-start gap-3 px-1">
              <div className="space-y-2 flex-1">
                <div className="skeleton h-3 w-16 rounded-full" />
                <div className="skeleton h-5 w-3/4 rounded" />
              </div>
              <div className="space-y-2 shrink-0">
                <div className="skeleton h-5 w-20 rounded" />
                <div className="skeleton h-3 w-14 rounded opacity-60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
