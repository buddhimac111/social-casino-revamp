"use client";

import { useEffect } from "react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/auth.store";
import { LoginResponse } from "@/lib/types/auth";
import { ApiErrorResponse } from "@/lib/types/common";

export const useAuth = () => {
  const {
    userId,
    isAuthenticated,
    isHydrating,
    initSession,
    setAuthenticated,
    clearAuthState,
  } = useAuthStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    void initSession();
  }, [initSession]);

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data: LoginResponse) => {
      setAuthenticated(data.userId);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("Login successful! Redirecting...");
      window.location.href = "/";
    },
    onError: (error: unknown) => {
      console.error("Login mutation failed:", error);
      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data as ApiErrorResponse;
        toast.error(errorData.detail || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
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
