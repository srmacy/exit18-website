# Pickup & Delivery Estimator — Reference Extraction

This folder is a **read-only snapshot** of the live Exit 18 Pickup & Delivery Estimator. Production code was not modified; files were copied here for Benchline Dashboard planning.

## Where it lives on the site

- **Page:** `/service` (`app/service/page.tsx`)
- **Section:** `ServicePickup` renders marketing copy plus the estimator widget
- **Widget:** `PickupDeliveryEstimator` (customer-facing form, autocomplete, quote display)

## How the current estimator works

1. **Address entry** — Customer types a pickup address. After 3+ characters, the UI debounces (300ms) and calls `GET /api/pickup-address-suggestions?input=…&sessionToken=…`.
2. **Autocomplete** — Server calls Google Places API (New) `places:autocomplete`, biased to the dealer service area (Georgia, VT). Suggestions are filtered to Northwest Vermont (`VT` / `Vermont` / `05xxx` ZIP).
3. **Place selection** — Choosing a suggestion calls `GET /api/pickup-address-suggestions?placeId=…&sessionToken=…` to resolve a canonical `formattedAddress` (Place Details, session closes).
4. **Validation** — On submit, `resolveEstimateAddress()` enforces either a selected suggestion or a manually entered complete address with town/state/ZIP in the service region. Vague or out-of-area addresses are rejected client-side (and again server-side).
5. **Route lookup** — Valid address → `GET /api/pickup-delivery-estimate?address=…`. Server calls Google Routes API `computeRoutes` from `shopAddress` to customer address (DRIVE, traffic-unaware).
6. **Quote** — Client receives `oneWayMinutes` and `oneWayMiles`, then `calculateQuote()` applies trip-type multipliers and pricing rules. Quote updates instantly when trip type changes (no second API call).

## API routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/pickup-address-suggestions` | GET | Autocomplete suggestions (`input` + `sessionToken`) or place resolution (`placeId` + `sessionToken`) |
| `/api/pickup-delivery-estimate` | GET | One-way drive time and distance for a validated customer address |

### `/api/pickup-address-suggestions`

**Autocomplete:** `?input=<query>&sessionToken=<token>`

```json
{ "suggestions": [{ "placeId": "…", "label": "233 Jewett Ave, Swanton, VT 05488, USA" }] }
```

**Place details:** `?placeId=<id>&sessionToken=<token>`

```json
{ "formattedAddress": "233 Jewett Ave, Swanton, VT 05488, USA" }
```

### `/api/pickup-delivery-estimate`

**Request:** `?address=<encoded full address>`

**Success:**

```json
{ "oneWayMinutes": 31.5, "oneWayMiles": 18.2 }
```

**Errors:** 400 (validation), 404 (no route), 502/503 (Google or config failure)

## Google APIs required

All calls are **server-side** using `GOOGLE_MAPS_API_KEY`.

| API | Endpoint | Used for |
|-----|----------|----------|
| **Places API (New)** | `POST https://places.googleapis.com/v1/places:autocomplete` | Address suggestions with location bias |
| **Places API (New)** | `GET https://places.googleapis.com/v1/places/{placeId}` | Formatted address after suggestion select |
| **Routes API** | `POST https://routes.googleapis.com/directions/v2:computeRoutes` | One-way drive duration and distance |

**Field masks / headers:**

- Routes: `X-Goog-FieldMask: routes.duration,routes.distanceMeters`
- Place details: `X-Goog-FieldMask: formattedAddress`
- All: `X-Goog-Api-Key: <server key>`

