import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/auth";

interface UserContextType {
  user: any;
  isLoading: boolean;
  refetchUser: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  refetchUser: () => {}
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <UserContext.Provider value={{ user: data, isLoading, refetchUser: refetch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);