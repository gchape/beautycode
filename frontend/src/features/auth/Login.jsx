import { useFetcher } from "react-router";
import {
  AuthError,
  AuthField,
  AuthFooter,
  AuthSubmit,
  AuthWrapper,
} from "./components/AuthComponents";

const Login = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  return (
    <AuthWrapper>
      <fetcher.Form method="post" className="flex flex-col gap-5">
        <AuthError message={fetcher.error} />
        <AuthField
          label="ელ-ფოსტა"
          name="email"
          type="email"
          placeholder="example@mail.com"
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
