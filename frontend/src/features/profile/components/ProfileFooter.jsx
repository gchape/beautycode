import { useFormFetcher } from "src/hooks/useFormFetcher";

export const ProfileFooter = () => {
  const { fetcher, isLoading } = useFormFetcher();

  return (
    <footer className="flex justify-between items-center pt-6 border-t border-taupe-200">
      <a
        href="mailto:13beauty.code@gmail.com"
        className="text-xs tracking-[0.18em] uppercase text-taupe-400 hover:text-taupe-700 transition-colors duration-150"
      >
        დახმარება
      </a>
      <fetcher.Form method="post" action="/logout">
        <button
          type="submit"
          disabled={isLoading}
          className="text-xs tracking-[0.18em] uppercase text-rose-400 hover:text-rose-600
                     transition-colors duration-150 cursor-pointer
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          გამოსვლა
        </button>
      </fetcher.Form>
    </footer>
  );
};
