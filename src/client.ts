import { createHash, createHmac, randomUUID } from 'node:crypto';
import { AfroPinError } from './errors';
import { Page } from './page';
import { Reseller, Brand } from './resources';

export type Params = Record<string, unknown>;

export interface ClientOptions {
  /** Defaults to https://afropin.com/api/v1. Test and live keys use the same URL. */
  baseUrl?: string;
  /** Milliseconds before a request is abandoned. Defaults to 30000. */
  timeout?: number;
  /** A fetch implementation, for tests or older runtimes. Defaults to the global fetch (Node 18+). */
  fetch?: typeof fetch;
}

export interface RequestOptions {
  /** Replaces the generated Idempotency-Key, for example to keep it in your own records. */
  idempotencyKey?: string;
}

export const VERSION = '1.0.0';
export const BASE_URL = 'https://afropin.com/api/v1';

/**
 * The AfroPin API client. Signs every request with your key (HMAC-SHA256 over "METHOD.path.timestamp.nonce.sha256(body)"),
 * sends a fresh Idempotency-Key with each one, and returns the response's data. Your key's mode (test or live) decides
 * which records you work with.
 *
 *   const afropin = new AfroPin('key_id', 'secret');
 *   const pin = await afropin.reseller.pins.sell({ catalog_id: '...', amount: 5000, ... });
 *
 * Requests are never retried for you: a retried sale with the same external_reference fails safely with
 * duplicate_external_reference, so retry yourself with a new Idempotency-Key when you need to.
 */
export class AfroPin {
  readonly reseller: Reseller;
  readonly brand: Brand;
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly keyId: string, private readonly secret: string, options: ClientOptions = {}) {
    this.baseUrl = (options.baseUrl ?? BASE_URL).replace(/\/+$/, '');
    this.timeout = options.timeout ?? 30000;
    this.fetchImpl = options.fetch ?? fetch;
    this.reseller = new Reseller(this);
    this.brand = new Brand(this);
  }

  /** Send one request: its data, or a Page for lists. params are the query (GET, DELETE) or the JSON body. */
  async request<T = any>(method: string, path: string, params: Params = {}, options: RequestOptions = {}, list = false): Promise<T> {
    let url = `${this.baseUrl}/${path.replace(/^\/+/, '')}`;
    let body = '';
    if (method === 'GET' || method === 'DELETE') {
      const query = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) query.append(key, String(value));
      }
      if ([...query].length) url += `?${query.toString()}`;
    } else {
      body = JSON.stringify(params);
    }

    const timestamp = String(Math.floor(Date.now() / 1000));
    const nonce = randomUUID();
    const signedPath = new URL(url).pathname.replace(/^\/+/, '');
    const canonical = [method, signedPath, timestamp, nonce, createHash('sha256').update(body).digest('hex')].join('.');
    const headers: Record<string, string> = {
      'X-Key-Id': this.keyId,
      'X-Timestamp': timestamp,
      'X-Nonce': nonce,
      'X-Signature': createHmac('sha256', this.secret).update(canonical).digest('hex'),
      'Idempotency-Key': options.idempotencyKey ?? randomUUID(),
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': `afropin-node/${VERSION}`,
    };

    let response: Response;
    try {
      response = await this.fetchImpl(url, { method, headers, body: body === '' ? undefined : body, signal: AbortSignal.timeout(this.timeout) });
    } catch (error) {
      throw new AfroPinError('connection_failed', `Could not reach the AfroPin API: ${(error as Error).message}`);
    }
    let json: any;
    try {
      json = await response.json();
    } catch {
      throw new AfroPinError('invalid_response', 'The API sent a response that is not JSON', null, response.status);
    }
    if (!json || !json.ok) {
      const error = json?.error ?? {};
      throw new AfroPinError(error.code ?? 'unknown_error', error.message ?? 'The request failed', error.fields ?? null, response.status);
    }

    return (list ? new Page(json.data ?? [], json.paging ?? null) : json.data) as T;
  }
}
