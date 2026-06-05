/** Server-side Google Places API (New) — autocomplete for pickup addresses. */

import {
  pickupDeliveryConfig,
  type PickupDeliveryDealerConfig,
} from "@/lib/pickup-delivery-config";

export type AddressSuggestion = {
  placeId: string;
  label: string;
};

type PlacesAutocompleteResponse = {
  suggestions?: Array<{
    placePrediction?: {
      placeId?: string;
      text?: { text?: string };
    };
  }>;
};

type PlaceDetailsResponse = {
  formattedAddress?: string;
};

function getApiKey(): string | null {
  return process.env.GOOGLE_MAPS_API_KEY?.trim() || null;
}

function regionTokenPattern(tokens: string[]): RegExp {
  const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp(`\\b(?:${escaped.join("|")})\\b`, "i");
}

/** Filter suggestions to the dealer-configured service region. */
export function isAllowedSuggestionLabel(
  label: string,
  config: PickupDeliveryDealerConfig = pickupDeliveryConfig,
): boolean {
  if (config.serviceArea.postalCodePattern?.test(label)) return true;
  return regionTokenPattern(config.serviceArea.regionTokens).test(label);
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

export async function fetchAddressSuggestions(
  input: string,
  sessionToken: string,
  config: PickupDeliveryDealerConfig = pickupDeliveryConfig,
): Promise<AddressSuggestion[]> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("missing-api-key");
  }

  const { locationBias, includedRegionCodes = ["us"] } = config.serviceArea;

  debugSuggestionsLog({
    phase: "google-autocomplete-request",
    endpoint: PLACES_AUTOCOMPLETE_ENDPOINT,
    hasApiKey: true,
    input,
  });

  const response = await fetch(PLACES_AUTOCOMPLETE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
    },
    body: JSON.stringify({
      input,
      sessionToken,
      includedRegionCodes,
      locationBias: {
        circle: {
          center: {
            latitude: locationBias.latitude,
            longitude: locationBias.longitude,
          },
          radius: locationBias.radiusMeters,
        },
      },
    }),
  });

  const responseText = await response.text();

  debugSuggestionsLog({
    phase: "google-autocomplete-response",
    endpoint: PLACES_AUTOCOMPLETE_ENDPOINT,
    googleHttpStatus: response.status,
    googleOk: response.ok,
    ...(response.ok
      ? { googleBodyPreview: responseText.slice(0, 500) }
      : { googleErrorBody: responseText }),
  });

  if (!response.ok) {
    throw new Error("places-autocomplete-failed");
  }

  let data: PlacesAutocompleteResponse;
  try {
    data = JSON.parse(responseText) as PlacesAutocompleteResponse;
  } catch {
    debugSuggestionsLog({
      phase: "google-autocomplete-parse-error",
      googleBodyPreview: responseText.slice(0, 500),
    });
    throw new Error("places-autocomplete-failed");
  }

  const suggestions: AddressSuggestion[] = [];
  const rawCount = data.suggestions?.length ?? 0;
  let filteredOutCount = 0;

  for (const item of data.suggestions ?? []) {
    const prediction = item.placePrediction;
    const placeId = prediction?.placeId?.trim();
    const label = prediction?.text?.text?.trim();
    if (!placeId || !label) continue;
    if (!isAllowedSuggestionLabel(label, config)) {
      filteredOutCount += 1;
      continue;
    }
    suggestions.push({ placeId, label });
  }

  debugSuggestionsLog({
    phase: "google-autocomplete-filtered",
    rawSuggestionCount: rawCount,
    filteredOutCount,
    returnedCount: suggestions.length,
  });

  return suggestions.slice(0, 6);
}

/** Closes an autocomplete session and returns the canonical formatted address. */
export async function fetchFormattedAddressForPlace(
  placeId: string,
  sessionToken: string,
): Promise<string | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("missing-api-key");
  }

  const resourceName = placeId.startsWith("places/")
    ? placeId
    : `places/${placeId}`;

  const response = await fetch(
    `https://places.googleapis.com/v1/${resourceName}?sessionToken=${encodeURIComponent(sessionToken)}`,
    {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "formattedAddress",
      },
    },
  );

  if (!response.ok) {
    throw new Error("place-details-failed");
  }

  const data = (await response.json()) as PlaceDetailsResponse;
  return data.formattedAddress?.trim() || null;
}
