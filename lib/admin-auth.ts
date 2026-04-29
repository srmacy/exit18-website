import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-constants";

export async function isAdminAuthenticated(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  const cookie = (await cookies()).get(ADMIN_COOKIE_NAME);
  return cookie?.value === secret;
}
