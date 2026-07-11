export const HomeSkeleton = () => (
  <main aria-label="იტვირთება..." aria-busy="true">
    {/* Hero */}
    <section className="relative min-h-145 flex flex-col md:flex-row items-center overflow-hidden pt-4 md:pt-8">
      <div className="w-full md:w-1/2 px-8 md:px-20 z-10 py-12 md:py-0 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="skeleton h-6 w-28 rounded-full" />
          <div className="skeleton h-10 md:h-14 w-full max-w-md rounded" />
          <div className="skeleton h-10 md:h-14 w-3/4 max-w-md rounded" />
        </div>

        <div className="flex items-baseline gap-3">
          <div className="skeleton h-8 w-24 rounded" />
          <div className="skeleton h-5 w-16 rounded" />
        </div>

        <div className="flex items-center gap-3">
          <div className="skeleton h-12 w-32 rounded-full" />
          <div className="skeleton h-3 w-24 rounded-full" />
        </div>
      </div>

      <div className="skeleton w-full md:w-1/2 h-75 sm:h-100 md:h-160 rounded-l-[4rem] md:rounded-l-[8rem]" />
    </section>

    {/* Featured collection */}
    <section className="px-6 py-12 md:py-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="skeleton h-3 w-32 rounded-full" />
            <div className="skeleton h-9 w-56 rounded" />
          </div>
          <div className="skeleton h-10 w-full max-w-md rounded" />
        </header>

        <div className="columns-2 md:columns-3 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-6 rounded-2xl bg-base-200 overflow-hidden"
              style={{ height: 220 + (i % 3) * 60 }}
            >
              <div className="skeleton w-full h-2/3" />
              <div className="p-4 flex flex-col gap-2">
                <div className="skeleton h-2.5 w-14 rounded-full" />
                <div className="skeleton h-4 w-3/4 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);
