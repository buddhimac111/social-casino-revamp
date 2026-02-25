import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookies, readAuthCookies, setAuthCookies } from "@/lib/auth/cookies";
import { refreshExternal } from "@/lib/auth/external-auth";

export async function POST(request: NextRequest) {
  const { accessToken, refreshToken } = readAuthCookies(request);

  if (!accessToken || !refreshToken) {
    const unauthorizedResponse = NextResponse.json(
      { isAuthenticated: false, userId: null },
      { status: 401 },
    );
    clearAuthCookies(unauthorizedResponse);
    return unauthorizedResponse;
  }

  try {
    const refreshed = await refreshExternal({ accessToken, refreshToken });
    const response = NextResponse.json(
      {
        isAuthenticated: true,
        userId: refreshed.userId,
      },
      { status: 200 },
    );

    setAuthCookies(response, {
      accessToken: refreshed.accessToken,
      refreshToken: refreshed.refreshToken,
      userId: refreshed.userId,
    });

    return response;
  } catch {
    const unauthorizedResponse = NextResponse.json(
      { isAuthenticated: false, userId: null },
      { status: 401 },
    );
    clearAuthCookies(unauthorizedResponse);
    return unauthorizedResponse;
  }
}
