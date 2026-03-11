import api from "./axios";
import {
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  SessionResponse,
} from "@/lib/types/auth";

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", credentials, {
      headers: { "x-skip-auth-refresh": "true" },
    });
    return response.data;
  },

  refresh: async (): Promise<RefreshResponse> => {
    const response = await api.post("/auth/refresh", {}, {
      headers: { "x-skip-auth-refresh": "true" },
    });
    return response.data;
  },

  session: async (): Promise<SessionResponse> => {
    const response = await api.get("/auth/session", {
      headers: { "x-skip-auth-refresh": "true" },
    });
    return response.data;
  },

  logout: async () => {
    await api.post("/auth/logout", {}, {
      headers: { "x-skip-auth-refresh": "true" },
    });
  },
};
