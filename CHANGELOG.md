# Changelog

## 2.0.0

Webhook checks follow AfroPin's new webhook signature, and the old one is no longer sent. `parseWebhook()` and `verifyWebhook()`
now take (rawBody, headers, secret), check `webhook-signature` (the HMAC-SHA256 of `id.timestamp.body`) and refuse a
`webhook-timestamp` more than 5 minutes from now. The event comes back with its `id`, the same on every retry.

## 1.1.0

`pins.setDelivery()` (POST pins/delivery) chooses who delivers a PIN's codes to its customer. Selling a PIN or
activating a printed card takes `handle_delivery` in place of the platform webhook URL, which is gone.

## 1.0.0

First release: every brand and reseller endpoint of the AfroPin API v1, request signing, idempotency keys, pages for
lists, one error type with the API's error codes, and webhook signature checks.
