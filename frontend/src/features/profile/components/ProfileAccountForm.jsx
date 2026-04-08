import { ProfileAccountField } from "./ProfileAccountField";
import { ProfileSectionTitle } from "./ProfileSectionTitle";

export const ProfileAccount = ({ firstName, lastName, email, phone }) => (
  <section>
    <ProfileSectionTitle>ანგარიში</ProfileSectionTitle>

    <ProfileAccountField
      label="სახელი"
      name="firstName"
      value={firstName}
      type="text"
      readOnly
    />

    <ProfileAccountField
      label="გვარი"
      name="lastName"
      value={lastName}
      type="text"
      readOnly
    />

    <ProfileAccountField
      label="ელ-ფოსტა"
      name="email"
      value={email}
      type="email"
    />

    <ProfileAccountField
      label="ტელეფონი"
      name="phone"
      value={phone}
      type="tel"
    />
  </section>
);
