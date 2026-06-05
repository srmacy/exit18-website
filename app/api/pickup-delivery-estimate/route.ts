import { NextRequest, NextResponse } from "next/server";
import { pickupDeliveryConfig } from "@/lib/pickup-delivery-config";
import { validateEstimateAddress } from "@/lib/pickup-delivery-quote";

const GENERIC_ROUTE_ERROR =
  "We could not get a route estimate right now. Please call the shop for help.";
const GENERIC_CONFIG_ERROR =
  "Travel estimates are temporarily unavailable. Please call the shop for a quote.";

export async function GET(request: NextRequest) {
  const rawAddress = request.nextUrl.searchParams.get("address");
  const validated = validateEstimateAddress(rawAddress ?? "", pickupDeliveryConfig);

  if (!validated.ok) {
    return NextResponse.json({ error: validated.message }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY?.trim();
  if (!apiKey) {
    console.error(
      JSON.stringify({
        scope: "[pickup-delivery-estimate]",
        outcome: "misconfigured",
        reason: "missing GOOGLE_MAPS_API_KEY",
      }),
    );
    return NextResponse.json({ error: GENERIC_CONFIG_ERROR }, { status: 503 });
  }

  let routeResponse: Response;
  try {
    routeResponse = await fetch(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
        },
        body: JSON.stringify({
          origin: { address: pickupDeliveryConfig.shopAddress },
          destination: { address: validated.address },
          travelMode: "DRIVE",
          routingPreference: "TRAFFIC_UNAWARE",
          computeAlternativeRoutes: false,
          units: "IMPERIAL",
          languageCode: "en-US",
        }),
      },
    );
  } catch (e) {
    console.error(
      JSON.stringify({
        scope: "[pickup-delivery-estimate]",
        outcome: "failed",
        reason: "google-fetch-error",
        detail: e instanceof Error ? e.message : String(e),
      }),
    );
    return NextResponse.json({ error: GENERIC_ROUTE_ERROR }, { status: 502 });
  }

  if (!routeResponse.ok) {
    console.error(
      JSON.stringify({
        scope: "[pickup-delivery-estimate]",
        outcome: "failed",
        reason: "google-http-error",
        status: routeResponse.status,
      }),
    );
    return NextResponse.json({ error: GENERIC_ROUTE_ERROR }, { status: 502 });
  }

  let data: {
    routes?: Array<{
      duration?: string;
      distanceMeters?: number;
    }>;
  };

  try {
    data = (await routeResponse.json()) as typeof data;
  } catch {
    return NextResponse.json({ error: GENERIC_ROUTE_ERROR }, { status: 502 });
  }

  const route = data.routes?.[0];
  if (!route?.duration || typeof route.distanceMeters !== "number") {
    return NextResponse.json(
      {
        error:
          "We could not find a driving route for that address. Please double-check it or call the shop.",
      },
      { status: 404 },
    );
  }

  const seconds = Number(String(route.duration).replace("s", ""));
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return NextResponse.json({ error: GENERIC_ROUTE_ERROR }, { status: 502 });
  }

  return NextResponse.json({
    oneWayMinutes: seconds / 60,
    oneWayMiles: route.distanceMeters / 1609.344,
  });
}
