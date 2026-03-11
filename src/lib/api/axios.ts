import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  headers: InternalAxiosRequestConfig["headers"] & {
    "x-skip-auth-refresh"?: string;
  };
}

const SKIP_AUTH_REFRESH_HEADER = "x-skip-auth-refresh";

let refreshInFlight: Promise<void> | null = null;

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // Let the browser set multipart boundary automatically.
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const status = error.response?.status;
    const skipRefresh =
      originalRequest?.headers?.[SKIP_AUTH_REFRESH_HEADER]?.toString() === "true";

    if (!originalRequest || status !== 401 || originalRequest._retry || skipRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshInFlight) {
        refreshInFlight = import("./auth")
          .then(({ authApi }) => authApi.refresh())
          .then(() => undefined)
          .finally(() => {
            refreshInFlight = null;
          });
      }

      await refreshInFlight;
      return api(originalRequest);
    } catch (refreshError) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    }
  },
);

export default api;
