import { redirect, useFetcher, type ActionFunctionArgs } from "react-router";
import { authApi } from "src/entities/auth";
import RegisterImage from "src/assets/images/auth/register.webp";
import { AuthLayout } from "src/ui/auth/AuthLayout";
import { AuthSwitchLink } from "src/ui/auth/AuthSwitchLink";
import { FormError } from "src/ui/auth/FormError";
import { FormField } from "src/ui/auth/FormField";
import { SubmitButton } from "src/ui/auth/SubmitButton";
import { TermsNotice } from "src/ui/auth/TermsNotice";

interface RegisterActionData {
  error?: string;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData.entries()) as Record<
    string,
    string
  >;

  if (entries.password !== entries.confirmPassword) {
    return { error: "პაროლები არ ემთხვევა" } satisfies RegisterActionData;
  }

  try {
    // Backend's RegisterRequest has no confirmPassword field — send only
    // what it expects rather than the raw form entries.
    await authApi.register({
      firstName: entries.firstName,
      lastName: entries.lastName,
      email: entries.email,
      phone: entries.phone,
      password: entries.password,
    });
    return redirect("/login");
  } catch (error) {
    if (
      error instanceof Error &&
      "status" in error &&
      (error as { status: number }).status === 409
    ) {
      return {
        error: "ელ-ფოსტა უკვე გამოყენებულია",
      } satisfies RegisterActionData;
    }
    return {
      error: "დაფიქსირდა შეცდომა, სცადეთ მოგვიანებით",
    } satisfies RegisterActionData;
  }
};

export const Component = () => {
  const fetcher = useFetcher<RegisterActionData>();
  const isLoading = fetcher.state !== "idle";

  return (
    <AuthLayout imageSrc={RegisterImage}>
      <div className="mb-8">
        <h2 className="font-headline text-3xl italic text-taupe-800 leading-tight">
          ანგარიშის შექმნა
        </h2>
      </div>

      <fetcher.Form method="post" className="flex flex-col gap-4">
        <FormError message={fetcher.data?.error} />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            label="სახელი"
            name="firstName"
            type="text"
            placeholder="მარიამი"
            autoComplete="given-name"
            disabled={isLoading}
          />
          <FormField
            label="გვარი"
            name="lastName"
            type="text"
            placeholder="გელაშვილი"
            autoComplete="family-name"
            disabled={isLoading}
          />
        </div>

        <FormField
          label="ელ-ფოსტა"
          name="email"
          type="email"
          placeholder="mariam@example.com"
          autoComplete="email"
          disabled={isLoading}
        />
        <FormField
          label="ტელეფონი"
          name="phone"
          type="tel"
          placeholder="(+995) 599-000-000"
          autoComplete="tel"
          disabled={isLoading}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            label="პაროლი"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isLoading}
          />
          <FormField
            label="გაიმეორე"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isLoading}
          />
        </div>

        <TermsNotice />

        <div className="pt-1">
          <SubmitButton
            label="რეგისტრაცია"
            loadingLabel="დაელოდეთ..."
            isSubmitting={isLoading}
          />
        </div>
      </fetcher.Form>

      <AuthSwitchLink
        label="უკვე გაქვს ანგარიში?"
        linkText="შესვლა"
        to="/login"
        isSubmitting={isLoading}
      />
    </AuthLayout>
  );
};
