import { useState } from "react";
import { useFetcher } from "react-router";
import { ProfileAccountField } from "./ProfileAccountField";
import { ProfileSectionTitle } from "./ProfileSectionTitle";

export const ProfileAccountForm = ({ firstName, lastName, email, phone }) => {
  const fetcher = useFetcher();
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone);
  const changed = newEmail !== email || newPhone !== phone;

  return (
    <section>
      <ProfileSectionTitle>ანგარიში</ProfileSectionTitle>
      <fetcher.Form
        method="post"
        action={`/profile/update?email=${newEmail !== email}&phone=${newPhone !== phone}`}
        className="flex flex-col gap-7"
      >
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
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          type="email"
        />
        <ProfileAccountField
          label="ტელეფონი"
          name="phone"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          type="tel"
        />

        {fetcher.data?.error && (
          <p className="text-xs text-red-500 tracking-wide">
            {fetcher.data.error}
          </p>
        )}

        <button
          type="submit"
          disabled={fetcher.state !== "idle" || !changed}
          className="mt-10 w-full py-3 text-xs tracking-[0.22em] font-bold text-taupe-600 border border-taupe-400 rounded-full hover:bg-pink-50 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          შენახვა
        </button>
      </fetcher.Form>
    </section>
  );
};
