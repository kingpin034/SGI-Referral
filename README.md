# Sampoerna Gold — Reseller & Buyer

The first standalone Sampoerna Gold MVP application, built by Newtn Technology: a mobile-first web app for resellers and buyers, with its own Vercel deployment. The stockpoint and administration applications will be separate projects; there is no role switch in this app.

This prototype uses an in-memory sandbox repository. It does not connect to a live backend, payment gateway, or identity provider.

## Application structure

The interface follows the supplied information architecture:

- **Referral:** tier, share referral, campaign banner, performance/date filters, referral totals, payout date and referral link configuration. Supporting views: referral transactions and the three-level partner network.
- **Gold Catalog:** sale/buyback prices, 0.5 / 1 / 5 / 10 gram products, partner CTA and My Orders. Checkout uses the specified two-step modal, followed by order details and the pickup QR.
- **Account / referral landing:** e-KTP, full name, WhatsApp OTP, referral code, selfie and identity consent; pending verification; verified profile with locked documents and sign-out.

The visual system uses red `#B72731`, gold `#C3A753`, black `#1C1C1C` and white `#FFFFFF`, with a minimum text size of 10px. Text is in Indonesian.

## Run locally

Use Node.js 22.12 or newer and npm. From this directory:

```sh
npm ci
cp .env.example .env.local
```

For the local sandbox, change `.env.local` to include:

```dotenv
VITE_ENABLE_SANDBOX=true
```

Development (`npm run dev`) enables the sandbox unless `VITE_ENABLE_SANDBOX` is explicitly `false`. Then run:

```sh
npm run dev
```

Open the local URL printed by Vite. The sandbox is clearly labelled. It starts with the synthetic Premium account **Andi Pratama**. Open `/?ref=SG-ANDI28` for the referral registration journey. Use the **Gunakan contoh** buttons to generate synthetic identity images, request an OTP, and enter `123456`. New sample verification completes automatically after about four seconds. QRIS, virtual accounts, payment confirmation, prices and inventory are simulated in this mode.

Sandbox changes exist only in memory and reset when the page reloads. The sandbox does not upload or persist identity images, filenames or submitted personal data. Use made-up names and numbers. To re-enter the seeded account after signing out, use `081234567890`, request an OTP and enter `123456`.

A production build without `VITE_ENABLE_SANDBOX=true` shows an unconfigured state rather than silently simulating a live account or payment.

See [Deployment](docs/DEPLOYMENT.md) for Vercel setup and [Sandbox behavior](docs/BACKEND.md) for how the in-memory repository works.

## Validate and build

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

The build output is `dist/`. Commit `package-lock.json` and use `npm ci` for reproducible installs.

## Repository layout

```text
src/components/       Approved pages, list views and modals
src/lib/              Types, formatting, business rules and sandbox repository
public/assets/        Brand/product assets and source attribution
tests/                Business-rule and sandbox verification
docs/                 Deployment and sandbox guidance
vercel.json           Vite build, SPA rewrites and response headers
```

The finance payout runner, buyback operations, stockpoint release console and administrative interface belong to the remaining applications and are not exposed as extra pages here.
