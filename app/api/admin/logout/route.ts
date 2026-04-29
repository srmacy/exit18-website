import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-constants";

export async function GET(request: Request) {
  const login = new URL("/admin/login", request.url);
  const res = NextResponse.redirect(login);
  res.cookies.set(ADMIN_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return res;
}
