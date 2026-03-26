import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/auth";

export const useMe = () => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};