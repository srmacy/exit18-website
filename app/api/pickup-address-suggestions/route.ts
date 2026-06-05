import { NextRequest, NextResponse } from "next/server";
import { pickupDeliveryConfig } from "@/lib/pickup-delivery-config";
import {
  fetchAddressSuggestions,
  fetchFormattedAddressForPlace,
} from "@/lib/pickup-address-places";

const MIN_INPUT_LENGTH = 3;
const MAX_INPUT_LENGTH = 120;
const MAX_SESSION_TOKEN_LENGTH = 36;

function sanitizeInput(value: string | null): string | null {
  const trimmed = value?.trim() ?? "";
  if (trimmed.length < MIN_INPUT_LENGTH || trimmed.length > MAX_INPUT_LENGTH) {
    return null;
  }
  if (/[<>]/.test(trimmed)) return null;
  return trimmed;
}

function sanitizeSessionToken(value: string | null): string | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed || trimmed.length > MAX_SESSION_TOKEN_LENGTH) return null;
  if (!/^[A-Za-z0-9_-]+$/.test(trimmed)) return null;
  return trimmed;
}

function sanitizePlaceId(value: string | null): string | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed || trimmed.length > 200) return null;
  return trimmed;
}

const PLACES_AUTOCOMPLETE_ENDPOINT =
  "https://places.googleapis.com/v1/places:autocomplete";

/** TEMPORARY — remove after debugging pickup address suggestions. */
function debugSuggestionsLog(payload: Record<string, unknown>) {
  console.info(
    JSON.stringify({
      scope: "[pickup-address-suggestions][debug]",
      ...payload,
    }),
  );
}

export async function GET(request: NextRequest) {
  const rawInput = request.nextUrl.searchParams.get("input");
  const apiKey = process.env.GOOGLE_MAPS_API_KEY?.trim();

  debugSuggestionsLog({
    phase: "route-entry",
    hasApiKey: Boolean(apiKey),
    googleEndpoint: PLACES_AUTOCOMPLETE_ENDPOINT,
    rawInput,
  });

  if (!apiKey) {
    console.error(
      JSON.stringify({
        scope: "[pickup-address-suggestions]",
        outcome: "misconfigured",
        reason: "missing GOOGLE_MAPS_API_KEY",
      }),
    );
    return NextResponse.json(
      { error: "Address suggestions are temporarily unavailable." },
      { status: 503 },
    );
  }

  const sessionToken = sanitizeSessionToken(
    request.nextUrl.searchParams.get("sessionToken"),
  );
  if (!sessionToken) {
    return NextResponse.json(
      { error: "Invalid autocomplete session." },
      { status: 400 },
    );
  }

  const placeId = sanitizePlaceId(request.nextUrl.searchParams.get("placeId"));
  if (placeId) {
    try {
      const formattedAddress = await fetchFormattedAddressForPlace(
        placeId,
        sessionToken,
      );
      if (!formattedAddress) {
        return NextResponse.json(
          { error: "Could not resolve that address." },
          { status: 404 },
        );
      }
      return NextResponse.json({ formattedAddress });
    } catch {
      return NextResponse.json(
        { error: "Could not resolve that address right now." },
        { status: 502 },
      );
    }
  }

  const input = sanitizeInput(rawInput);
  if (!input) {
    debugSuggestionsLog({
      phase: "route-input-rejected",
      rawInput,
      reason: "failed sanitize (too short, too long, or invalid chars)",
    });
    return NextResponse.json({ suggestions: [] });
  }

  debugSuggestionsLog({
    phase: "route-input-accepted",
    input,
  });

  try {
    const suggestions = await fetchAddressSuggestions(
      input,
      sessionToken,
      pickupDeliveryConfig,
    );
    debugSuggestionsLog({
      phase: "route-success",
      input,
      suggestionCount: suggestions.length,
    });
    return NextResponse.json({ suggestions });
  } catch (e) {
    debugSuggestionsLog({
      phase: "route-error",
      input,
      error: e instanceof Error ? e.message : String(e),
    });
    return NextResponse.json(
      { error: "Could not load address suggestions right now." },
      { status: 502 },
    );
  }
}
