"use client";

import { useEffect } from "react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/auth.store";

export const useAuth = () => {
  const { userId, isAuthenticated, isHydrating, initSession, setAuthenticated, clearAuthState } =
    useAuthStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    void initSession();
  }, [initSession]);

  const getStatusCode = (error: unknown): number | undefined => {
    if (error instanceof AxiosError) {
      return error.response?.status;
    }
    return undefined;
  };

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuthenticated(data.userId);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error: unknown) => {
      console.error("Login mutation failed:", error);
      if (getStatusCode(error) === 401) {
        toast.error("Invalid email or password");
      }
    },
  });

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      clearAuthState();
    }
    queryClient.clear();
  };

  return {
    userId,
    isAuthenticated,
    isLoading: isHydrating,

    login: loginMutation.mutateAsync,
    logout,
    isLoginLoading: loginMutation.isPending,
    loginError: loginMutation.error,
    isLoginError: loginMutation.isError,
    resetLoginError: loginMutation.reset,
  };
};
