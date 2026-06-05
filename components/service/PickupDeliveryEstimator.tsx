"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { pickupDeliveryConfig } from "@/lib/pickup-delivery-config";
import { siteContent } from "@/content/siteContent";
import {
  ADDRESS_HELPER_TEXT,
  calculateQuote,
  formatDriveTime,
  formatQuoteCurrency,
  resolveEstimateAddress,
  TRIP_OPTIONS,
  type RouteEstimate,
  type TripType,
} from "@/lib/pickup-delivery-quote";
import { cn } from "@/lib/cn";

const DISCLAIMER =
  "Estimate is for transportation only. Actual service and repair charges are not included.";

const DEBOUNCE_MS = 300;
const MIN_SUGGESTION_INPUT = 3;

type AddressSuggestion = {
  placeId: string;
  label: string;
};

const inputClass =
  "mt-1.5 w-full min-h-[46px] rounded-lg border border-exit-dark/[0.12] bg-white px-4 py-2.5 text-[15px] text-exit-dark shadow-sm outline-none transition placeholder:text-exit-gray/50 focus:border-exit-green focus:ring-2 focus:ring-exit-green/25";

const labelClass =
  "block text-[12px] font-bold uppercase tracking-[0.12em] text-exit-dark/70";

function newSessionToken(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 32);
}

