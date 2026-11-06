import { createHmac, timingSafeEqual } from 'node:crypto';
import { AfroPinError } from './errors';

export interface WebhookEvent<T = any> {
  type: string;
  data: T;
}

/**
 * Checking a webhook AfroPin sent you. Each one is signed with the webhook's secret: the webhook-secret header holds the
 * HMAC-SHA256 of the raw body. Check it against the body exactly as received (for example express.raw()), before
 * parsing it.
 */
export function verifyWebhook(rawBody: string | Buffer, signature: string | undefined, secret: string): boolean {
  if (!signature) return false;
  const expected = Buffer.from(createHmac('sha256', secret).update(rawBody).digest('hex'));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** The event, once its signature checks out; throws AfroPinError invalid_signature when it doesn't. */
export function parseWebhook<T = any>(rawBody: string | Buffer, signature: string | undefined, secret: string): WebhookEvent<T> {
  if (!verifyWebhook(rawBody, signature, secret)) {
    throw new AfroPinError('invalid_signature', 'The webhook signature does not match its body');
  }
  const event = JSON.parse(rawBody.toString());
  if (!event || typeof event.type !== 'string') {
    throw new AfroPinError('invalid_response', 'The webhook body is not an AfroPin event');
  }
  return event;
}
