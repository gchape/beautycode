import { useFormFetcher } from "src/hooks/useFormFetcher";

export const ProfileFooter = () => {
  const { fetcher, isLoading } = useFormFetcher();

  return (
    <footer className="flex justify-between pt-6 border-t border-taupe-200">
      <a
        href="mailto:13beauty.code@gmail.com"
        className="text-xs tracking-[0.16em] uppercase text-taupe-500
                   hover:text-taupe-700 transition-colors duration-150"
      >
        დახმარება
      </a>
      <fetcher.Form method="post" action="/logout">
        <button
          type="submit"
          disabled={isLoading}
          className="text-xs tracking-[0.16em] uppercase text-red-400 hover:text-red-600
                     transition-colors duration-150 cursor-pointer
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          გამოსვლა
        </button>
      </fetcher.Form>
    </footer>
  );
};
