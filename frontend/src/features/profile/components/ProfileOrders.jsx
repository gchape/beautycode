import { SectionTitle } from "../../../components/SectionTitle";
import { ProfileOrderCard } from "./ProfileOrderCard";

export const ProfileOrders = ({ orders }) => (
  <section>
    <SectionTitle>ჩემი შეკვეთები</SectionTitle>
    {orders.length === 0 ? (
      <p className="text-sm text-taupe-400 tracking-wide py-4">
        შეკვეთები არ გაქვს
      </p>
    ) : (
      <div className="flex flex-col">
        {orders.map((order) => (
          <ProfileOrderCard key={order.id} {...order} />
        ))}
      </div>
    )}
  </section>
);
