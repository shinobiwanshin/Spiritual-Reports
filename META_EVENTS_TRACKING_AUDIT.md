# Meta Ads Manager Events Tracking Audit

**Generated:** 2026-04-30  
**Status:** ⚠️ PARTIALLY WORKING (Critical issues found)

---

## Executive Summary

Your Meta Ads Manager/CAPI events are **partially working** but have critical issues preventing reliable payment tracking:

| Event                | Client-Side | Server-Side | Issue                                          |
| -------------------- | ----------- | ----------- | ---------------------------------------------- |
| **PageView**         | ✅ Working  | -           | OK                                             |
| **AddToCart**        | ✅ Working  | -           | OK (with dedup)                                |
| **InitiateCheckout** | ✅ Working  | -           | OK                                             |
| **Purchase**         | ✅ Firing   | ✅ Firing   | 🔴 **CRITICAL: Duplicate events, ID mismatch** |
| **ViewContent**      | ❌ Missing  | -           | ⚠️ No service detail tracking                  |

---

## 🔴 CRITICAL ISSUES

### Issue #1: Meta Pixel ID Mismatch (Prevents Payment Tracking)

**Problem:**

- [layout.tsx](layout.tsx) hardcodes Pixel ID: `"1413955200415939"`
- [webhook/route.ts](webhook/route.ts#L127) tries to read from `process.env.NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_` vars are **client-side only** and don't exist in Node.js context
- Result: **Webhook silently fails to send CAPI Purchase events**

**Current Code (Broken):**

```typescript
// webhook/route.ts, line 127
const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1413955200415939";
```

**Why It's Broken:**

- `NEXT_PUBLIC_META_PIXEL_ID` is not set (env.example no longer has it)
- Falls back to hardcoded `"1413955200415939"` ✅ BUT:
- The hardcoded value is only available in browser, not in Node.js runtime
- Even if it were accessible, using `process.env` to read it is unreliable

**Fix Required:** Hardcode the Pixel ID directly in webhook too.

---

### Issue #2: Duplicate Purchase Events (Inflates Payment Metrics)

**Problem:**

- Payment page fires `fbq("track", "Purchase", ...)` → generates random event_id
- Webhook fires CAPI Purchase event with `event_id: dbOrder.orderId`
- **Two different Purchase events = both counted in Meta Ads Manager**
- **Result: Falsely inflated ROAS metrics, duplicate conversion attribution**

**Current Code (Problematic):**

```typescript
// payment/status/page.tsx, line ~115
fbq("track", "Purchase", {
  value: data.amount,
  currency: data.currency || "INR",
}, { eventID: data.orderId })  // ← This should use orderId consistently

// webhook/route.ts, line 99
event_id: dbOrder.orderId,  // ← Different event tracking path
```

**Why It's a Problem:**

- The client-side uses `eventID` option in second parameter
- The server-side uses `event_id` in data payload
- Meta treats these as separate events → duplicate conversion counting

**Fix Required:** Ensure both use identical `event_id` (`orderId`).

---

### Issue #3: Missing CAPI Token Validation

**Problem:**

- If `META_CAPI_TOKEN` is missing, webhook just logs a warning and continues
- No error is thrown or reported to user
- Payments may silently fail to track in Ads Manager

**Current Code:**

```typescript
// webhook/route.ts, line 130
if (capiToken) {
  // Send CAPI event
} else {
  console.warn("Webhook: META_CAPI_TOKEN is missing...");
}
```

**Fix Required:** Validate token exists and provide clear error messages.

---

## ⚠️ WARNING ISSUES

### Issue #4: Missing ViewContent Events

**Problem:**

- No event fired when users view individual service report pages
- Incomplete funnel visibility in Meta Ads Manager
- Can't track "interest" or "consideration" phase

**Missing Implementation:**

- No tracking when `/ig/[slug]` page loads
- No tracking when `/services` page loads

**Recommendation:** Add ViewContent events when service pages load.

---

### Issue #5: No Event Deduplication Between Channels

**Problem:**

- AddToCart and Purchase have **client-side** deduplication (sessionStorage)
- But **server-side Purchase event is not deduped** against client-side
- Could lead to double-counting if both fire

**Risk Level:** Low (different event sources), but should be tracked.

---

## ✅ WHAT'S WORKING

### Client-Side Pixel Events

| Event            | Location                                                                                | Status                                  |
| ---------------- | --------------------------------------------------------------------------------------- | --------------------------------------- |
| PageView         | [layout.tsx](layout.tsx#L79), [FacebookPixel.tsx](src/components/FacebookPixel.tsx#L13) | ✅ Fires on every page load             |
| AddToCart        | [report-client.tsx](src/app/ig/[slug]/report-client.tsx#L120)                           | ✅ Fires when service selected, deduped |
| InitiateCheckout | [report-client.tsx](src/app/ig/[slug]/report-client.tsx#L244)                           | ✅ Fires when form submitted            |
| Purchase         | [payment/status/page.tsx](src/app/payment/status/page.tsx#L110)                         | ⚠️ Fires but duplicated with CAPI       |

### Server-Side CAPI Events

| Component         | Status      | Details                                        |
| ----------------- | ----------- | ---------------------------------------------- |
| Event Format      | ✅ Correct  | Uses v25.0 Graph API, proper payload structure |
| User Data Hashing | ✅ Correct  | SHA256 hashing of email, phone, first name     |
| Timestamp         | ✅ Correct  | Unix timestamp in seconds                      |
| Payment Data      | ✅ Captured | Currency, value, order ID properly included    |
| IP/User Agent     | ✅ Captured | Extracted from initial order creation          |

---

## 📊 Current Event Flow

```
User Journey:
1. Visits /ig/[slug] → PageView (Pixel)
2. Selects service → AddToCart (Pixel, deduped)
3. Fills form → InitiateCheckout (Pixel)
4. Submits payment info → Cashfree checkout
5. Completes payment → Redirect to /payment/status
   ├─ Client fires: Purchase (Pixel) [eventID: orderId]
   └─ Server fires: CAPI Purchase event [event_id: orderId]
6. Webhook processes payment
   └─ Already fired from server in step 5

❌ PROBLEM: Steps 5 both fire Purchase, no deduplication
```

---

## 🔧 REQUIRED FIXES

### Fix #1: Hardcode Pixel ID in Webhook (Priority: CRITICAL)

**File:** [frontend/src/app/api/cashfree/webhook/route.ts](frontend/src/app/api/cashfree/webhook/route.ts#L127)

```typescript
// CURRENT (BROKEN):
const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1413955200415939";

// FIX:
const pixelId = "1413955200415939";
```

**Why:** Ensures webhook can always send CAPI events without env dependency.

---

### Fix #2: Use Consistent Event IDs (Priority: HIGH)

**File:** [frontend/src/app/payment/status/page.tsx](frontend/src/app/payment/status/page.tsx#L110)

```typescript
// CURRENT (may cause duplicates):
fbq(
  "track",
  "Purchase",
  {
    value: data.amount,
    currency: data.currency || "INR",
  },
  { eventID: data.orderId },
);

// RECOMMENDED (same as server):
fbq(
  "track",
  "Purchase",
  {
    value: data.amount,
    currency: data.currency || "INR",
    content_type: "product",
    content_id: data.reportSlug,
  },
  { eventID: data.orderId },
);
```

---

### Fix #3: Add CAPI Token Validation (Priority: MEDIUM)

**File:** [frontend/src/app/api/cashfree/webhook/route.ts](frontend/src/app/api/cashfree/webhook/route.ts#L130)

```typescript
// CURRENT:
if (capiToken) {
  // Send event
} else {
  console.warn("...");
}

// RECOMMENDED:
if (!capiToken) {
  console.error(
    "CRITICAL: META_CAPI_TOKEN is missing. Purchase events will not be tracked in Meta Ads Manager.",
  );
  // Still process order but log severe error for monitoring
}
```

---

### Fix #4: Add ViewContent Events (Priority: LOW)

**Locations to add:**

- [frontend/src/app/ig/[slug]/page.tsx](frontend/src/app/ig/[slug]/page.tsx) - when report page loads
- [frontend/src/components/LayoutShell.tsx](frontend/src/components/LayoutShell.tsx) - optionally for all pages

**Implementation Example:**

```typescript
useEffect(() => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "ViewContent", {
      content_name: reportTitle,
      content_type: "product",
      content_id: reportSlug,
      currency: "INR",
      value: reportPrice,
    });
  }
}, [reportSlug, reportTitle, reportPrice]);
```

---

## 📋 Checklist to Fix

- [ ] **CRITICAL**: Hardcode Pixel ID in webhook ([workflow below](#how-to-implement))
- [ ] **HIGH**: Verify client/server Purchase event deduplication
- [ ] **MEDIUM**: Add CAPI token validation with logging
- [ ] **LOW**: Add ViewContent events for service pages
- [ ] **VERIFICATION**: Test payment flow in Ads Manager > Events Manager

---

## How to Implement

See the next section: **Implementation Guide** (provided separately or after you confirm these findings)

---

## Testing Checklist

After fixes, verify:

1. **Meta Ads Manager > Events Manager:**
   - [ ] Purchase events appear within 5-10 minutes of test payment
   - [ ] Only ONE Purchase event per order (not duplicates)
   - [ ] Event has correct value and currency

2. **Browser Console:**
   - [ ] No errors about `fbq` undefined
   - [ ] AddToCart logged (with dedup check)
   - [ ] InitiateCheckout logged

3. **Server Logs:**
   - [ ] Webhook receives PAID event
   - [ ] "Sent CAPI Purchase event" message appears
   - [ ] No "CAPI_TOKEN missing" warnings

4. **Ads Manager > Conversions:**
   - [ ] Purchase conversion tracked correctly
   - [ ] ROAS calculates properly (not inflated by duplicates)

---

## Environment Variables Checklist

Required in `.env.local`:

```
# Meta Conversions API
META_CAPI_TOKEN=your_access_token_here
```

Optional (now hardcoded):

- ~~NEXT_PUBLIC_META_PIXEL_ID~~ (hardcoded as 1413955200415939)

---

## Questions to Answer

1. **Is the CAPI token currently set in your `.env.local`?**
   - Check if webhook is actually sending events or just logging warnings

2. **Are you seeing Purchase events in Meta Ads Manager?**
   - If yes: some events are getting through despite the hardcode issue
   - If no: likely due to missing CAPI token or hardcode issue

3. **How many Purchase events do you see per order?**
   - Should be 1 (or 2 if deduplication fails)
   - If more: duplicate tracking issue

---

## Summary

| Issue                         | Severity    | Impact                   | Time to Fix |
| ----------------------------- | ----------- | ------------------------ | ----------- |
| Pixel ID hardcode in webhook  | 🔴 Critical | CAPI events may not send | 5 min       |
| Duplicate Purchase events     | 🟠 High     | Inflated ROAS metrics    | 10 min      |
| Missing CAPI token validation | 🟡 Medium   | Silent failures          | 10 min      |
| Missing ViewContent events    | 🟢 Low      | Incomplete funnel        | 15 min      |

**Total time to fix:** ~40 minutes (if all issues present)
