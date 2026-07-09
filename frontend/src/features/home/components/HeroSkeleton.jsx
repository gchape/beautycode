export const HeroSkeleton = () => (
  <section
    aria-label="იტვირთება..."
    aria-busy="true"
    className="relative min-h-[580px] flex flex-col md:flex-row items-center overflow-hidden pt-4 md:pt-8"
  >
    <div className="w-full md:w-1/2 px-8 md:px-20 py-12 md:py-0 flex flex-col gap-6">
      <div className="skeleton h-5 w-20 rounded-full" />
      <div className="flex flex-col gap-3">
        <div className="skeleton h-10 w-4/5 rounded-lg" />
        <div className="skeleton h-10 w-3/5 rounded-lg" />
        <div className="skeleton h-10 w-2/5 rounded-lg" />
      </div>
      <div className="flex items-baseline gap-3">
        <div className="skeleton h-8 w-28 rounded-lg" />
        <div className="skeleton h-5 w-16 rounded-lg" />
      </div>
      <div className="skeleton h-11 w-36 rounded-full" />
    </div>

    <div
      className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-[640px]
                    rounded-l-[4rem] md:rounded-l-[8rem] skeleton"
    />
  </section>
);
