import { useFormFetcher } from "src/hooks/useFormFetcher";
import { AuthError } from "./AuthError";
import { AuthField } from "./AuthField";
import { AuthFooter } from "./AuthFooter";
import { AuthSubmit } from "./AuthSubmit";
import { AuthWrapper } from "./AuthWrapper";

const Login = () => {
  const { fetcher, isLoading } = useFormFetcher();

  return (
    <AuthWrapper>
      <fetcher.Form method="post" className="flex flex-col gap-5">
        <AuthError message={fetcher.error} />
        <AuthField
          label="ელ-ფოსტა"
          name="email"
          type="email"
          placeholder="example@mail.com"
          disabled={isLoading}
        />
        <AuthField
          label="პაროლი"
          name="password"
          type="password"
          placeholder="••••••••"
          disabled={isLoading}
        />
        <AuthSubmit
          label="შესვლა"
          loadingLabel="შესვლა..."
          isSubmitting={isLoading}
        />
      </fetcher.Form>
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
