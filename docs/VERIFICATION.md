# Verification record

Validated the standalone reseller/buyer project locally before handoff.

## Automated checks

- `npm ci`: pinned dependency installation succeeded in the final SGI-Referral directory; npm reported no vulnerabilities.
- `npm run build`: TypeScript and production Vite build passed.
- `npm test`: domain/repository tests passed for qualification, commissions, sandbox checkout and registration.

## Browser checks

- Mobile widths of 320 px and 390 px; desktop width of 1280 px.
- No horizontal overflow in checked main/list/detail views. Visible text checks returned a 10 px minimum. Chart empty text is HTML rather than scaled SVG text.
- Referral transaction pagination changes the visible records; status filtering resets pagination.
- Network Level 1/2/3 tabs and member details.
- Referral URL opens Account and prefills its referral code.
- Synthetic KTP/selfie + sandbox OTP progresses through pending verification to a verified profile.
- Premium qualification rejects 10 g and accepts 20 g; Classic accepts a single 10 g purchase.
- QRIS and Virtual Account sandbox payment flows reach pickup receipts.
- Closing an unpaid checkout and reopening it through My Orders resumes that payment.
- Selected stockpoint and referral attribution are retained in the receipt.
- Production build without sandbox enabled shows an explicit unconfigured state, with no sandbox badge or sample transactions.
- No browser errors or warnings were reported during the final app check.

The local development preview runs in an explicitly labelled sandbox. This prototype does not collect live payments or identity documents.
