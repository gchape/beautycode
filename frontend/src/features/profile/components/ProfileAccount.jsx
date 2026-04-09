import { AccountField } from "../../../components/AccountField";
import { SectionTitle } from "../../../components/SectionTitle";

export const ProfileAccount = ({ user }) => (
  <section className="flex flex-col gap-5">
    <SectionTitle>ანგარიში</SectionTitle>
    <div className="grid grid-cols-2 gap-4">
      <AccountField
        label="სახელი"
        name="firstName"
        type="text"
        value={user.firstName}
      />
      <AccountField
        label="გვარი"
        name="lastName"
        type="text"
        value={user.lastName}
      />
    </div>
    <AccountField
      label="ელ-ფოსტა"
      name="email"
      type="email"
      value={user.email}
    />
    <AccountField label="ტელეფონი" name="phone" type="tel" value={user.phone} />
  </section>
);
