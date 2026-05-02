# Bablade

Bablade is a Norwegian summer soda storefront built with TanStack Start. The site presents six 0.5L soda flavors, lets customers add bottles to a cart, and sends order requests by email so payment can be handled manually with Vipps.

The product pages and homepage use inline SVG bottle illustrations and a Norwegian fjord/nature scene. Product colors come from `src/data/products.ts`, so the same catalog data drives cards, detail pages, cart lines, checkout totals, and order emails.

## What It Does

- Shows a branded homepage with all six Bablade flavors
- Provides individual product pages with flavor descriptions and pricing
- Adds products to a persistent browser cart
- Lets customers adjust quantities before ordering
- Collects name, email, and Norwegian phone number at checkout
- Sends the order to the owner through Resend
- Attempts to send the customer an order confirmation email
- States that Bablade will contact the customer and send a Vipps payment request

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | TanStack Start |
| UI | React 19, TanStack Router |
| Styling | Tailwind CSS 4 |
| Build | Vite |
| Runtime / hosting | Cloudflare Workers |
| Deployment | Wrangler |
| Email | Resend API |
| Validation | Zod |
| Language | TypeScript |

## Routes

- `/` - homepage with hero, flavor grid, about section, and footer
- `/products/$productId` - product detail page
- `/checkout` - cart checkout and customer contact form
- `/api/orders` - server route that validates and sends order emails

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Order submission requires Resend credentials. Copy `.env.example` to `.env` for local development:

```bash
cp .env.example .env
```

Required values:

```bash
RESEND_API_KEY=re_...
ORDER_EMAIL_TO=owner@example.com
ORDER_EMAIL_FROM="Bablade <orders@your-verified-domain.no>"
```

`ORDER_EMAIL_FROM` should use a sender or domain verified in Resend.

For Cloudflare production, set the same values as Wrangler secrets or environment variables:

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put ORDER_EMAIL_TO
wrangler secret put ORDER_EMAIL_FROM
```

## Orders

Checkout posts to `/api/orders`. The server:

1. Validates customer details and cart items.
2. Normalizes Norwegian phone numbers.
3. Recalculates product prices from `src/data/products.ts`.
4. Sends the owner a full order email through Resend.
5. Tries to send the customer a confirmation email.

If the owner email cannot be sent, the endpoint returns `503` so the customer knows the order was not received. If the customer confirmation email fails, the order still succeeds as long as the owner email was sent.

## Build And Deploy

Build the production app:

```bash
npm run build
```

Preview the Cloudflare build locally:

```bash
npm run preview
```

Deploy to Cloudflare:

```bash
npm run deploy
```

The Cloudflare Worker entrypoint is configured in `wrangler.jsonc`.
