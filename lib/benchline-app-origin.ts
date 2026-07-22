/**
 * Benchline customer-tool host for iframes and deep links.
 * Production default: https://app.mybenchline.com
 * Local: set NEXT_PUBLIC_BENCHLINE_APP_ORIGIN to the Benchline next dev origin
 * (e.g. http://localhost:3002) so embeds are allowed by Benchline's
 * development frame-ancestors policy.
 */
export const BENCHLINE_APP_ORIGIN = (
  process.env.NEXT_PUBLIC_BENCHLINE_APP_ORIGIN?.trim() ||
  "https://app.mybenchline.com"
).replace(/\/$/, "");

export function benchlineCustomerToolUrl(
  path: `/${string}`,
  query?: Record<string, string>,
): string {
  const url = new URL(path, `${BENCHLINE_APP_ORIGIN}/`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}
