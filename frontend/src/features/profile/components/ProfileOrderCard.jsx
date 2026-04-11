const formatOrderDate = (dateStr) =>
  new Intl.DateTimeFormat("ka-GE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));

export const ProfileOrderCard = ({ id, summary, date }) => (
  <div className="flex justify-between items-center py-4 border-b border-taupe-200 last:border-0">
    <div>
      <p className="text-base font-medium tracking-wide text-taupe-800">
        {summary}
      </p>
      <p className="mt-1 text-xs tracking-widest uppercase text-taupe-500">
        {id} &middot; {formatOrderDate(date)}
      </p>
    </div>
  </div>
);
