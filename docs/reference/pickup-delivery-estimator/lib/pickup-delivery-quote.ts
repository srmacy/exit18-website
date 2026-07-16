/** Pickup & delivery travel estimate — quote math and address validation. */

import {
  pickupDeliveryConfig,
  type PickupDeliveryDealerConfig,
} from "@/lib/pickup-delivery-config";

export const MIN_ADDRESS_LENGTH = 8;
export const MAX_ADDRESS_LENGTH = 300;

export type TripType = "pickup-return" | "pickup-only" | "delivery-only";

export type TripOption = {
  id: TripType;
  label: string;
  detail: string;
  multiplier: number;
};

export const TRIP_OPTIONS: TripOption[] = [
  {
    id: "pickup-return",
    label: "Pickup + return",
    detail: "Two round trips",
    multiplier: 4,
  },
  {
    id: "pickup-only",
    label: "Pickup only",
    detail: "One round trip",
    multiplier: 2,
  },
  {
    id: "delivery-only",
    label: "Delivery only",
    detail: "One round trip",
    multiplier: 2,
  },
];

export type RouteEstimate = {
  oneWayMinutes: number;
  oneWayMiles: number;
};

const REPEATED_CHAR = /(.)\1{14,}/u;
const HTML_OR_SCRIPT = /<\s*script|<\s*iframe|javascript:|on\w+\s*=|<\/\s*[a-z][\s>]/i;
const URL_TOKEN = /(?:https?:\/\/|www\.)[^\s<>"']+/gi;
const VAGUE_STREET_ONLY =
  /^(?:\d+\s+)?(?:main\s+street|route\s+\d+|rt\.?\s*\d+|state\s+route\s+\d+|sr\s+\d+|[\w.'-]+\s+(?:street|st|road|rd|avenue|ave|drive|dr|lane|ln|way|court|ct|circle|cir|highway|hwy|route))\.?$/i;

function regionTokenPattern(tokens: string[]): RegExp {
  const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp(`\\b(?:${escaped.join("|")})\\b`, "i");
}

function hasServiceAreaMarker(
  address: string,
  config: PickupDeliveryDealerConfig,
): boolean {
  if (config.serviceArea.postalCodePattern?.test(address)) return true;
  return regionTokenPattern(config.serviceArea.regionTokens).test(address);
}

export function vagueAddressMessage(
  config: PickupDeliveryDealerConfig = pickupDeliveryConfig,
): string {
  return `Please enter a complete address with town and state or ZIP (for example: ${config.serviceArea.addressExample}).`;
}

export const ADDRESS_HELPER_TEXT =
  "Start typing your address, then choose the matching suggestion.";

export const ADDRESS_SELECT_OR_COMPLETE_MESSAGE =
  "Please choose a suggested address, or enter a complete address with town and state.";

/** Resolve address for estimate — selected suggestion or manual fallback. */
export function resolveEstimateAddress(
  address: string,
  options: {
    selectedAddress: string | null;
    suggestionsOffered: boolean;
    autocompleteUnavailable: boolean;
  },
  config: PickupDeliveryDealerConfig = pickupDeliveryConfig,
): { ok: true; address: string } | { ok: false; message: string } {
  const trimmed = address.trim();

  if (!trimmed) {
    return { ok: false, message: "Enter your pickup address first." };
  }

  if (
    options.selectedAddress &&
    options.selectedAddress === trimmed
  ) {
    return { ok: true, address: options.selectedAddress };
  }

  if (
    options.suggestionsOffered &&
    !options.autocompleteUnavailable
  ) {
    return { ok: false, message: ADDRESS_SELECT_OR_COMPLETE_MESSAGE };
  }

  return validateEstimateAddress(trimmed, config);
}

/** Address includes locality detail: region token, configured ZIP pattern, or multi-part format. */
export function isSpecificEnoughAddress(
  address: string,
  config: PickupDeliveryDealerConfig = pickupDeliveryConfig,
): boolean {
  const trimmed = address.trim();
  if (!trimmed) return false;

  if (hasServiceAreaMarker(trimmed, config)) return true;

  const parts = trimmed
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 3) return true;

  if (parts.length >= 2) {
    const tail = parts.slice(1).join(" ");
    if (hasServiceAreaMarker(tail, config)) return true;
    if (/\b[A-Z]{2}\b/.test(tail) && /\d{5}/.test(tail)) return true;
  }

  return false;
}

export function isVagueEstimateAddress(
  address: string,
  config: PickupDeliveryDealerConfig = pickupDeliveryConfig,
): boolean {
  const trimmed = address.trim();
  if (!trimmed) return true;
  if (isSpecificEnoughAddress(trimmed, config)) return false;
  if (VAGUE_STREET_ONLY.test(trimmed)) return true;
  if (!trimmed.includes(",") && !hasServiceAreaMarker(trimmed, config)) {
    return true;
  }
  return false;
}

export function getTripMultiplier(tripType: TripType): number {
  return TRIP_OPTIONS.find((t) => t.id === tripType)?.multiplier ?? 2;
}

export function calculateQuote(
  oneWayMinutes: number,
  tripType: TripType,
  config: PickupDeliveryDealerConfig = pickupDeliveryConfig,
): number {
  const multiplier = getTripMultiplier(tripType);
  const billableHours = (oneWayMinutes * multiplier) / 60;
  const calculated = billableHours * config.pricing.ratePerHour;
  return Math.max(config.pricing.minimumCharge, calculated);
}

export function formatQuoteCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDriveTime(minutes: number): string {
  if (minutes < 60) return `${Math.round(minutes)} min one-way`;

  const hours = Math.floor(minutes / 60);
  const remaining = Math.round(minutes % 60);
  return remaining
    ? `${hours} hr ${remaining} min one-way`
    : `${hours} hr one-way`;
}

/** Client/server validation before calling Routes API. */
export function validateEstimateAddress(
  address: string,
  config: PickupDeliveryDealerConfig = pickupDeliveryConfig,
): { ok: true; address: string } | { ok: false; message: string } {
  const trimmed = address.trim();

  if (!trimmed) {
    return { ok: false, message: "Enter your pickup address first." };
  }

  if (trimmed.length < MIN_ADDRESS_LENGTH) {
    return {
      ok: false,
      message: "Please enter a complete street address.",
    };
  }

  if (trimmed.length > MAX_ADDRESS_LENGTH) {
    return {
      ok: false,
      message: "Address is too long. Please shorten it and try again.",
    };
  }

  if (HTML_OR_SCRIPT.test(trimmed)) {
    return { ok: false, message: "Please enter a valid street address." };
  }

  if (REPEATED_CHAR.test(trimmed)) {
    return { ok: false, message: "Please enter a valid street address." };
  }

  const urlMatches = trimmed.match(URL_TOKEN) ?? [];
  if (urlMatches.length >= 2) {
    return { ok: false, message: "Please enter a valid street address." };
  }

  const letterCount = (trimmed.match(/\p{L}/gu) ?? []).length;
  if (letterCount < 3) {
    return {
      ok: false,
      message: "Please enter a complete street address.",
    };
  }

  if (isVagueEstimateAddress(trimmed, config)) {
    return { ok: false, message: vagueAddressMessage(config) };
  }

  if (!hasServiceAreaMarker(trimmed, config) && trimmed.split(",").length < 3) {
    return { ok: false, message: vagueAddressMessage(config) };
  }

  return { ok: true, address: trimmed };
}
