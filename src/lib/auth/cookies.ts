import { NextRequest, NextResponse } from "next/server";

export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_COOKIE = "refreshToken";
export const USER_ID_COOKIE = "userId";

const COOKIE_BASE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const readAuthCookies = (request: NextRequest) => ({
  accessToken: request.cookies.get(ACCESS_TOKEN_COOKIE)?.value ?? null,
  refreshToken: request.cookies.get(REFRESH_TOKEN_COOKIE)?.value ?? null,
  userId: request.cookies.get(USER_ID_COOKIE)?.value ?? null,
});

export const setAuthCookies = (
  response: NextResponse,
  tokens: { accessToken: string; refreshToken: string; userId: string },
) => {
  response.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
    ...COOKIE_BASE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  response.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
    ...COOKIE_BASE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  response.cookies.set(USER_ID_COOKIE, tokens.userId, {
    ...COOKIE_BASE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
};

export const clearAuthCookies = (response: NextResponse) => {
  response.cookies.set(ACCESS_TOKEN_COOKIE, "", {
    ...COOKIE_BASE_OPTIONS,
    maxAge: 0,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
    ...COOKIE_BASE_OPTIONS,
    maxAge: 0,
  });
  response.cookies.set(USER_ID_COOKIE, "", {
    ...COOKIE_BASE_OPTIONS,
    maxAge: 0,
  });
};
