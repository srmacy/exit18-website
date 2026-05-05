import { NextResponse } from "next/server";
import {
  notifyServiceStaffByPayload,
  type ServiceRequestMailPayload,
} from "@/lib/service-request-email";

/** Email-only submissions for launch (no DATABASE_URL). Prisma/admin remain for future use. */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
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
      return NextResponse.json(
        { ok: false, message: "Name, phone, and issue description are required." },
        { status: 400 },
      );
    }

    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (!resendKey) {
      return NextResponse.json(
        {
          ok: false,
          message: "Service request email is not configured.",
        },
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
      console.error("[service-request] email send failed", e);
      return NextResponse.json(
        {
          ok: false,
          message:
            "We could not send your request. Please call the shop or try again later.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Could not read request." },
      { status: 400 },
    );
  }
}
