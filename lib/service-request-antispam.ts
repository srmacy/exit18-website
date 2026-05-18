/** Server-side spam checks for POST /api/service-request (no Redis / DB). */

export const MIN_SUBMIT_MS = 3000;

const REPEATED_CHAR = /(.)\1{14,}/u; // 15+ same character in a row
const HTML_OR_SCRIPT = /<\s*script|<\s*iframe|javascript:|on\w+\s*=|<\/\s*[a-z][\s>]/i;
const URL_TOKEN = /(?:https?:\/\/|www\.)[^\s<>"']+/gi;

export type SilentSpamReason =
  | "honeypot"
  | "missing-or-invalid-timestamp"
  | "too-fast"
  | "future-timestamp"
  | "injection-pattern"
  | "repeated-characters"
  | "excessive-urls"
  | "mostly-urls";

/** Honeypot + time-to-submit only (before field parsing). */
export function silentSpamEarly(body: Record<string, unknown>): SilentSpamReason | null {
  const honeypot = String(body.companyWebsite ?? "").trim();
  if (honeypot.length > 0) return "honeypot";

  const raw = body.formStartedAt;
  const ts = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(ts)) return "missing-or-invalid-timestamp";

  const now = Date.now();
  if (ts > now + 60_000) return "future-timestamp";
  if (now - ts < MIN_SUBMIT_MS) return "too-fast";

  return null;
}

/** Obvious bot / SEO spam in text fields — silent reject (+ no email). */
export function silentSpamContent(fields: {
  name: string;
  phone: string;
  issue: string;
  email: string;
  address: string;
  model: string;
  brand: string | null;
}): SilentSpamReason | null {
  const { name, phone, issue, email, address, model, brand } = fields;
  const blob = [name, issue, email, address, model, brand ?? ""].join("\n");

  if (HTML_OR_SCRIPT.test(blob)) return "injection-pattern";

  for (const chunk of [name, issue]) {
    if (REPEATED_CHAR.test(chunk)) return "repeated-characters";
  }

  const urlMatches = issue.match(URL_TOKEN) ?? [];
  if (urlMatches.length >= 3) return "excessive-urls";

  const stripped = issue.replace(URL_TOKEN, " ").replace(/\s+/g, " ").trim();
  if (issue.length > 40 && stripped.length < 10) return "mostly-urls";

  return null;
}

/** User-facing validation — real customers see the same behavior as before for good data. */
export function getFieldValidationMessage(
  name: string,
  phone: string,
  issue: string,
): string | null {
  const letterCount = (name.match(/\p{L}/gu) ?? []).length;
  if (letterCount < 2) {
    return "Please enter your name using at least two letters.";
  }

  const digits = (phone.match(/\d/g) ?? []).length;
  if (digits < 7) {
    return "Please enter a phone number with at least seven digits.";
  }

  const issueTrim = issue.replace(/\s+/g, " ").trim();
  if (issueTrim.length < 10) {
    return "Please describe what you need in at least ten characters.";
  }

  return null;
}

export function logRejectedSubmission(
  reason: SilentSpamReason | string,
  detail?: Record<string, unknown>,
) {
  console.info(
    JSON.stringify({
      scope: "[service-request]",
      outcome: "rejected",
      reason,
      ...detail,
    }),
  );
}
