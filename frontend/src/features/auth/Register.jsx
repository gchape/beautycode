import { useFetcher } from "react-router";
import {
  AuthError,
  AuthField,
  AuthFooter,
  AuthSubmit,
  AuthWrapper,
} from "./components/AuthComponents";

const Register = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  return (
    <AuthWrapper>
      <fetcher.Form method="post" className="flex flex-col gap-5">
        <AuthError message={fetcher.error} />
        <div className="grid grid-cols-2 gap-4">
          <AuthField
            label="სახელი"
            name="firstName"
            type="text"
            placeholder="მარიამი"
            disabled={isSubmitting}
          />
          <AuthField
            label="გვარი"
            name="lastName"
            type="text"
            placeholder="გელაშვილი"
            disabled={isSubmitting}
          />
        </div>
        <AuthField
          label="ელ-ფოსტა"
          name="email"
          type="email"
          placeholder="mariam@example.com"
          disabled={isSubmitting}
        />
        <AuthField
          label="ტელეფონი"
          name="phone"
          type="tel"
          placeholder="(+995) 599-000-000"
          disabled={isSubmitting}
        />
        <AuthField
          label="პაროლი"
          name="password"
          type="password"
          placeholder="••••••••"
          disabled={isSubmitting}
        />
        <AuthField
          label="გაიმეორე პაროლი"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          disabled={isSubmitting}
        />
        <AuthSubmit
          label="რეგისტრაცია"
          loadingLabel="დაელოდეთ..."
          isSubmitting={isSubmitting}
        />
      </fetcher.Form>
      <AuthFooter
        label="უკვე გაქვს ანგარიში?"
        linkText="შესვლა"
        to="/login"
        isSubmitting={isSubmitting}
      />
    </AuthWrapper>
  );
};

export default Register;