Enable Places API (New) and Routes API on the Google Cloud project. Restrict the key to server IPs / backend usage — never expose it in client JavaScript.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_MAPS_API_KEY` | **Yes** | Server-only key for Places + Routes |

No other env vars are used by the live estimator. (`website-pickup-quote-widget/preview-server.mjs` uses optional `PORT` for local demo only.)

## Pricing calculation

Configured in `lib/pickup-delivery-config.ts`:

- **Minimum charge:** $75
- **Rate:** $85 per billable travel hour
- **Shop origin:** `27 Morse Drive, Georgia, VT 05454`

Trip multipliers (`lib/pickup-delivery-quote.ts`):

| Trip type | Label | Multiplier | Meaning |
|-----------|-------|------------|---------|
| `pickup-return` | Pickup + return | **4** | Two round trips (shop → customer → shop, twice) |
| `pickup-only` | Pickup only | **2** | One round trip |
| `delivery-only` | Delivery only | **2** | One round trip |

**Formula:**

```
billableHours = (oneWayMinutes × multiplier) / 60
quote = max(minimumCharge, billableHours × ratePerHour)
```

Example: 30 min one-way, pickup + return → `(30 × 4) / 60 = 2` hours → `2 × $85 = $170`.

## File inventory (this folder)

### Customer-facing UI

| File | Role |
|------|------|
| `components/service/PickupDeliveryEstimator.tsx` | Main estimator widget (form, autocomplete UI, quote display) |
| `components/service/ServicePickup.tsx` | Service page section wrapping marketing + estimator |
| `content/siteContent-pickupSection-excerpt.ts` | Copy strings for section heading and estimator labels |
| `public/images/map-route-background.svg` | Background map graphic in estimator card |
| `app/service/page.tsx` *(live only)* | Mounts `ServicePickup` on `/service` |

### Server-side API routes

| File | Role |
|------|------|
| `app/api/pickup-delivery-estimate/route.ts` | Routes API proxy — returns one-way minutes/miles |
| `app/api/pickup-address-suggestions/route.ts` | Places autocomplete + place-details proxy |

### Configuration & pricing logic

| File | Role |
|------|------|
| `lib/pickup-delivery-config.ts` | Dealer config: shop address, pricing, service area, Places bias |
| `lib/pickup-delivery-quote.ts` | Trip types, quote math, address validation |
| `lib/pickup-address-places.ts` | Google Places client helpers + service-area suggestion filter |

### Prototype / earlier widget (not used on live site)

| Path | Role |
|------|------|
| `website-pickup-quote-widget/` | Standalone HTML/JS prototype + Sam integration notes |

### Live dependencies not copied (imported by UI)

- `@/lib/cn` — className utility
- `@/content/siteContent` — full site content module
- Tailwind / Exit 18 design tokens (`exit-green`, `exit-dark`, etc.)

## What to reuse in Benchline

**Reuse (logic & contracts):**

- `PickupDeliveryDealerConfig` shape and per-tenant config loading
- Quote formula, trip multipliers, and formatting helpers (`pickup-delivery-quote.ts`)
- Address validation rules and service-area filtering
- API route contracts (`/api/pickup-delivery-estimate`, `/api/pickup-address-suggestions`)
- Google integration patterns in `pickup-address-places.ts` and the estimate route (session tokens, field masks, server-side key)
- Business rules documented in `website-pickup-quote-widget/sam-integration/README-FOR-SAM.txt`

**Reuse as reference only (not drop-in):**

- `PickupDeliveryEstimator.tsx` — interaction model and state flow, but restyle for Benchline
- `ServicePickup.tsx` — layout pattern for marketing + tool side-by-side

## What to rewrite for Benchline

- **Config source** — Load `shopAddress`, pricing, and `serviceArea` from Benchline tenant/dealer settings (database), not hardcoded `exit18PickupDeliveryConfig`
- **UI** — New Benchline dashboard components, design system, and embed/widget packaging (may be iframe, admin preview, or customer portal — not Exit 18 Tailwind tokens)
- **Multi-tenant routing** — Namespace APIs per dealer or pass `dealerId`; resolve config server-side
- **Content** — Replace `siteContent` strings with Benchline-managed copy
- **Auth & quotas** — Rate limiting, API usage tracking, and billing per tenant
- **Remove debug logging** — Temporary `debugSuggestionsLog` calls in places routes/libs should not ship to Benchline
- **Prototype widget** — `website-pickup-quote-widget/` is superseded by the React implementation; do not port the vanilla JS widget unless embedding outside React

## Production file paths (source of truth)

```
components/service/PickupDeliveryEstimator.tsx
components/service/ServicePickup.tsx
lib/pickup-delivery-config.ts
lib/pickup-delivery-quote.ts
lib/pickup-address-places.ts
app/api/pickup-delivery-estimate/route.ts
app/api/pickup-address-suggestions/route.ts
app/service/page.tsx
content/siteContent.ts          # pickupSection.estimator + section copy
public/images/map-route-background.svg
website-pickup-quote-widget/    # legacy prototype
```
