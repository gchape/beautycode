import { useFetcher } from "react-router";

export const useFormFetcher = () => {
  const fetcher = useFetcher();

  return {
    fetcher: fetcher,
    isLoading: fetcher.state !== "idle",
    data: fetcher.data,
  };
};
