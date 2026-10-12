# Deploy the reseller and buyer application

Vercel hosts the static React/Vite app. This prototype uses an in-memory sandbox for accounts, catalogue, KYC, checkout and commissions. It does not host authentication, Postgres, identity storage or payment webhooks.

This is the first independent application. Select **SGI-Referral** as the Vercel project root when your Git repository contains that directory. If this directory is the repository root, select `.`. The stockpoint and admin applications will use separate roots and deployments.

## 1. Configure Vercel

Import the Git repository in Vercel and use these project settings:

| Setting | Value |
| --- | --- |
| Root Directory | `SGI-Referral` within a parent repository, otherwise `.` |
| Framework Preset | Vite |
| Node.js | A supported Node 22 release at least 22.12, or a compatible newer supported version |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

`vercel.json` already supplies the build command, output directory, SPA fallback and response headers. The fallback permits directly opening a referral URL. Vercel supports Vite deployments and project environment variables; see [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite).

Set this frontend environment variable for the intended Vercel environment:

| Variable | Production value | Demo preview |
| --- | --- | --- |
| `VITE_ENABLE_SANDBOX` | `false` | `true` |

These are compiled into the browser build. Redeploy after changing them. Keep preview and production environment values separate.

### Mode selection

1. Use the sandbox when `VITE_ENABLE_SANDBOX=true`, or in the Vite development server when the variable is not explicitly `false`.
2. Otherwise use the unconfigured state. A production build never silently falls back to sandbox unless sandbox was explicitly enabled.

For a clearly labelled demo deployment, set `VITE_ENABLE_SANDBOX=true` in the **Preview** environment. Sandbox data is memory-only, resets on reload, uses synthetic identity documents and never makes a real payment.

## 2. Validate the deployed app

Run the local checks before building:

```sh
npm ci
npm run typecheck
npm test
npm run build
```

Then verify:

- Direct referral links preserve the intended attribution through the sandbox OTP and KYC journey.
- QRIS and virtual-account sandbox payment flows reach pickup receipts.
- Buyers see their own pickup QR; upstream partners do not receive another buyer's pickup secret.
- Page refreshes on referral links work, and the three approved navigation sections remain usable on a small mobile screen.
- Missing sandbox configuration shows a clear unconfigured state, with no sandbox badge or sample transactions appearing as live data.

The original stockpoint, finance, payout and inventory workflows will connect through the other standalone applications. This deployment does not add those screens or run scheduled bank payouts.
