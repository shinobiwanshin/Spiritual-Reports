# Meta Ads Tracking Architecture (Dual-Layer)

This document outlines the complete implementation of the Meta (Facebook) Tracking system built for the Spiritual Store application. The architecture deploys a highly resilient **Dual-Layer** tracking model: a frontend browser pixel combined with a backend Conversions API (CAPI) implementation strictly designed to bypass iOS 14+ tracking restrictions, AdBlockers, and browser cookie deletions.

---

## 1. Frontend Browser Pixel (`fbq`)

The standard Meta Pixel is heavily augmented to natively support Next.js 13+ App Router's soft-navigation quirks without losing data.

### 1.1 Hydration-Safe `PageView` Listener
- **File**: `frontend/src/app/layout.tsx` & `frontend/src/components/FacebookPixel.tsx`
- **Mechanism**: The Next.js framework performs soft client-side route transitions, which traditionally break standard `<script>` pixel tags.
- **Solution**: 
  - An inline script in `<head>` forcibly fires `fbq('track', 'PageView')` the exact millisecond the DOM renders, ensuring 100% data capture even if the user bounces before React hydrates. It then sets a global semaphore `window.__fbInitialPageViewFired__ = true`.
  - A React Component (`<FacebookPixel />`) continuously listens to the `usePathname()` and `useSearchParams()` hooks. On first hydration, it spots the semaphore flag, skips the duplicate fire, and resets it. On subsequent organic router transitions, it perfectly fires dynamic `PageView` events natively.

### 1.2 `AddToCart` Deduplication
- **File**: `frontend/src/app/ig/[slug]/report-client.tsx`
- **Mechanism**: Fires immediately when the user focuses on any of the core form fields (`First Name`, `DOB`, etc.).
- **Protection**: Employs an aggressive dual-protection deduplication sequence. It reads the browser's `sessionStorage` (keyed rigidly to the `reportSlug`) combined with an in-memory `window.__trackedCartFallback` boolean. 
- **Outcome**: A user can click the input fields 50 times or reload the tab entirely, and Meta will only cleanly record exactly **1 `AddToCart` event per session**. Focus events outside the targeted input/select elements automatically abort to prevent false hits.

### 1.3 AdBlocker-Immune `InitiateCheckout`
- **File**: `frontend/src/app/ig/[slug]/report-client.tsx`
- **Mechanism**: Triggers when the user successfully submits the order form and initiates the Cashfree payment sequence.
- **Protection**: Wrapped in an isolated, non-fatal `try-catch` block. If an aggressive strict-mode AdBlocker explicitly destroys the `fbq` function call, the component silently swallows the `ReferenceError` and natively proceeds to generate the Cashfree order without breaking the UI flow.

---

## 2. Server-Side Conversions API (CAPI)

The backend guarantees that `Purchase` events—the only metric necessary for high-fidelity algorithmic optimization—always reach Facebook exactly matched to real sales data, circumventing all browser-level privacy blocking entirely.

### 2.1 First-Party Data Capture from Request Headers
- **File**: `frontend/src/app/api/cashfree/create-order/route.ts`
- **Mechanism**: When the user requests a Cashfree payment link, the initial API call fundamentally extracts first-party identifiers from Next.js HTTP request headers before the browser redirects:
  - `_fbp` (Meta's organic Browser ID)
  - `_fbc` (Meta's organic Click ID containing the `fbclid`)
  - `x-forwarded-for` / `x-real-ip` (Client's exact IP)
  - `user-agent` (Client's exact hardware/browser spec)
- **Data Persistence**: These highly-sensitive tracking keys are appended into the JSONB `formData` blob inside the `orders` PostgreSQL table. Best practices dictate that sensitive identifiers (email, phone, tracking keys) should be encrypted or tokenized at rest, access must be role-restricted and audited, and data retention must follow strict TTL enforcement policies.

### 2.2 Secure Webhook Dispatch
- **File**: `frontend/src/app/api/cashfree/webhook/route.ts`
- **Mechanism**: The absolute millisecond Cashfree natively POSTs a `payment_status: "SUCCESS"` payload to the backend webhook, the asynchronous CAPI engine kicks in automatically.
- **Architecture**: 
  - Strictly relies on `NEXT_PUBLIC_META_PIXEL_ID` and `META_CAPI_TOKEN` (System User Token from `.env.local`).
  - Implements NodeJS native `crypto.createHash('sha256')` formatting natively as strictly mandated by the Meta API.
- **Transmitted Data**:
  - `em`: Hashed Email
  - `ph`: Hashed Phone Number (stripped and normalized)
  - `fn`: Hashed First Name
  - `external_id`: Hashed Email (explicitly mirrored to boost Event Match Score per Meta's algorithm request)
  - `fbp`, `fbc`, `client_ip_address`, `client_user_agent`
  - `value`, `currency` natively ripped straight from the database.

### 2.3 `Purchase` Event Merge Deduplication (Event Match Quality)
- **File**: `frontend/src/app/payment/status/page.tsx` & `/api/cashfree/webhook/route.ts`
- **Mechanism (The Bridge)**: The Server API fires the CAPI payload with `event_id: dbOrder.orderId`. Simultaneously, the User's post-payment redirect page natively fires a browser pixel containing `{ eventID: data.orderId }`. 
- **Resolution**: Facebook receives both the frontend event (containing dynamic local device info) and the backend event (containing the strictly hashed email/phone parameters). Because the `event_id` physically matches character-for-character, Facebook deduplicates the two metrics and merges the dataset together. This dual-layer approach may improve Event Match Quality (EMQ) depending on Meta's matching algorithm. Refer to [Meta's Conversions API Documentation](https://developers.facebook.com/docs/marketing-api/conversions-api) for supported Graph API versions and expected EMQ guidance.
