/**
 * Dealer-scoped pickup/delivery estimator settings.
 * Benchline could load this per tenant; Exit 18 uses the default export below.
 */

export type PickupDeliveryPricingConfig = {
  minimumCharge: number;
  ratePerHour: number;
};

export type PickupDeliveryLocationBias = {
  latitude: number;
  longitude: number;
  /** Search bias radius in meters. */
  radiusMeters: number;
};

export type PickupDeliveryServiceAreaConfig = {
  /** Shown in copy/errors, e.g. "Northwest Vermont". */
  label: string;
  /** Accepted region tokens — state abbreviations or names (case-insensitive). */
  regionTokens: string[];
  /** Optional postal/ZIP pattern for the service region. */
  postalCodePattern?: RegExp;
  /** Example full address for validation helper/error text. */
  addressExample: string;
  /** Bias Places Autocomplete suggestions toward the dealer service area. */
  locationBias: PickupDeliveryLocationBias;
  /** ISO 3166-1 alpha-2 codes passed to Places API (default US). */
  includedRegionCodes?: string[];
};

export type PickupDeliveryDealerConfig = {
  shopAddress: string;
  pricing: PickupDeliveryPricingConfig;
  serviceArea: PickupDeliveryServiceAreaConfig;
};

/** Exit 18 Equipment — current website defaults. */
export const exit18PickupDeliveryConfig: PickupDeliveryDealerConfig = {
  shopAddress: "27 Morse Drive, Georgia, VT 05454",
  pricing: {
    minimumCharge: 75,
    ratePerHour: 85,
  },
  serviceArea: {
    label: "Northwest Vermont",
    regionTokens: ["VT", "Vermont"],
    postalCodePattern: /\b05\d{3}(?:-\d{4})?\b/,
    addressExample: "233 Jewett Ave, Swanton, VT 05488",
    locationBias: {
      /** Georgia, VT — shop area */
      latitude: 44.715,
      longitude: -73.108,
      radiusMeters: 50_000,
    },
    includedRegionCodes: ["us"],
  },
};

/** Active config for this deployment (swap for Benchline tenant config later). */
export const pickupDeliveryConfig = exit18PickupDeliveryConfig;
