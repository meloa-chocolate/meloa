# Meloa — Handmade Chocolate MVP

One-page premium gift chocolate landing page built with Next.js App Router, TypeScript, React and Tailwind CSS.

## 1. Run locally

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`.

Production build:

```bash
pnpm build
pnpm start
```

## 2. Telegram bot setup

1. Open Telegram and talk to `@BotFather`.
2. Run `/newbot` and follow the prompts.
3. Copy the token into `.env.local` as `TELEGRAM_BOT_TOKEN`.
4. Send any message to your new bot from the Telegram account or group that should receive orders.
5. To determine the chat ID, open:
   `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
   and find `message.chat.id`.
6. Put that number into `TELEGRAM_CHAT_ID`.
7. Restart the development server.

The token is read only inside `src/app/api/order/route.ts`; it is never sent to the browser.

## 3. Product editing

Edit `src/data/products.ts`.

Each product has:

- `id`
- `name`
- `subtitle`
- `description`
- `ingredients`
- `price`
- `weight`
- `image`
- `imageAlt`
- `badge`
- `available`
- `foodInfo`

Set `available: false` to remove a product from the order form and show a “Скоро” state on its card.

## 4. Brand editing

Edit `src/lib/brand.ts`. The temporary brand name is `Meloa`.

## 5. Replace photos

Place final image files in `public/images/` and keep the filenames, or update the `image` property in `src/data/products.ts`.

Current real uploaded photography is used for:

- `hero.jpg`
- `raspberry-pistachio.jpg`
- `gift-box.jpg`
- `process-1.jpg`
- `process-2.jpg`
- `process-3.jpg`

The other flavor images are clearly marked SVG placeholders:

- `dark-orange.svg`
- `hazelnut-crunch.svg`
- `strawberry-matcha.svg`
- `salted-caramel.svg`

Recommended final product photography: portrait 4:5, at least 1400 px wide, neutral warm background, consistent light.

## 6. Legal / food information

Legal food information is deliberately not invented. Replace the `TODO` values in each product’s `foodInfo` only with verified data:

- allergens
- storage
- best before
- nutrition
- manufacturer

Also replace the placeholder Privacy / Terms / Allergens footer anchors with real pages before public launch.

## 7. SEO before launch

The canonical URL, OpenGraph, product schema and sitemap use `SITE_URL` when set, otherwise Vercel's `VERCEL_PROJECT_PRODUCTION_URL`. Local development falls back to `http://localhost:3000`. For a custom domain, set server-side `SITE_URL` and rebuild.

## 8. Deployment

Import `meloa-chocolate/meloa` into a separate Vercel project. Framework: Next.js. Root directory: repository root. Node.js: 24.x. Install: `pnpm install --frozen-lockfile`. Build: `pnpm build`. Output directory: Next.js default. Production branch: `main`.

Do not use static export or GitHub Pages: `/api/order` requires the Next.js server runtime.

The site can be deployed without Telegram credentials. `POST /api/order` returns HTTP 503 until **both** `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are configured. Store them only in Vercel's server-side environment settings, never with a `NEXT_PUBLIC_` prefix, and never in Git. Add production values and redeploy to activate them. Use separate test credentials for preview deployments if needed.

## 9. Verification and remaining content

`pnpm test` checks missing credentials, server-authoritative totals, HTML escaping, invalid or duplicate items, consent, malformed JSON, and safe error logging. Telegram calls are mocked in these tests; they do not send messages.

Successful deployment is not evidence of live Telegram delivery. After adding credentials, submit one clearly marked test order and confirm receipt in the intended chat.

The supplied catalog still contains provisional prices/weights and four placeholder images. `BRAND` still contains placeholder contacts/social links; footer legal anchors need real pages. Confirm these and the food information before using the site for live sales. No legal or product claims have been invented during deployment preparation.

