Exit 18 Pickup and Delivery Estimate Widget

Files:
- index.html shows the section markup.
- styles.css contains the widget styling.
- quote-widget.js contains the front-end behavior and quote math.
- sam-integration/nextjs-app-router-route.ts is an example server route for a Next.js site.

Business rule:
- $75 minimum.
- Otherwise $85 per billable travel hour.
- Pickup only = one round trip = one-way Google drive time x 2.
- Delivery only = one round trip = one-way Google drive time x 2.
- Pickup + return = two round trips = one-way Google drive time x 4.

Recommended Google setup:
- Use Google Routes API server-side.
- Store the API key in a server environment variable named GOOGLE_MAPS_API_KEY.
- Do not put an unrestricted Google API key directly in public page JavaScript.

Front-end endpoint expected by quote-widget.js:
GET /api/pickup-delivery-estimate?address=<encoded customer address>

Expected JSON response:
{
  "oneWayMinutes": 31.5,
  "oneWayMiles": 18.2
}

Preview mode:
quote-widget.js currently defaults to preview mode so Brett can view the design without live Google credentials.
On the live site, set this before loading quote-widget.js:

<script>window.EXIT18_PICKUP_QUOTE_PREVIEW = false;</script>

Then the widget will call /api/pickup-delivery-estimate.

Assets:
The demo uses local copies of:
- assets/exit18-logo-sign-only.png
- assets/storefront.jpg

If integrating into the current Exit 18 site, those images may already exist at:
/images/exit18-logo-sign-only.png
/images/storefront.jpg
