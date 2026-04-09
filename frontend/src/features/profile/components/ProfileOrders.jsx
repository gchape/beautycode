import { OrderCard } from "src/components/OrderCard";
import { SectionTitle } from "../../../components/SectionTitle";

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
          <OrderCard key={order.id} {...order} />
        ))}
      </div>
    )}
  </section>
);
