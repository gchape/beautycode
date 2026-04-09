import { useLoaderData } from "react-router";
import { ProfileAccount } from "./ProfileAccount";
import { ProfileFooter } from "./ProfileFooter";
import { ProfileHero } from "./ProfileHero";
import { ProfileOrders } from "./ProfileOrders";

const Profile = () => {
  const user = useLoaderData();

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-taupe-400 text-sm">
        მომხმარებლის მონაცემები ვერ ჩაიტვირთა
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start pt-12 px-6">
      <div className="w-full max-w-md flex flex-col gap-8 pb-16">
        <ProfileHero name={user.firstName} />
        <ProfileOrders orders={user.orders} />
        <ProfileAccount user={user} />
        <ProfileFooter />
      </div>
    </div>
  );
};

export default Profile;
