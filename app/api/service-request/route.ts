import {
  notifyServiceStaffByPayload,
  type ServiceRequestMailPayload,
} from "@/lib/service-request-email";
import {
  getFieldValidationMessage,
  logRejectedSubmission,
  silentSpamContent,
  silentSpamEarly,
} from "@/lib/service-request-antispam";

const fakeSuccess = () => Response.json({ ok: true });

/** Email-only submissions for launch (no DATABASE_URL). Prisma/admin remain for future use. */
export async function POST(request: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return Response.json(
        { ok: false, message: "Could not read request." },
        { status: 400 },
      );
    }

    const earlySpam = silentSpamEarly(body);
    if (earlySpam) {
      logRejectedSubmission(earlySpam);
      return fakeSuccess();
    }

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const issue = String(body.issue ?? "").trim();
    const email = String(body.email ?? "").trim() || null;
    const address = String(body.address ?? "").trim() || null;
    const brand = String(body.brand ?? "").trim() || null;
    const model = String(body.model ?? "").trim() || null;
    const pickupVal = String(body.pickup ?? "no");
    const needsPickup = pickupVal === "yes";
    const bestTime =
      String(body.contactTime ?? "").trim() ||
      String(body.bestTime ?? "").trim() ||
      null;

    if (!name || !phone || !issue) {
      return Response.json(
        { ok: false, message: "Missing required fields." },
        { status: 400 },
      );
    }

    const contentSpam = silentSpamContent({
      name,
      phone,
      issue,
      email: email ?? "",
      address: address ?? "",
      model: model ?? "",
      brand,
    });
    if (contentSpam) {
      logRejectedSubmission(contentSpam, {
        nameLen: name.length,
        issueLen: issue.length,
      });
      return fakeSuccess();
    }

    const validationMsg = getFieldValidationMessage(name, phone, issue);
    if (validationMsg) {
      return Response.json(
        { ok: false, message: validationMsg },
        { status: 400 },
      );
    }

    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (!resendKey) {
      return Response.json(
        { ok: false, message: "Service request email is not configured." },
        { status: 503 },
      );
    }

    const payload: ServiceRequestMailPayload = {
      name,
      phone,
      email,
      address,
      brand,
      model,
      issue,
      needsPickup,
      bestTime,
    };

    try {
      await notifyServiceStaffByPayload(payload);
    } catch (e) {
      const errInfo =
        e instanceof Error
          ? { thrownName: e.name, thrownMessage: e.message }
          : { thrown: String(e) };
      console.error(
        JSON.stringify({
          scope: "[service-request]",
          phase: "notifyServiceStaffByPayload",
          ...errInfo,
        }),
      );
      return Response.json(
        {
          ok: false,
          message:
            "We could not send your request. Please call the shop or try again later.",
        },
        { status: 503 },
      );
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error(
      JSON.stringify({
        scope: "[service-request]",
        phase: "unexpected",
        detail: String(e),
      }),
    );
    return Response.json(
      {
        ok: false,
        message:
          "We could not send your request. Please call the shop or try again later.",
      },
      { status: 503 },
    );
  }
}
