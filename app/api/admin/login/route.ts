import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-constants";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    const pwd = body.password ?? "";
    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionSecret = process.env.ADMIN_SESSION_SECRET;

    if (!adminPassword || !sessionSecret) {
      console.error(
        "[admin-login] Missing ADMIN_PASSWORD or ADMIN_SESSION_SECRET",
      );
      return NextResponse.json(
        { ok: false, message: "Login is not configured on the server." },
        { status: 500 },
      );
    }

    if (pwd !== adminPassword) {
      return NextResponse.json({ ok: false, message: "Invalid password." }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    const isProd = process.env.NODE_ENV === "production";

    res.cookies.set(ADMIN_COOKIE_NAME, sessionSecret, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: isProd,
      maxAge: 60 * 60 * 24 * 14,
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
  }
}
