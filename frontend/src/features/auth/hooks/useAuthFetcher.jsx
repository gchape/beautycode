import { useFetcher } from "react-router";

export const useAuthFetcher = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";
  const error = fetcher.data?.error;
  return { fetcher, isSubmitting, error };
};
