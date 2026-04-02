import { AuthError } from "./components/AuthError";
import { AuthField } from "./components/AuthField";
import { AuthFooter } from "./components/AuthFooter";
import { AuthSubmit } from "./components/AuthSubmit";
import { AuthWrapper } from "./components/AuthWrapper";
import { useAuthFetcher } from "./hooks/useAuthFetcher";

const Register = () => {
  const { isSubmitting, error } = useAuthFetcher();

  return (
    <AuthWrapper>
      <AuthError message={error} />
      <fetcher.Form method="post" className="flex flex-col gap-5">
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
