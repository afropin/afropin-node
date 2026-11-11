import { createHmac, timingSafeEqual } from 'node:crypto';
import { AfroPinError } from './errors';

export interface WebhookEvent<T = any> {
  /** The same on every retry of one event: use it to skip an event you've already handled */
  id: string;
  type: string;
  data: T;
}

/** req.headers in Node and Express, or a fetch Headers object */
export type WebhookHeaders = Record<string, string | string[] | undefined> | { get(name: string): string | null };

/** How far webhook-timestamp may be from now, in seconds */
export const WEBHOOK_TOLERANCE = 300;

/**
 * Checking a webhook AfroPin sent you. Each one carries three headers: webhook-id (the same on every retry of one
 * event), webhook-timestamp (Unix seconds, when it was sent) and webhook-signature, the HMAC-SHA256 of
 * "id.timestamp.body" with your webhook's secret. Check it against the body exactly as received (for example
 * express.raw()), before parsing it. A timestamp more than 5 minutes from now is refused, so a captured webhook
 * can't be replayed later.
 */
export function verifyWebhook(rawBody: string | Buffer, headers: WebhookHeaders, secret: string, toleranceSeconds = WEBHOOK_TOLERANCE): boolean {
  try {
    check(rawBody, headers, secret, toleranceSeconds);
    return true;
  } catch {
    return false;
  }
}

/** The event, once its signature checks out; throws AfroPinError invalid_signature when it doesn't. */
export function parseWebhook<T = any>(rawBody: string | Buffer, headers: WebhookHeaders, secret: string, toleranceSeconds = WEBHOOK_TOLERANCE): WebhookEvent<T> {
  const id = check(rawBody, headers, secret, toleranceSeconds);
  const event = JSON.parse(rawBody.toString());
  if (!event || typeof event.type !== 'string') {
    throw new AfroPinError('invalid_response', 'The webhook body is not an AfroPin event');
  }
  return { id, ...event };
}

function check(rawBody: string | Buffer, headers: WebhookHeaders, secret: string, toleranceSeconds: number): string {
  const id = header(headers, 'webhook-id');
  const timestamp = header(headers, 'webhook-timestamp');
  const signature = header(headers, 'webhook-signature');
  if (!id || !/^\d+$/.test(timestamp) || !signature) {
    throw new AfroPinError('invalid_signature', 'The webhook-id, webhook-timestamp or webhook-signature header is missing');
  }
  if (Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp)) > toleranceSeconds) {
    throw new AfroPinError('invalid_signature', 'The webhook timestamp is too old or too far ahead: check your server clock');
  }
  const expected = Buffer.from(createHmac('sha256', secret).update(`${id}.${timestamp}.`).update(rawBody).digest('hex'));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    throw new AfroPinError('invalid_signature', 'The webhook signature does not match its body');
  }
  return id;
}

function header(headers: WebhookHeaders, name: string): string {
  if (typeof (headers as any)?.get === 'function') {
    return ((headers as any).get(name) ?? '').trim();
  }
  for (const [key, value] of Object.entries(headers ?? {})) {
    if (key.toLowerCase() === name) {
      return String(Array.isArray(value) ? value[0] : value ?? '').trim();
    }
  }
  return '';
}
