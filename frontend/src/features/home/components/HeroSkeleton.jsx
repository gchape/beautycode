export const HeroSkeleton = () => (
  <section
    aria-label="იტვირთება..."
    aria-busy="true"
    className="relative min-h-[600px] flex flex-col md:flex-row items-center overflow-hidden pt-12"
  >
    {/* ── Left: text placeholder ── */}
    <div className="w-full md:w-1/2 px-8 md:px-20 py-12 md:py-0 space-y-6">
      {/* Badge line */}
      <div className="skeleton skeleton-dark h-3 w-20 rounded-full" />

      {/* Heading — two lines */}
      <div className="space-y-3">
        <div className="skeleton skeleton-dark h-9 w-4/5 rounded" />
        <div className="skeleton skeleton-dark h-9 w-3/5 rounded" />
      </div>

      {/* Price row */}
      <div className="flex items-baseline gap-4 pt-2">
        <div className="skeleton skeleton-dark h-8 w-28 rounded" />
        <div className="skeleton skeleton-dark h-5 w-16 rounded opacity-60" />
      </div>

      {/* CTA button */}
      <div className="skeleton skeleton-dark h-12 w-40 rounded-full mt-2" />
    </div>

    {/* ── Right: image panel ── */}
    <div
      className="w-full md:w-1/2 h-[500px] md:h-[700px]
                 rounded-l-[5rem] md:rounded-l-[10rem]
                 skeleton-pulse bg-taupe-100"
    />
  </section>
);
