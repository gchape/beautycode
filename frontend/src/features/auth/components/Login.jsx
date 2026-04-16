import { useFormFetcher } from "src/hooks/useFormFetcher";
import { AuthError } from "./AuthError";
import { AuthField } from "./AuthField";
import { AuthFooter } from "./AuthFooter";
import { AuthSubmit } from "./AuthSubmit";
import { AuthWrapper } from "./AuthWrapper";
import LoginWebp from "../../../assets/images/auth/login.webp";

const Login = () => {
  const { fetcher, isLoading } = useFormFetcher();

  return (
    <AuthWrapper imageSrc={LoginWebp}>
      <div className="mb-8">
        <h2 className="font-headline text-3xl italic leading-tight text-taupe-800">
          მოგესალმებით
        </h2>
        <p className="mt-1 font-body text-sm text-taupe-400">
          შედით თქვენს ანგარიშზე
        </p>
      </div>

      <fetcher.Form method="post" className="flex flex-col gap-4">
        <AuthError message={fetcher.data?.error} />

        <AuthField
          label="ელ-ფოსტა"
          name="email"
          type="email"
          placeholder="example@mail.com"
          autoComplete="email"
          disabled={isLoading}
        />

        <AuthField
          label="პაროლი"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          disabled={isLoading}
        />

        <div className="flex items-center justify-between pt-1 pl-0.5">
          <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-taupe-500">
            <input
              type="checkbox"
              name="remember-me"
              value="on"
              disabled={isLoading}
            />
            დამახსოვრება
          </label>
        </div>

        <AuthSubmit
          label="შესვლა"
          loadingLabel="შესვლა..."
          isSubmitting={isLoading}
        />
      </fetcher.Form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-taupe-200" />
        <span className="text-[10px] uppercase tracking-widest text-taupe-400">
          ან
        </span>
        <div className="h-px flex-1 bg-taupe-200" />
      </div>

      <AuthFooter
        label="ანგარიში არ გაქვს?"
        linkText="რეგისტრაცია"
        to="/register"
        isSubmitting={isLoading}
      />
    </AuthWrapper>
  );
};

export default Login;
