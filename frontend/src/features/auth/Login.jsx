import { AuthError } from "./components/AuthError";
import { AuthField } from "./components/AuthField";
import { AuthFooter } from "./components/AuthFooter";
import { AuthSubmit } from "./components/AuthSubmit";
import { AuthWrapper } from "./components/AuthWrapper";
import { useAuthFetcher } from "./hooks/useAuthFetcher";

const Login = () => {
  const { isSubmitting, error } = useAuthFetcher();

  return (
    <AuthWrapper>
      <AuthError message={error} />
      <fetcher.Form method="post" className="flex flex-col gap-5">
        <AuthField
          label="ელ-ფოსტა"
          name="email"
          type="email"
          placeholder="example.com"
          disabled={isSubmitting}
        />
        <AuthField
          label="პაროლი"
          name="password"
          type="password"
          placeholder="••••••••"
          disabled={isSubmitting}
        />
        <AuthSubmit
          label="შესვლა"
          loadingLabel="შესვლა..."
          isSubmitting={isSubmitting}
        />
      </fetcher.Form>
      <AuthFooter
        label="ანგარიში არ გაქვს?"
        linkText="რეგისტრაცია"
        to="/register"
        isSubmitting={isSubmitting}
      />
    </AuthWrapper>
  );
};

export default Login;
