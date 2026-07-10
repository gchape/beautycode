import { useFetcher } from "react-router";

export const useFormFetcher = <T = unknown>() => {
  const fetcher = useFetcher<T>();

  return {
    fetcher,
    isLoading: fetcher.state !== "idle",
    data: fetcher.data,
  };
};
