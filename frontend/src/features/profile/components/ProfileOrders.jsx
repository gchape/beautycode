import { SectionTitle } from "src/components/SectionTitle";
import { useOrders } from "src/hooks/useOrders";
import { ProfileOrderCard } from "./ProfileOrderCard";

export const ProfileOrders = () => {
  const { data: orders = [], isLoading, error } = useOrders();

  return (
    <section>
      <SectionTitle>ჩემი შეკვეთები</SectionTitle>

      {isLoading && (
        <div className="space-y-3 animate-pulse">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 bg-taupe-100 rounded-xl" />
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-400 tracking-wide py-4">
          შეცდომა შეკვეთების ჩატვირთვისას
        </p>
      )}

      {!isLoading &&
        !error &&
        (orders.length === 0 ? (
          <p className="text-sm text-taupe-400 tracking-wide py-4">
            შეკვეთები არ გაქვს
          </p>
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
