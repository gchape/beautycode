import { useFetcher } from "react-router";

export const ProfilePageFooter = () => {
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";

  return (
    <footer className="flex justify-between items-center pt-6 border-t border-taupe-200">
      <a
        href="mailto:13beauty.code@gmail.com"
        className="text-xs tracking-[0.18em] uppercase text-taupe-400 hover:underline"
      >
        დახმარება
      </a>
      <fetcher.Form method="post" action="/logout">
        <button
          type="submit"
          disabled={isLoading}
          className="text-taupe-400 hover:text-error tracking-[0.18em] text-xs uppercase transition-colors duration-200
             disabled:opacity-50 disabled:cursor-not-allowed"
        >
          გამოსვლა
        </button>
      </fetcher.Form>
    </footer>
  );
};
