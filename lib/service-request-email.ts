import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import type { ServiceRequest as ServiceRequestRecord } from "@prisma/client";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Plain fields for outbound service-request notifications (email-only or after DB persist). */
export type ServiceRequestMailPayload = {
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
  brand: string | null;
  model: string | null;
  issue: string;
  needsPickup: boolean;
  bestTime: string | null;
};

function serviceRequestMailContent(
  payload: ServiceRequestMailPayload,
  submissionRef: string,
  submittedAt: Date,
): { subject: string; textBody: string; htmlBody: string } {
  const lines: [string, string][] = [
    ["Name", payload.name],
    ["Phone", payload.phone],
    ["Email", payload.email ?? "—"],
    ["Address", payload.address ?? "—"],
    ["Brand", payload.brand ?? "—"],
    ["Model", payload.model ?? "—"],
    ["Pickup?", payload.needsPickup ? "Yes" : "No"],
    ["Best time", payload.bestTime ?? "—"],
    ["Issue / description", payload.issue],
  ];

  const textBody = [
    `New service request (ref ${submissionRef})`,
    "",
    ...lines.map(([k, v]) => `${k}: ${v}`),
  ].join("\n");

  const htmlRows = lines
    .map(([k, v]) => {
      const isIssue = k === "Issue / description";
      const cell = isIssue
        ? `<td style="padding:6px 12px;white-space:pre-wrap;">${escapeHtml(v)}</td>`
        : `<td style="padding:6px 12px;">${escapeHtml(v)}</td>`;
      return `<tr><td style="padding:6px 12px;font-weight:bold;">${escapeHtml(k)}</td>${cell}</tr>`;
    })
    .join("");

  const htmlBody = `
    <p><strong>New service request</strong> — ref ${escapeHtml(submissionRef)}</p>
    <table style="border-collapse:collapse;">${htmlRows}</table>
    <p style="margin-top:16px;color:#555;font-size:12px;">Submitted ${escapeHtml(submittedAt.toISOString())}</p>
  `;

  const subject = `Service request: ${payload.name} — Exit 18`;
  return { subject, textBody, htmlBody };
}

/** Requires non-empty RESEND_API_KEY (trimmed). @throws Error when Resend returns an error */
async function dispatchServiceRequestParts(parts: {
  subject: string;
  textBody: string;
  htmlBody: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY!.trim();
  const to = process.env.SERVICE_NOTIFICATION_EMAIL ?? "service@exit18equipment.com";
  const from =
    process.env.EMAIL_FROM ?? "Exit 18 Equipment <noreply@exit18equipment.com>";

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: parts.subject,
    text: parts.textBody,
    html: parts.htmlBody,
  });

  if (error) {
    throw new Error(error.message ?? "Resend rejected the message");
  }
}

/**
 * Send service request email from validated form payload. Caller must validate RESEND_API_KEY first.
 * @throws Error when Resend returns an error
 */
export async function notifyServiceStaffByPayload(
  payload: ServiceRequestMailPayload,
): Promise<{ submissionRef: string }> {
  const submissionRef = randomUUID();
  const submittedAt = new Date();
  const parts = serviceRequestMailContent(payload, submissionRef, submittedAt);
  await dispatchServiceRequestParts(parts);
  return { submissionRef };
}

function recordToPayload(request: ServiceRequestRecord): ServiceRequestMailPayload {
  return {
    name: request.name,
    phone: request.phone,
    email: request.email,
    address: request.address,
    brand: request.brand,
    model: request.model,
    issue: request.issue,
    needsPickup: request.needsPickup,
    bestTime: request.bestTime,
  };
}

/** After DB persist: optional email — skips send in dev without key; throws if Resend errors when key exists. */
export async function notifyServiceStaff(request: ServiceRequestRecord) {
  const payload = recordToPayload(request);
  const to = process.env.SERVICE_NOTIFICATION_EMAIL ?? "service@exit18equipment.com";
  const key = process.env.RESEND_API_KEY?.trim();

  const parts = serviceRequestMailContent(
    payload,
    request.id,
    request.createdAt,
  );

  if (!key) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[service-request-email] RESEND_API_KEY missing — skipping send. Payload logged.",
      );
      console.info("[service-request-email] would send to:", to, "\n", parts.textBody);
    }
    return { sent: false, reason: "no_resend_api_key" as const };
  }

  await dispatchServiceRequestParts(parts);
  return { sent: true as const };
}
