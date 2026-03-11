import { NextRequest, NextResponse } from "next/server";
import {
  clearAuthCookies,
  readAuthCookies,
  setAuthCookies,
} from "@/lib/utils/cookies";

export async function POST(request: NextRequest) {
  try {
    const { accessToken, refreshToken } = readAuthCookies(request);

    if (!accessToken || !refreshToken) {
      const response = NextResponse.json(
        { detail: "No valid tokens found" },
        { status: 401 },
      );
      clearAuthCookies(response);
      return response;
    }

    const externalResponse = await fetch(
      `${process.env.EXTERNAL_API_URL}/api/Auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, refreshToken }),
        cache: "no-store",
      },
    );

    if (!externalResponse.ok) {
      const error = await externalResponse.json();
      const response = NextResponse.json(
        { detail: error.detail || "Token refresh failed" },
        { status: externalResponse.status },
      );
      clearAuthCookies(response);
      return response;
    }

    const data = await externalResponse.json();

    const response = NextResponse.json(
      {
        isAuthenticated: true,
        userId: data.userId,
      },
      { status: 200 },
    );

    setAuthCookies(response, {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      userId: data.userId,
    });

    return response;
  } catch (error) {
    const response = NextResponse.json(
      {
        detail: error instanceof Error ? error.message : "Token refresh failed",
      },
      { status: 500 },
    );
    clearAuthCookies(response);
    return response;
  }
}
