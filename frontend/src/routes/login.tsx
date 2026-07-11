import {
  redirect,
  useFetcher,
  useSearchParams,
  type ActionFunctionArgs,
} from "react-router";
import { authApi } from "src/entities/auth";
import LoginImage from "src/assets/images/auth/login.webp";
import { AuthLayout } from "src/ui/auth/AuthLayout";
import { AuthSwitchLink } from "src/ui/auth/AuthSwitchLink";
import { FormError } from "src/ui/auth/FormError";
import { FormField } from "src/ui/auth/FormField";
import { SubmitButton } from "src/ui/auth/SubmitButton";

interface LoginActionData {
  error?: string;
}

const isSafeRedirect = (path: string | null): path is string =>
  !!path && path.startsWith("/") && !path.startsWith("//");

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const redirectTo = new URL(request.url).searchParams.get("redirectTo");
  const destination = isSafeRedirect(redirectTo) ? redirectTo : "/";

  try {
    await authApi.login(email, password);
    return redirect(destination);
  } catch (error) {
    if (
      error instanceof Error &&
      "status" in error &&
      (error as { status: number }).status === 401
    ) {
      return {
        error: "არასწორი მონაცემები, სცადეთ თავიდან",
      } satisfies LoginActionData;
    }
    return {
      error: "დაფიქსირდა შეცდომა, სცადეთ მოგვიანებით",
    } satisfies LoginActionData;
  }
};

export const Component = () => {
  const fetcher = useFetcher<LoginActionData>();
  const [searchParams] = useSearchParams();
  const isLoading = fetcher.state !== "idle";

  const redirectTo = searchParams.get("redirectTo");
  const formAction = redirectTo
    ? `/login?redirectTo=${encodeURIComponent(redirectTo)}`
    : undefined;

  return (
    <AuthLayout imageSrc={LoginImage}>
      <div className="mb-8">
        <h2 className="font-headline text-3xl italic leading-tight text-taupe-800">
          მოგესალმებით
        </h2>
        <p className="mt-1 font-body text-sm text-taupe-400">
          შედით თქვენს ანგარიშზე
        </p>
      </div>

      <fetcher.Form
        method="post"
        action={formAction}
        className="flex flex-col gap-4"
      >
        <FormError message={fetcher.data?.error} />

        <FormField
          label="ელ-ფოსტა"
          name="email"
          type="email"
          placeholder="example@mail.com"
          autoComplete="email"
          disabled={isLoading}
        />

        <FormField
          label="პაროლი"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          disabled={isLoading}
        />

        <SubmitButton
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

      <AuthSwitchLink
        label="ანგარიში არ გაქვს?"
        linkText="რეგისტრაცია"
        to="/register"
        isSubmitting={isLoading}
      />
    </AuthLayout>
  );
};
