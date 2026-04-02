import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMe } from "../api/auth";
import { useAuthStore } from "../stores/useAuthStore";

export const useMe = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const logoutStore = useAuthStore((state) => state.logout);

  const query = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const logout = () => {
    logoutStore();
    queryClient.clear();
  };

  return {
    user: query.data?.data || null,
    isLoading: query.isLoading,
    isLoggedIn: !!token && !!query.data?.data,
    logout,
    refetchUser: query.refetch,
    error: query.error,
  };
};

// Export useUser để tương thích với code cũ (Tránh phải sửa 14 file cùng lúc)
export const useUser = useMe;
