import { PackageOpen } from "lucide-react";
import type { Order } from "src/entities/order";
import { SectionLabel } from "src/ui/shared/SectionLabel";
import { OrderHistoryItem } from "./OrderHistoryItem";

interface OrderHistoryProps {
  orders: Order[];
}

export const OrderHistory = ({ orders }: OrderHistoryProps) => (
  <section className="flex flex-col gap-2">
    <SectionLabel>ჩემი შეკვეთები</SectionLabel>

    {orders.length === 0 ? (
      <div className="flex flex-col items-center gap-2 py-8 text-taupe-300">
        <PackageOpen size={28} />
        <p className="text-sm text-taupe-400 tracking-wide">შეკვეთები არ გაქვს</p>
      </div>
    ) : (
      <div className="flex flex-col">
        {orders.map((order) => (
          <OrderHistoryItem key={order.id} {...order} />
        ))}
      </div>
    )}
  </section>
);
