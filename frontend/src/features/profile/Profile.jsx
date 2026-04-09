import { useLoaderData } from "react-router";
import { User } from "../schema/userSchema";
import {
  ProfileAccount,
  ProfileFooter,
  ProfileHero,
  ProfileOrders,
} from "./components/ProfileComponents";

const Profile = () => {
  const loaderData = useLoaderData();
  const result = User.safeParse(loaderData);

  if (!result.success) {
    return (
      <div className="min-h-screen flex justify-center items-center text-taupe-400 text-sm">
        მომხმარებლის მონაცემები ვერ ჩაიტვირთა
      </div>
    );
  }

  const user = result.data;

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
