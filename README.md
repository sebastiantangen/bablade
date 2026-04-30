# Bablade – Norsk Sommerbrus

A marketing website for **Bablade**, a Norwegian summer soda brand available in six unique flavors. Built with TanStack Start and deployed on Netlify.

## About the Product

Bablade is a 0.5L plastic bottle soda with a color-coded label and matching cap for each flavor:

| Smak | Farge |
|------|-------|
| Grønt eple | Forest green |
| Vannmelon | Deep red |
| Fruktpunch | Burnt orange |
| Jordbær | Hot pink |
| Bringebær | Deep purple |
| Miks (alle smaker) | Blue gradient |

Each flavor page features a Norwegian fjord/nature background scene.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |
| Fonts | Righteous (headings), Nunito (body) via Google Fonts |

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts at [http://localhost:3000](http://localhost:3000). If using Netlify CLI for full platform emulation:

```bash
netlify dev
```

This starts at [http://localhost:8888](http://localhost:8888).

## Building for Production

```bash
npm run build
```

Output is placed in `dist/client/`.

## Order Email

The purchase flow posts to `/api/orders` and sends the owner an email through Resend. Copy `.env.example` to `.env`, fill in the values, and restart the dev server:

```bash
cp .env.example .env
```

```bash
RESEND_API_KEY=...
ORDER_EMAIL_TO=owner@example.com
ORDER_EMAIL_FROM="Bablade <orders@your-verified-domain.no>"
```

Set the same variables in Netlify for production. `ORDER_EMAIL_FROM` should use a verified sender/domain in Resend.

## Routes

- `/` — Home page: hero with Norwegian nature scene + all 6 flavor cards
- `/products/:id` — Product detail: large bottle illustration, description, price
