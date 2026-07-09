const formatOrderDate = (dateStr) =>
  new Intl.DateTimeFormat("ka-GE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));

export const ProfileOrderCard = ({ id, summary, date }) => (
  <div className="flex justify-between items-center py-4 border-b border-taupe-200 last:border-0">
    <div className="flex flex-col gap-1">
      <p className="text-base font-medium text-taupe-800">{summary}</p>
      <p className="text-xs tracking-[0.14em] uppercase text-taupe-400">
        {id} &middot; {formatOrderDate(date)}
      </p>
    </div>
  </div>
);
