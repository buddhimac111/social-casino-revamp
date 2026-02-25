import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookies, readAuthCookies } from "@/lib/auth/cookies";

export async function GET(request: NextRequest) {
  const { accessToken, userId } = readAuthCookies(request);

  if (!accessToken || !userId) {
    const unauthorizedResponse = NextResponse.json(
      { isAuthenticated: false, userId: null },
      { status: 401 },
    );
    clearAuthCookies(unauthorizedResponse);
    return unauthorizedResponse;
  }

  return NextResponse.json(
    {
      isAuthenticated: true,
      userId,
    },
    { status: 200 },
  );
}
