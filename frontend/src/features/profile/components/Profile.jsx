import { useLoaderData } from "react-router";
import { ProfileAccount } from "./ProfileAccount";
import { ProfileFooter } from "./ProfileFooter";
import { ProfileHero } from "./ProfileHero";
import { ProfileOrders } from "./ProfileOrders";

const Profile = () => {
  const { user } = useLoaderData();

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-taupe-400 text-sm tracking-wide">
        მომხმარებლის მონაცემები ვერ ჩაიტვირთა
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center pt-16 px-6">
      <div className="w-full max-w-sm flex flex-col gap-10 pb-16">
        <ProfileHero name={user.firstName} />
        <ProfileOrders />
        <ProfileAccount user={user} />
        <ProfileFooter />
      </div>
    </div>
  );
};

export default Profile;
