import { useFetcher } from "react-router";
import { ProfileAccountField } from "./ProfileAccountField";
import { ProfileSectionTitle } from "./ProfileSectionTitle";

export const ProfileAccountForm = ({ user }) => {
  const fetcher = useFetcher();
  const isSaving = fetcher.state !== "idle";

  return (
    <section>
      <ProfileSectionTitle>ანგარიში</ProfileSectionTitle>
      <fetcher.Form
        method="post"
        action="/profile/update"
        className="flex flex-col gap-7"
      >
        <ProfileAccountField
          label="სახელი"
          name="firstName"
          placeholder={user.firstName}
          type="text"
        />
        <ProfileAccountField
          label="გვარი"
          name="lastName"
          placeholder={user.lastName}
          type="text"
        />
        <ProfileAccountField
          label="ელ-ფოსტა"
          name="email"
          placeholder={user.email}
          type="email"
        />
        <ProfileAccountField
          label="ტელეფონი"
          name="phone"
          placeholder={user.phone}
          type="tel"
        />
        <button
          type="submit"
          disabled={isSaving}
          className="mt-10 w-full py-3 text-xs tracking-[0.22em] font-bold text-taupe-600 border border-taupe-400 rounded-full hover:bg-pink-50 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? "ინახება..." : "შენახვა"}
        </button>
      </fetcher.Form>
    </section>
  );
};
