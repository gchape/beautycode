/**
 * ProfileFallback
 *
 * React Router HydrateFallback for the /profile route.
 * Mirrors the Profile page layout:
 *   - ProfileHero (avatar + name)
 *   - ProfileOrders section
 *   - ProfileAccount section
 *   - ProfileFooter
 */
export const ProfileFallback = () => (
  <div
    aria-label="პროფილი იტვირთება..."
    aria-busy="true"
    className="min-h-screen flex justify-center items-center pt-16 px-6"
  >
    <div className="w-full max-w-sm flex flex-col gap-10 pb-16">
      {/* ── ProfileHero skeleton ── */}
      <div className="flex items-center gap-5">
        {/* Avatar circle */}
        <div className="skeleton-pulse w-20 h-20 rounded-full shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="skeleton h-8 w-32 rounded" />
          <div className="skeleton h-3 w-44 rounded-full" />
        </div>
      </div>

      {/* ── ProfileOrders skeleton ── */}
      <div className="flex flex-col gap-4">
        {/* Section title */}
        <div className="flex items-center gap-4 mb-2">
          <div className="skeleton h-px w-6" />
          <div className="skeleton h-2.5 w-28 rounded-full" />
          <div className="skeleton h-px flex-1" />
        </div>
        {/* Order rows */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-4 border-b border-taupe-100"
          >
            <div className="space-y-2 flex-1">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/2 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* ── ProfileAccount skeleton ── */}
      <div className="flex flex-col gap-6">
        {/* Section title */}
        <div className="flex items-center gap-4 mb-2">
          <div className="skeleton h-px w-6" />
          <div className="skeleton h-2.5 w-20 rounded-full" />
          <div className="skeleton h-px flex-1" />
        </div>
        {/* Fields */}
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="skeleton h-2.5 w-12 rounded-full" />
              <div className="skeleton h-5 w-full rounded" />
            </div>
          ))}
        </div>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="skeleton h-2.5 w-16 rounded-full" />
            <div className="skeleton h-5 w-full rounded" />
          </div>
        ))}
      </div>

      {/* ── ProfileFooter skeleton ── */}
      <div className="flex justify-between items-center pt-6 border-t border-taupe-100">
        <div className="skeleton h-3 w-16 rounded-full" />
        <div className="skeleton h-3 w-20 rounded-full" />
      </div>
    </div>
  </div>
);
