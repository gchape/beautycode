import { SectionTitle } from "../../../components/SectionTitle";
import { ProfileAccountField } from "./ProfileAccountField";

export const ProfileAccount = ({ user }) => (
  <section className="flex flex-col gap-6">
    <SectionTitle>ანგარიში</SectionTitle>
    <div className="grid grid-cols-2 gap-6">
      <ProfileAccountField
        label="სახელი"
        name="firstName"
        type="text"
        value={user.firstName}
      />
      <ProfileAccountField
        label="გვარი"
        name="lastName"
        type="text"
        value={user.lastName}
      />
    </div>
    <ProfileAccountField
      label="ელ-ფოსტა"
      name="email"
      type="email"
      value={user.email}
    />
    <ProfileAccountField
      label="ტელეფონი"
      name="phone"
      type="tel"
      value={user.phone}
    />
  </section>
);
