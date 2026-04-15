import { useFormFetcher } from "src/hooks/useFormFetcher";
import { AuthError } from "./AuthError";
import { AuthField } from "./AuthField";
import { AuthFooter } from "./AuthFooter";
import { AuthSubmit } from "./AuthSubmit";
import { AuthWrapper } from "./AuthWrapper";
import { AuthTerms } from "./AuthTerms";
import RegisterJpg from "../../../assets/images/auth/register.jpg";

const Register = () => {
  const { fetcher, isLoading } = useFormFetcher();

  return (
    <AuthWrapper imageSrc={RegisterJpg}>
      <div className="mb-8">
        <h2 className="font-headline text-3xl italic text-taupe-800 leading-tight">
          ანგარიშის შექმნა
        </h2>
      </div>

      <fetcher.Form method="post" className="flex flex-col gap-4">
        <AuthError message={fetcher.data?.error} />

        <div className="grid grid-cols-2 gap-3">
          <AuthField
            label="სახელი"
            name="firstName"
            type="text"
            placeholder="მარიამი"
            autoComplete="given-name"
            disabled={isLoading}
          />
          <AuthField
            label="გვარი"
            name="lastName"
            type="text"
            placeholder="გელაშვილი"
            autoComplete="family-name"
            disabled={isLoading}
          />
        </div>

        <AuthField
          label="ელ-ფოსტა"
          name="email"
          type="email"
          placeholder="mariam@example.com"
          autoComplete="email"
          disabled={isLoading}
        />

        <AuthField
          label="ტელეფონი"
          name="phone"
          type="tel"
          placeholder="(+995) 599-000-000"
          autoComplete="tel"
          disabled={isLoading}
        />

        <div className="grid grid-cols-2 gap-3">
          <AuthField
            label="პაროლი"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isLoading}
          />
          <AuthField
            label="გაიმეორე"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isLoading}
          />
        </div>

        <AuthTerms />

        <div className="pt-1">
          <AuthSubmit
            label="რეგისტრაცია"
            loadingLabel="დაელოდეთ..."
            isSubmitting={isLoading}
          />
        </div>
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
