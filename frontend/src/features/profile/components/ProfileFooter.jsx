import { useFetcher } from "react-router";

export const ProfileFooter = () => {
  const fetcher = useFetcher();
  const isLoggingOut = fetcher.state !== "idle";

  return (
    <footer className="flex justify-between pt-6 border-t border-taupe-200">
      <a
        href="#"
        className="text-xs tracking-[0.16em] uppercase text-blue-500 hover:text-blue-700 transition-colors duration-150"
      >
        დახმარება
      </a>
      <fetcher.Form method="post" action="/logout">
        <button
          type="submit"
          disabled={isLoggingOut}
          className="text-xs tracking-[0.16em] uppercase text-red-400 hover:text-red-600 transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? "..." : "გამოსვლა"}
        </button>
      </fetcher.Form>
    </footer>
  );
};
