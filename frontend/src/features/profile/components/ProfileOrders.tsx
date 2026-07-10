import { PackageOpen } from "lucide-react";
import { SectionTitle } from "src/components/SectionTitle";
import { useOrders } from "src/hooks/useOrders";
import { ProfileOrderCard } from "./ProfileOrderCard";

export const ProfileOrders = () => {
  const { data: orders = [], isLoading, error } = useOrders();

  return (
    <section className="flex flex-col gap-2">
      <SectionTitle>ჩემი შეკვეთები</SectionTitle>

      {isLoading && (
        <div className="space-y-3 pt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-14 w-full rounded-lg" />
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-rose-400 tracking-wide py-4">
          შეცდომა შეკვეთების ჩატვირთვისას
        </p>
      )}

      {!isLoading &&
        !error &&
        (orders.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-taupe-300">
            <PackageOpen size={28} />
            <p className="text-sm text-taupe-400 tracking-wide">
              შეკვეთები არ გაქვს
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {orders.map((order) => (
              <ProfileOrderCard key={order.id} {...order} />
            ))}
          </div>
        ))}
    </section>
  );
};
