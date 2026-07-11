import { SectionLabel } from "src/ui/shared/SectionLabel";
import type { User } from "src/entities/user";
import { ReadOnlyField } from "./ReadOnlyField";

interface AccountDetailsProps {
  user: User;
}

export const AccountDetails = ({ user }: AccountDetailsProps) => (
  <section className="flex flex-col gap-6">
    <SectionLabel>ანგარიში</SectionLabel>
    <div className="grid grid-cols-2 gap-6">
      <ReadOnlyField label="სახელი" name="firstName" type="text" value={user.firstName} />
      <ReadOnlyField label="გვარი" name="lastName" type="text" value={user.lastName} />
    </div>
    <ReadOnlyField label="ელ-ფოსტა" name="email" type="email" value={user.email} />
    <ReadOnlyField label="ტელეფონი" name="phone" type="tel" value={user.phone} />
  </section>
);
