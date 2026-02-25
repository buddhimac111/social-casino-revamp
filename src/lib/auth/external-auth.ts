import axios from "axios";

interface ExternalAuthResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userRole?: string;
}

const getExternalApiUrl = () => {
  const baseUrl = process.env.EXTERNAL_API_URL;
  if (!baseUrl) {
    throw new Error("EXTERNAL_API_URL is not configured");
  }
  return baseUrl.replace(/\/$/, "");
};

export const callExternalAuthEndpoint = async <TResponse>(
  path: string,
  payload: unknown,
): Promise<TResponse> => {
  const response = await axios.post<TResponse>(
    `${getExternalApiUrl()}${path}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export const loginExternal = (credentials: {
  email: string;
  password: string;
}) => {
  return callExternalAuthEndpoint<ExternalAuthResponse>("/api/Auth/login", credentials);
};

export const refreshExternal = (tokens: {
  accessToken: string;
  refreshToken: string;
}) => {
  return callExternalAuthEndpoint<ExternalAuthResponse>("/api/Auth/refresh", tokens);
};
