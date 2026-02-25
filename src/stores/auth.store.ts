"use client";

import { create } from "zustand";
import { authApi } from "@/lib/api/auth";

interface AuthStoreState {
  userId: string | null;
  isAuthenticated: boolean;
  isHydrating: boolean;
  hasInitialized: boolean;
  setAuthenticated: (userId: string | null) => void;
  clearAuthState: () => void;
  initSession: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  userId: null,
  isAuthenticated: false,
  isHydrating: true,
  hasInitialized: false,

  setAuthenticated: (userId) => {
    set({
      userId,
      isAuthenticated: true,
      isHydrating: false,
    });
  },

  clearAuthState: () => {
    set({
      userId: null,
      isAuthenticated: false,
      isHydrating: false,
      hasInitialized: true,
    });
  },

  initSession: async () => {
    if (get().hasInitialized) {
      return;
    }

    set({ isHydrating: true });
    try {
      const session = await authApi.session();
      set({
        userId: session.userId,
        isAuthenticated: session.isAuthenticated,
        isHydrating: false,
        hasInitialized: true,
      });
    } catch {
      set({
        userId: null,
        isAuthenticated: false,
        isHydrating: false,
        hasInitialized: true,
      });
    }
  },
}));
