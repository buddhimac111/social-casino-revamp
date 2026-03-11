import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookies, readAuthCookies } from "@/lib/utils/cookies";

export async function GET(request: NextRequest) {
  try {
    const { accessToken, userId } = readAuthCookies(request);

    if (!accessToken || !userId) {
      const response = NextResponse.json(
        { isAuthenticated: false, userId: null },
        { status: 401 },
      );
      clearAuthCookies(response);
      return response;
    }

    return NextResponse.json(
      {
        isAuthenticated: true,
        userId,
      },
      { status: 200 },
    );
  } catch {
    const response = NextResponse.json(
      { isAuthenticated: false, userId: null },
      { status: 500 },
    );
    clearAuthCookies(response);
    return response;
  }
}
