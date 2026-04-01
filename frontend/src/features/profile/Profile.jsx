import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../state/store";
import {
  AccountForm,
  OrderList,
  ProfileFooter,
  ProfileHero,
} from "./ProfileComponents";

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex justify-center items-start pt-12 px-6">
      <div className="w-full max-w-md flex flex-col gap-8 pb-16">
        <ProfileHero name={user.firstname} />
        <OrderList orders={user.orders} />
        <AccountForm />
        <ProfileFooter logout={logout} />
      </div>
    </div>
  );
};

export default Profile;
