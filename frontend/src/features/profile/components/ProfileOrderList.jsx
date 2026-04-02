import { ProfileOrderCard } from "./ProfileOrderCard";
import { ProfileSectionTitle } from "./ProfileSectionTitle";

export const ProfileOrderList = ({ orders }) => (
  <section>
    <ProfileSectionTitle>ჩემი შეკვეთები</ProfileSectionTitle>
    <div className="flex flex-col">
      {orders.map((order) => (
        <ProfileOrderCard key={order.id} {...order} />
      ))}
    </div>
  </section>
);
