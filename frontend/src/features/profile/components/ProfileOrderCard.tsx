import { Package } from "lucide-react";
import type { Order } from "../types";

const formatOrderDate = (dateStr: string): string =>
  new Intl.DateTimeFormat("ka-GE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));

type ProfileOrderCardProps = Order;

export const ProfileOrderCard = ({
  id,
  summary,
  date,
}: ProfileOrderCardProps) => (
  <div className="flex items-center gap-3 py-4 border-b border-taupe-100 last:border-0">
    <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 shrink-0">
      <Package size={16} />
    </div>
    <div className="flex flex-col gap-0.5 min-w-0">
      <p className="text-sm font-medium text-taupe-800 truncate">{summary}</p>
      <p className="text-xs tracking-[0.1em] uppercase text-taupe-400">
        {id} &middot; {formatOrderDate(date)}
      </p>
    </div>
  </div>
);
