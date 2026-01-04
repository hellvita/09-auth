"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import Loading from "@/app/loading";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const isAuthenticated = await checkSession();

      if (isAuthenticated) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }

      setIsLoading(false);
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return isLoading ? <Loading /> : children;
}
