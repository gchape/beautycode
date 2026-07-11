export const ProductsSkeleton = () => (
  <main
    aria-label="კატალოგი იტვირთება..."
    aria-busy="true"
    className="max-w-7xl mx-auto px-6 pt-6 pb-16 md:pb-32"
  >
    <header className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="skeleton h-3 w-24 rounded-full" />
          <div className="skeleton h-9 md:h-14 w-40 rounded" />
        </div>
        <div className="skeleton h-10 w-full max-w-xs rounded" />
      </div>
    </header>

    <div className="flex gap-2 mb-12 overflow-x-auto pb-3 no-scrollbar">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="skeleton h-9 w-24 rounded-full shrink-0" />
      ))}
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 mt-8">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className={i % 3 === 1 ? "md:mt-16" : undefined}>
          <div className="skeleton aspect-square rounded-2xl mb-3" />
          <div className="flex flex-col gap-2">
            <div className="skeleton h-2.5 w-14 rounded-full" />
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-3 w-full rounded-full" />
            <div className="flex items-center justify-between mt-1">
              <div className="skeleton h-5 w-16 rounded" />
              <div className="skeleton h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </main>
);
