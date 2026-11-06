/**
 * A request the API refused, or one that couldn't be made. Branch on code (for example pin_balance_low or
 * duplicate_external_reference); the message is for people and may change. fields has per-field messages for input
 * problems. status is the HTTP status, or 0 when the API wasn't reached.
 */
export class AfroPinError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly fields: Record<string, string[]> | null = null,
    readonly status = 0,
  ) {
    super(message);
    this.name = 'AfroPinError';
  }
}
