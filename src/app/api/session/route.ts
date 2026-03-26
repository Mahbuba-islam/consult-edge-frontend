import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserInfo } from "@/src/services/auth.services";

export async function GET() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  try {
    const userInfo = await getUserInfo();

    return NextResponse.json({
      authenticated: true,
      user: userInfo,
    });
  } catch (err) {
    return NextResponse.json({ authenticated: false, user: null });
  }
}