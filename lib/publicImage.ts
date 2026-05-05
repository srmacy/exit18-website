import { existsSync } from "node:fs";
import { join } from "node:path";

/** Resolve `/foo/bar.jpg` against `process.cwd()/public/` (server-side). */
export function publicImageExists(publicPath: string): boolean {
  const relative = publicPath.replace(/^\/+/, "");
  if (!relative) return false;
  try {
    return existsSync(join(process.cwd(), "public", relative));
  } catch {
    return false;
  }
}
