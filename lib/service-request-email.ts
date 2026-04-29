import { Resend } from "resend";
import type { ServiceRequest as ServiceRequestRecord } from "@prisma/client";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function notifyServiceStaff(request: ServiceRequestRecord) {
  const to = process.env.SERVICE_NOTIFICATION_EMAIL ?? "service@exit18equipment.com";
  const from = process.env.EMAIL_FROM ?? "Exit 18 Equipment <noreply@exit18equipment.com>";
  const key = process.env.RESEND_API_KEY;

  const lines = [
    ["Name", request.name],
    ["Phone", request.phone],
    ["Email", request.email ?? "—"],
    ["Address", request.address ?? "—"],
    ["Brand", request.brand ?? "—"],
    ["Model", request.model ?? "—"],
    ["Pickup?", request.needsPickup ? "Yes" : "No"],
    ["Best time", request.bestTime ?? "—"],
    ["Issue / description", request.issue],
  ];

  const textBody = [`New service request (${request.id})`, "", ...lines.map(([k, v]) => `${k}: ${v}`)].join(
    "\n",
  );

  const htmlRows = lines
    .map(([k, v]) => {
      const isIssue = k === "Issue / description";
      const cell =
        isIssue
          ? `<td style="padding:6px 12px;white-space:pre-wrap;">${escapeHtml(v)}</td>`
          : `<td style="padding:6px 12px;">${escapeHtml(v)}</td>`;
      return `<tr><td style="padding:6px 12px;font-weight:bold;">${escapeHtml(k)}</td>${cell}</tr>`;
    })
    .join("");

  const htmlBody = `
    <p><strong>New service request</strong> — ID ${escapeHtml(request.id)}</p>
    <table style="border-collapse:collapse;">${htmlRows}</table>
    <p style="margin-top:16px;color:#555;font-size:12px;">Submitted ${request.createdAt.toISOString()}</p>
  `;

  if (!key) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[service-request-email] RESEND_API_KEY missing — skipping send. Payload logged.",
      );
      console.info("[service-request-email] would send to:", to, "\n", textBody);
    }
    return { sent: false, reason: "no_resend_api_key" as const };
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: `Service request: ${request.name} — Exit 18`,
    text: textBody,
    html: htmlBody,
  });

  if (error) {
    throw new Error(error.message ?? "Resend rejected the message");
  }

  return { sent: true as const };
}
