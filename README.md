# AfroPin for Node.js

[![npm](https://img.shields.io/npm/v/@afropin/afropin)](https://www.npmjs.com/package/@afropin/afropin)

The AfroPin gift card API from Node.js and TypeScript: sell, top up and redeem PINs, quotes, stores and webhooks.

```
npm install @afropin/afropin
```

Node 18 or newer. No dependencies. Types are included.

## Start

```ts
import { AfroPin } from '@afropin/afropin';

const afropin = new AfroPin(process.env.AFROPIN_KEY_ID!, process.env.AFROPIN_SECRET!);
```

Your API key's mode decides whether you work with test or live records; the address is the same for both. Keep the
secret on your server, never in a browser or app.

### Reseller: sell a PIN

```ts
const pin = await afropin.reseller.pins.sell({
  catalog_id: catalogId,          // from afropin.reseller.catalog.list()
  amount: 5000,
  external_reference: orderId,    // your own reference; reusing it fails safely
  first_name: 'Ada',
  last_name: 'Obi',
  email: 'ada@example.com',
});

pin.pin_code; // the full code: returned only here, so deliver it to your customer now
```

### Brand: check and redeem a PIN

```ts
const check = await afropin.brand.pins.check({ pin_code: code, amount: 2500 });
if (check.can_redeem) {
  await afropin.brand.pins.redeem({ pin_code: code, amount: 2500, external_reference: saleId });
}
```

Every call is listed in [METHODS.md](../METHODS.md). Parameters and response fields are the API's own, as in the
developer docs.

## Errors

```ts
import { AfroPinError } from '@afropin/afropin';

try {
  await afropin.reseller.pins.topUp({ pin_id: pinId, amount: 1000, external_reference: ref });
} catch (error) {
  if (error instanceof AfroPinError) {
    error.code;   // for example pin_not_found, amount_too_large, duplicate_external_reference
    error.fields; // per-field messages for input problems
    error.status; // HTTP status, or 0 when the API wasn't reached (connection_failed)
  }
}
```

Branch on `code`; the message is for people and may change.

## Lists

Lists return a `Page`: iterate it, and read `paging` for `page`, `pages` and `total`.

```ts
const page = await afropin.brand.payments.list({ limit: 50 });
for (const payment of page) { /* ... */ }
if (page.hasMore) {
  const next = await afropin.brand.payments.list({ limit: 50, page: page.paging!.page + 1 });
}
```

## Idempotency and retries

Each request gets a new `Idempotency-Key`. To use your own: `sell(params, { idempotencyKey })`. Nothing is retried for
you. If a sale times out, send it again with the same `external_reference`: it either goes through once, or fails with
`duplicate_external_reference`.

## Webhooks

```ts
import express from 'express';
import { parseWebhook } from '@afropin/afropin';

app.post('/afropin/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const event = parseWebhook(req.body, req.headers, process.env.AFROPIN_WEBHOOK_SECRET!);
  if (event.type === 'pin.spent') { /* ... */ }
  res.sendStatus(200);
});
```

Each webhook carries `webhook-id`, `webhook-timestamp` and `webhook-signature` headers. `parseWebhook` throws `invalid_signature` when the
signature doesn't match the body, a header is missing, or the timestamp is more than 5 minutes from now (check your
server clock). Use the raw body exactly as received. The event's `id` is the same on every retry, so use it to skip
an event you've already handled.

A fetch `Headers` object works too, for example `request.headers` in a Next.js route handler.
