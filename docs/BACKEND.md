# Sandbox repository

This app uses an in-memory sandbox repository (`src/lib/sandbox.ts`) for the customer/reseller interface. There is no hosted database, Auth service, identity storage or Edge Function in this repository.

Enable it with `VITE_ENABLE_SANDBOX=true`, or by running the Vite development server unless the variable is explicitly `false`. Production builds without that flag use the unconfigured repository and show a connection state instead of sample transactions.

## Behavior

- Catalogue prices, stockpoints, OTP (`123456`), KYC auto-approval, QRIS/VA details, payment confirmation, serial allocation and commissions are simulated in the browser.
- Sandbox state exists only in memory and resets on reload. Identity images are not uploaded or persisted.
- Checkout qualification, commission rates and payout dates follow the same domain rules in `src/lib/domain.ts` as the UI.
- A browser payment-confirmation click settles the simulated order. It does not contact a payment gateway.

Provider credentials, live prices, stockpoints and serialized inventory are not supplied. Connecting a real backend, WhatsApp OTP, KYC vendor or payment bridge is out of scope for this prototype.

Frontend/domain checks run with `npm test`.
