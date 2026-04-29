import type { ServiceRequest } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { notifyServiceStaff } from "@/lib/service-request-email";

/** Persists to website DB only (isolated from maintenance portal — see README). */
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

    let created: ServiceRequest;
    try {
      created = await prisma.serviceRequest.create({
        data: {
          name,
          phone,
          email,
          address,
          brand,
          model,
          issue,
          needsPickup,
          bestTime,
        },
      });
    } catch (e) {
      console.error("[service-request] DB error", e);
      return NextResponse.json(
        {
          ok: false,
          message:
            "We could not save your request. Please call the shop or try again later.",
        },
        { status: 503 },
      );
    }

    try {
      await notifyServiceStaff(created);
    } catch (mailErr) {
      console.error("[service-request] email failed after save", mailErr);
      /* Request is still stored; user sees success — staff can use admin list */
    }

    return NextResponse.json({ ok: true, id: created.id });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Could not read request." },
      { status: 400 },
    );
  }
}