export function PickupDeliveryEstimator() {
  const { estimator } = siteContent.servicePage.pickupSection;
  const listboxId = useId();

  const [address, setAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestionsOffered, setSuggestionsOffered] = useState(false);
  const [autocompleteUnavailable, setAutocompleteUnavailable] = useState(false);
  const [tripType, setTripType] = useState<TripType>("pickup-return");
  const [route, setRoute] = useState<RouteEstimate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sessionTokenRef = useRef(newSessionToken());
  const blurTimeoutRef = useRef<number | null>(null);

  const quote = useMemo(() => {
    if (!route) return null;
    return calculateQuote(route.oneWayMinutes, tripType, pickupDeliveryConfig);
  }, [route, tripType]);

  const selectTrip = useCallback((next: TripType) => {
    setTripType(next);
  }, []);

  const resetSession = useCallback(() => {
    sessionTokenRef.current = newSessionToken();
  }, []);

  useEffect(() => {
    const query = address.trim();

    if (selectedAddress && query === selectedAddress) {
      setSuggestions([]);
      setSuggestionsOpen(false);
      setSuggestionsOffered(false);
      return;
    }

    if (query.length < MIN_SUGGESTION_INPUT || autocompleteUnavailable) {
      setSuggestions([]);
      setSuggestionsOpen(false);
      setSuggestionsOffered(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void (async () => {
        setSuggestionsLoading(true);
        try {
          const res = await fetch(
            `/api/pickup-address-suggestions?input=${encodeURIComponent(query)}&sessionToken=${encodeURIComponent(sessionTokenRef.current)}`,
          );
          const json = (await res.json()) as {
            suggestions?: AddressSuggestion[];
            error?: string;
          };

          if (res.status === 503 || res.status === 502) {
            setAutocompleteUnavailable(true);
            setSuggestions([]);
            setSuggestionsOpen(false);
            setSuggestionsOffered(false);
            return;
          }

          if (!res.ok) {
            setSuggestions([]);
            setSuggestionsOpen(false);
            setSuggestionsOffered(false);
            return;
          }

          const nextSuggestions = json.suggestions ?? [];
          setSuggestions(nextSuggestions);
          setSuggestionsOpen(nextSuggestions.length > 0);
          setSuggestionsOffered(nextSuggestions.length > 0);
        } catch {
          setAutocompleteUnavailable(true);
          setSuggestions([]);
          setSuggestionsOpen(false);
          setSuggestionsOffered(false);
        } finally {
          setSuggestionsLoading(false);
        }
      })();
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [address, selectedAddress, autocompleteUnavailable]);

  const handleAddressChange = (value: string) => {
    setAddress(value);
    setSelectedAddress(null);
    setRoute(null);
    setError("");
    setSuggestionsOffered(false);
  };

  const handleSelectSuggestion = async (suggestion: AddressSuggestion) => {
    setSuggestionsLoading(true);
    setSuggestionsOpen(false);
    setError("");

    try {
      const res = await fetch(
        `/api/pickup-address-suggestions?placeId=${encodeURIComponent(suggestion.placeId)}&sessionToken=${encodeURIComponent(sessionTokenRef.current)}`,
      );
      const json = (await res.json()) as {
        formattedAddress?: string;
        error?: string;
      };

      const formatted =
        json.formattedAddress?.trim() || suggestion.label.trim();

      if (!res.ok || !formatted) {
        setError("Could not use that address. Please try another suggestion.");
        return;
      }

      setAddress(formatted);
      setSelectedAddress(formatted);
      setSuggestions([]);
      setSuggestionsOffered(false);
      resetSession();
    } catch {
      setError("Could not use that address. Please try another suggestion.");
    } finally {
      setSuggestionsLoading(false);
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const resolved = resolveEstimateAddress(
      address,
      {
        selectedAddress,
        suggestionsOffered,
        autocompleteUnavailable,
      },
      pickupDeliveryConfig,
    );

    if (!resolved.ok) {
      setError(resolved.message);
      setRoute(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/pickup-delivery-estimate?address=${encodeURIComponent(resolved.address)}`,
      );

      let json: {
        oneWayMinutes?: number;
        oneWayMiles?: number;
        error?: string;
      };

      try {
        json = (await res.json()) as typeof json;
      } catch {
        throw new Error(
          "We could not get a route estimate right now. Please call the shop for help.",
        );
      }

      if (
        !res.ok ||
        typeof json.oneWayMinutes !== "number" ||
        typeof json.oneWayMiles !== "number"
      ) {
        throw new Error(
          json.error ??
            "We could not get a route estimate right now. Please call the shop for help.",
        );
      }

      setRoute({
        oneWayMinutes: json.oneWayMinutes,
        oneWayMiles: json.oneWayMiles,
      });
    } catch (err) {
      setRoute(null);
      setError(
        err instanceof Error
          ? err.message
          : "We could not get a route estimate right now. Please call the shop for help.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative isolate rounded-2xl border border-exit-green/20 bg-exit-dark shadow-[0_24px_80px_rgba(14,26,15,0.18)]"
      aria-labelledby="pickup-estimator-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(11,46,31,0.97)_0%,rgba(11,46,31,0.78)_48%,rgba(11,46,31,0.22)_82%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/images/map-route-background.svg')] bg-cover bg-center opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-exit-dark/90 to-transparent"
        aria-hidden
      />

      <div className="relative p-6 md:p-8">
        <p className="mb-3 inline-flex rounded border border-exit-lime/35 bg-exit-lime/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-exit-lime">
          Travel estimate
        </p>
        <h3
          id="pickup-estimator-title"
          className="font-display text-[clamp(1.35rem,2.8vw,1.75rem)] font-black uppercase leading-[0.98] tracking-tight text-white"
        >
          {estimator.title}
        </h3>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/75">
          {estimator.intro}
        </p>

        <div
          className="mt-5 flex flex-wrap gap-2"
          aria-label="Pricing rule"
        >
          {estimator.rateStrip.map((item) => (
            <span
              key={item}
              className="inline-flex min-h-9 items-center rounded-full border border-white/15 bg-exit-dark/55 px-3 py-1.5 text-[12px] font-bold text-white/75"
            >
              {item}
            </span>
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-6 rounded-2xl border border-white/30 bg-exit-off-white/95 p-5 shadow-[0_18px_56px_rgba(0,0,0,0.18)] backdrop-blur-sm md:p-6"
        >
          <div>
            <label className={labelClass} htmlFor="pickup-estimator-address">
              Your pickup address
            </label>
            <div className="mt-0 grid gap-2.5 sm:grid-cols-[1fr_auto] sm:items-start">
              <div className="relative min-w-0">
                <input
                  id="pickup-estimator-address"
                  name="address"
                  type="text"
                  autoComplete="off"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={suggestionsOpen}
                  aria-controls={listboxId}
                  placeholder="Street address, town, state"
                  required
                  value={address}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  onFocus={() => {
                    if (suggestions.length > 0) setSuggestionsOpen(true);
                  }}
                  onBlur={() => {
                    blurTimeoutRef.current = window.setTimeout(() => {
                      setSuggestionsOpen(false);
                    }, 150);
                  }}
                  className={inputClass}
                />
                {suggestionsOpen && suggestions.length > 0 ? (
                  <ul
                    id={listboxId}
                    role="listbox"
                    className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-exit-dark/10 bg-white py-1 shadow-[0_16px_40px_rgba(14,26,15,0.16)]"
                  >
                    {suggestions.map((suggestion) => (
                      <li key={suggestion.placeId} role="option">
                        <button
                          type="button"
                          className="w-full px-3 py-2.5 text-left text-[14px] leading-snug text-exit-dark transition hover:bg-exit-lime/15"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            if (blurTimeoutRef.current) {
                              window.clearTimeout(blurTimeoutRef.current);
                            }
                            void handleSelectSuggestion(suggestion);
                          }}
                        >
                          {suggestion.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-1.5 text-[12px] leading-relaxed text-exit-gray">
                  {ADDRESS_HELPER_TEXT}
                  {suggestionsLoading ? " Searching…" : null}
                </p>
                {autocompleteUnavailable ? (
                  <p className="mt-1 text-[12px] leading-relaxed text-exit-dark/60">
                    Suggestions unavailable — enter a complete address with town
                    and state.
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-lg border-2 border-exit-green bg-exit-green px-5 text-xs font-bold uppercase tracking-wide text-white transition hover:border-exit-green-mid hover:bg-exit-green-mid disabled:opacity-60 sm:mt-1.5"
              >
                {loading ? "Checking…" : "Get estimate"}
              </button>
            </div>
          </div>

          <fieldset className="mt-5 min-w-0 border-0 p-0">
            <legend className={`${labelClass} mb-2`}>What do you need?</legend>
            <div
              className="grid gap-2.5 sm:grid-cols-3"
              role="radiogroup"
              aria-label="Trip type"
            >
              {TRIP_OPTIONS.map((trip) => {
                const selected = tripType === trip.id;
                return (
                  <button
                    key={trip.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => selectTrip(trip.id)}
                    className={cn(
                      "min-h-[5.25rem] rounded-lg border px-3 py-3 text-left transition",
                      selected
                        ? "border-exit-green bg-exit-lime/15 shadow-[inset_0_0_0_2px_rgba(26,92,42,0.18)]"
                        : "border-exit-dark/12 bg-white hover:border-exit-green/35",
                    )}
                  >
                    {selected ? (
                      <span className="mb-2 inline-flex rounded-full bg-exit-green px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white">
                        Selected
                      </span>
                    ) : null}
                    <span className="block text-[14px] font-extrabold text-exit-dark">
                      {trip.label}
                    </span>
                    <span className="mt-1 block text-[12px] font-semibold text-exit-gray">
                      {trip.detail}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div
            className="mt-5 rounded-xl bg-exit-dark p-5 text-white"
            aria-live="polite"
          >
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/55">
                Estimated quote
              </span>
              <strong className="font-display mt-1 block text-[clamp(2.25rem,6vw,3.25rem)] font-black leading-none text-exit-lime">
                {quote != null ? formatQuoteCurrency(quote) : "$--"}
              </strong>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[12px] font-bold text-white/85">
                Drive time:{" "}
                {route ? formatDriveTime(route.oneWayMinutes) : "--"}
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[12px] font-bold text-white/85">
                Distance:{" "}
                {route ? `${route.oneWayMiles.toFixed(1)} mi one-way` : "--"}
              </span>
            </div>
          </div>

          <p
            className={cn(
              "mt-4 text-[13px] leading-relaxed",
              error ? "font-semibold text-red-700" : "text-exit-gray",
            )}
          >
            {error ||
              (loading
                ? "Checking Google drive time from Exit 18 Equipment…"
                : DISCLAIMER)}
          </p>
        </form>
      </div>
    </div>
  );
}
