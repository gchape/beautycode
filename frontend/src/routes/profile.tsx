import { useLoaderData } from "react-router";
import { orderApi, type Order } from "src/entities/order";
import { userApi, type User } from "src/entities/user";
import { AccountDetails } from "src/ui/profile/AccountDetails";
import { OrderHistory } from "src/ui/profile/OrderHistory";
import { ProfileHeader } from "src/ui/profile/ProfileHeader";
import { ProfilePageFooter } from "src/ui/profile/ProfilePageFooter";
import { ProfileSkeleton } from "src/ui/profile/ProfileSkeleton";

export const HydrateFallback = ProfileSkeleton;

export const loader = async () => {
  const [user, orders] = await Promise.all([userApi.profile(), orderApi.list()]);
  return { user, orders };
};

export const Component = () => {
  const { user, orders } = useLoaderData<{ user: User; orders: Order[] }>();

  return (
    <div className="min-h-screen flex justify-center items-center pt-16 px-6">
      <div className="w-full max-w-sm flex flex-col gap-10 pb-16">
        <ProfileHeader name={user.firstName} />
        <OrderHistory orders={orders} />
        <AccountDetails user={user} />
        <ProfilePageFooter />
      </div>
    </div>
  );
};
