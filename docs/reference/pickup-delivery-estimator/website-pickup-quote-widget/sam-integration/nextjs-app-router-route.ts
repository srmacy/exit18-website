// Example for Sam if the site uses the Next.js App Router:
// Put this at app/api/pickup-delivery-estimate/route.ts
// Add GOOGLE_MAPS_API_KEY to the site's server environment variables.

import { NextRequest, NextResponse } from "next/server";

const SHOP_ADDRESS = "27 Morse Drive, Fairfax, VT 05454";

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address")?.trim();
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!address) {
    return NextResponse.json({ error: "Address is required." }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({ error: "Google Maps API key is not configured." }, { status: 500 });
  }

  const routeResponse = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
    },
    body: JSON.stringify({
      origin: { address: SHOP_ADDRESS },
      destination: { address },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_UNAWARE",
      computeAlternativeRoutes: false,
      units: "IMPERIAL",
      languageCode: "en-US",
    }),
  });

  if (!routeResponse.ok) {
    return NextResponse.json({ error: "Google route lookup failed." }, { status: 502 });
  }

  const data = await routeResponse.json();
  const route = data.routes?.[0];

  if (!route?.duration || typeof route.distanceMeters !== "number") {
    return NextResponse.json({ error: "No driving route found." }, { status: 404 });
  }

  const seconds = Number(String(route.duration).replace("s", ""));
  return NextResponse.json({
    oneWayMinutes: seconds / 60,
    oneWayMiles: route.distanceMeters / 1609.344,
  });
}
