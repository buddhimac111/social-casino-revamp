import { NextRequest, NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/utils/cookies";
import { LoginRequest } from "@/lib/types/auth";

export async function POST(request: NextRequest) {
  try {
    const credentials = (await request.json()) as LoginRequest;

    const externalResponse = await fetch(
      `${process.env.EXTERNAL_API_URL}/api/Auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        cache: "no-store",
      },
    );

    if (!externalResponse.ok) {
      const error = await externalResponse.json();
      return NextResponse.json(
        { detail: error.detail || "Login failed" },
        { status: externalResponse.status },
      );
    }

    const data = await externalResponse.json();

    const response = NextResponse.json(
      {
        isAuthenticated: true,
        userId: data.userId,
        userRole: data.userRole ?? null,
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
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "Login failed" },
      { status: 500 },
    );
  }
}
