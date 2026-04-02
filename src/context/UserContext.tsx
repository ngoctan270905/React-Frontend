import { useEffect, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/auth";
import { useAuthStore } from "../stores/useAuthStore";

export const UserProvider = ({ children }: { children: ReactNode }) => { 
  const token = localStorage.getItem("token");
  const { setUser, setLoading } = useAuthStore(); 

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: !!token, 
    retry: false,  
    staleTime: Infinity, 
    refetchOnWindowFocus: false, 
    refetchOnReconnect: false,
  });

  // === Đồng bộ dữ liệu từ React Query vào Zustand ===
  useEffect(() => {
    setLoading(isLoading);

    if (data?.success && data?.data) {
      setUser(data.data);        // ← Đẩy dữ liệu user vào Zustand
    } else if (!token) {
      setUser(null);
    }
  }, [data, isLoading, setUser, setLoading, token]);

  return <>{children}</>; 
};

// Export hook để dùng ở mọi nơi
export const useUser = () => { 
  const { user, isLoading, logout, updateProfile } = useAuthStore();
  const { refetch } = useQuery({ 
    queryKey: ["me"],
    queryFn: fetchMe, 
    enabled: false, 
  });

  return { 
    user,
    isLoading,
    refetchUser: refetch,
    logout,
    updateProfile,
  };
};