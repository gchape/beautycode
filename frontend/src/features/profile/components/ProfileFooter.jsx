import { useFormFetcher } from "src/hooks/useFormFetcher";

export const ProfileFooter = () => {
  const { fetcher, isLoading } = useFormFetcher();

  return (
    <footer className="flex justify-between items-center pt-6 border-t border-taupe-200">
      <a
        href="mailto:13beauty.code@gmail.com"
        className="link link-hover text-xs tracking-[0.18em] uppercase text-taupe-400"
      >
        დახმარება
      </a>
      <fetcher.Form method="post" action="/logout">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-ghost btn-xs text-error tracking-[0.18em] uppercase
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          გამოსვლა
        </button>
      </fetcher.Form>
    </footer>
  );
};
