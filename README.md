# Bablade – Norsk Sommerbrus

A marketing website for **Bablade**, a Norwegian summer soda brand available in six unique flavors. Built with TanStack Start and deployed on Netlify.

## About the Product

Bablade is a 0.5L plastic bottle soda with a color-coded label and matching cap for each flavor:

| Flavor | Color |
|--------|-------|
| Green Apple | Forest green |
| Watermelon | Deep red |
| Fruit Punch | Burnt orange |
| Strawberry | Hot pink |
| Raspberry | Deep purple |
| Mix (all flavors) | Blue gradient |

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

## Routes

- `/` — Home page: hero with Norwegian nature scene + all 6 flavor cards
- `/products/:id` — Product detail: large bottle illustration, description, price
