import { useLoaderData } from "react-router";
import { ProfileAccountForm } from "./components/ProfileAccountForm";
import { ProfileFooter } from "./components/ProfileFooter";
import { ProfileHero } from "./components/ProfileHero";
import { ProfileOrderList } from "./components/ProfileOrderList";

const Profile = () => {
  const user = useLoaderData();

  return (
    <div className="min-h-screen flex justify-center items-start pt-12 px-6">
      <div className="w-full max-w-md flex flex-col gap-8 pb-16">
        <ProfileHero name={user.firstname} />
        <ProfileOrderList orders={user.orders} />
        <ProfileAccountForm user={user} />
        <ProfileFooter />
      </div>
    </div>
  );
};

export default Profile;
