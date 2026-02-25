export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  userId: string;
  userRole?: string;
}

export interface RefreshResponse {
  isAuthenticated: boolean;
  userId: string | null;
}

export interface SessionResponse {
  isAuthenticated: boolean;
  userId: string | null;
}

export interface AuthState {
  userId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Forgot Password Types
export interface ForgotPasswordRequest {
  email: string;
}

// Reset Password Types
export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}
