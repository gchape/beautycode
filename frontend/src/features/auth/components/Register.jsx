import { useFormFetcher } from "src/hooks/useFormFetcher";
import { AuthError } from "./AuthError";
import { AuthField } from "./AuthField";
import { AuthFooter } from "./AuthFooter";
import { AuthSubmit } from "./AuthSubmit";
import { AuthWrapper } from "./AuthWrapper";

const Register = () => {
  const { fetcher, isLoading } = useFormFetcher();

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
            disabled={isLoading}
          />
          <AuthField
            label="გვარი"
            name="lastName"
            type="text"
            placeholder="გელაშვილი"
            disabled={isLoading}
          />
        </div>
        <AuthField
          label="ელ-ფოსტა"
          name="email"
          type="email"
          placeholder="mariam@example.com"
          disabled={isLoading}
        />
        <AuthField
          label="ტელეფონი"
          name="phone"
          type="tel"
          placeholder="(+995) 599-000-000"
          disabled={isLoading}
        />
        <AuthField
          label="პაროლი"
          name="password"
          type="password"
          placeholder="••••••••"
          disabled={isLoading}
        />
        <AuthField
          label="გაიმეორე პაროლი"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          disabled={isLoading}
        />
        <AuthSubmit
          label="რეგისტრაცია"
          loadingLabel="დაელოდეთ..."
          isSubmitting={isLoading}
        />
      </fetcher.Form>
      <AuthFooter
        label="უკვე გაქვს ანგარიში?"
        linkText="შესვლა"
        to="/login"
        isSubmitting={isLoading}
      />
    </AuthWrapper>
  );
};

export default Register;
