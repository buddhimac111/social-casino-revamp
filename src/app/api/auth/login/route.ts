import { NextRequest, NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/auth/cookies";
import { loginExternal } from "@/lib/auth/external-auth";
import { LoginRequest } from "@/lib/types/auth";

export async function POST(request: NextRequest) {
  try {
    const credentials = (await request.json()) as LoginRequest;
    const response = await loginExternal(credentials);

    const nextResponse = NextResponse.json(
      {
        isAuthenticated: true,
        userId: response.userId,
        userRole: response.userRole ?? null,
      },
      { status: 200 },
    );

    setAuthCookies(nextResponse, {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      userId: response.userId,
    });

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Login failed" },
      { status: 401 },
    );
  }
}
