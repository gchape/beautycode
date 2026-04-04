import { useLoaderData } from "react-router";
import { User } from "../schema/userSchema";
import { ProfileAccountForm } from "./components/ProfileAccountForm";
import { ProfileFooter } from "./components/ProfileFooter";
import { ProfileHero } from "./components/ProfileHero";
import { ProfileOrderCard } from "./components/ProfileOrderCard";
import { ProfileSectionTitle } from "./components/ProfileSectionTitle";

const Profile = () => {
  const user = User.parse(useLoaderData());

  return (
    <div className="min-h-screen flex justify-center items-start pt-12 px-6">
      <div className="w-full max-w-md flex flex-col gap-8 pb-16">
        <ProfileHero name={user.firstName} />

        <section>
          <ProfileSectionTitle>ჩემი შეკვეთები</ProfileSectionTitle>
          <div className="flex flex-col">
            {user.orders.map((order) => (
              <ProfileOrderCard key={order.id} {...order} />
            ))}
          </div>
        </section>

        <ProfileAccountForm
          firstName={user.firstName}
          lastName={user.lastName}
          phone={user.phone}
          email={user.email}
        />
        <ProfileFooter />
      </div>
    </div>
  );
};

export default Profile;
