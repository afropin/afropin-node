// Generated from sdks/spec/endpoints.json by sdks/spec/generate.py. Don't edit by hand: change the spec and run it again.

import type { AfroPin, Params, RequestOptions } from './client';
import type { Page } from './page';

export class ResellerWallets {
  constructor(private readonly client: AfroPin) {}

  /** Your wallets and their balances, one per currency. (GET /api/v1/reseller/wallets) */
  list(params: Params = {}, options: RequestOptions = {}): Promise<Page> {
    return this.client.request('GET', `reseller/wallets`, params, options, true);
  }
}

export class ResellerStores {
  constructor(private readonly client: AfroPin) {}

  /** Your stores. (GET /api/v1/reseller/stores) */
  list(params: Params = {}, options: RequestOptions = {}): Promise<Page> {
    return this.client.request('GET', `reseller/stores`, params, options, true);
  }

  /** Add a store. (POST /api/v1/reseller/stores) */
  create(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/stores`, params, options);
  }

  /** Edit a store. (POST /api/v1/reseller/stores/{store_id}) */
  update(storeId: string, params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/stores/${encodeURIComponent(storeId)}`, params, options);
  }

  /** Remove a store. (DELETE /api/v1/reseller/stores/{store_id}) */
  delete(storeId: string, params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('DELETE', `reseller/stores/${encodeURIComponent(storeId)}`, params, options);
  }
}

export class ResellerCards {
  constructor(private readonly client: AfroPin) {}

  /** Look up one of your printed cards before activating it. (POST /api/v1/reseller/cards/lookup) */
  lookup(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/cards/lookup`, params, options);
  }

  /** Activate a printed card: sells a PIN for the amount loaded. (POST /api/v1/reseller/cards/activate) */
  activate(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/cards/activate`, params, options);
  }
}

export class ResellerCatalog {
  constructor(private readonly client: AfroPin) {}

  /** The products you can sell. (GET /api/v1/reseller/catalog) */
  list(params: Params = {}, options: RequestOptions = {}): Promise<Page> {
    return this.client.request('GET', `reseller/catalog`, params, options, true);
  }

  /** One product you can sell. (GET /api/v1/reseller/catalog/{catalog_id}) */
  get(catalogId: string, params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('GET', `reseller/catalog/${encodeURIComponent(catalogId)}`, params, options);
  }
}

export class ResellerPins {
  constructor(private readonly client: AfroPin) {}

  /** Sell a PIN. The response has its full code (pin_code), returned only here. (POST /api/v1/reseller/pins) */
  sell(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/pins`, params, options);
  }

  /** One of your PINs: balance, status, masks, customer, family cards. (GET /api/v1/reseller/pins/{pin_id}) */
  get(pinId: string, params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('GET', `reseller/pins/${encodeURIComponent(pinId)}`, params, options);
  }

  /** A PIN's movements, newest first. (GET /api/v1/reseller/pins/{pin_id}/movements) */
  movements(pinId: string, params: Params = {}, options: RequestOptions = {}): Promise<Page> {
    return this.client.request('GET', `reseller/pins/${encodeURIComponent(pinId)}/movements`, params, options, true);
  }

  /** Add value to a PIN. (POST /api/v1/reseller/pins/top-up) */
  topUp(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/pins/top-up`, params, options);
  }

  /** Block (freeze) a PIN. Its cardholder can't undo it. (POST /api/v1/reseller/pins/block) */
  block(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/pins/block`, params, options);
  }

  /** Unblock a PIN. (POST /api/v1/reseller/pins/unblock) */
  unblock(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/pins/unblock`, params, options);
  }

  /** Give a PIN a new code; the old one stops working. (POST /api/v1/reseller/pins/new-code) */
  newCode(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/pins/new-code`, params, options);
  }

  /** Links that add a PIN to Google Wallet or Apple Wallet. (POST /api/v1/reseller/pins/wallet-links) */
  walletLinks(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/pins/wallet-links`, params, options);
  }

  /** Change a PIN's webhook. (POST /api/v1/reseller/pins/webhook) */
  setWebhook(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/pins/webhook`, params, options);
  }

  /** Choose who delivers a PIN's codes to its customer: us (handle_delivery true) or you. (POST /api/v1/reseller/pins/delivery) */
  setDelivery(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/pins/delivery`, params, options);
  }

  /** A PIN's cashouts. (GET /api/v1/reseller/pins/{pin_id}/cashouts) */
  cashouts(pinId: string, params: Params = {}, options: RequestOptions = {}): Promise<Page> {
    return this.client.request('GET', `reseller/pins/${encodeURIComponent(pinId)}/cashouts`, params, options, true);
  }
}

export class ResellerBrandStores {
  constructor(private readonly client: AfroPin) {}

  /** Brand stores where your customers can spend the PINs you sell. (GET /api/v1/reseller/brand-stores) */
  list(params: Params = {}, options: RequestOptions = {}): Promise<Page> {
    return this.client.request('GET', `reseller/brand-stores`, params, options, true);
  }
}

export class ResellerCashouts {
  constructor(private readonly client: AfroPin) {}

  /** Request a cashout (only while cashouts are switched on). (POST /api/v1/reseller/cashouts) */
  request(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/cashouts`, params, options);
  }

  /** Send the customer the confirmation code again. (POST /api/v1/reseller/cashouts/send-code) */
  sendCode(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/cashouts/send-code`, params, options);
  }

  /** Confirm a cashout with the customer's code. (POST /api/v1/reseller/cashouts/{cashout_id}/confirm) */
  confirm(cashoutId: string, params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/cashouts/${encodeURIComponent(cashoutId)}/confirm`, params, options);
  }

  /** Void an unpaid cashout. (POST /api/v1/reseller/cashouts/{cashout_id}/void) */
  void(cashoutId: string, params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `reseller/cashouts/${encodeURIComponent(cashoutId)}/void`, params, options);
  }
}

/** The reseller API (/api/v1/reseller): every call a reseller account can make, by area. */
export class Reseller {
  readonly wallets: ResellerWallets;
  readonly stores: ResellerStores;
  readonly cards: ResellerCards;
  readonly catalog: ResellerCatalog;
  readonly pins: ResellerPins;
  readonly brandStores: ResellerBrandStores;
  readonly cashouts: ResellerCashouts;

  constructor(client: AfroPin) {
    this.wallets = new ResellerWallets(client);
    this.stores = new ResellerStores(client);
    this.cards = new ResellerCards(client);
    this.catalog = new ResellerCatalog(client);
    this.pins = new ResellerPins(client);
    this.brandStores = new ResellerBrandStores(client);
    this.cashouts = new ResellerCashouts(client);
  }
}

export class BrandWallets {
  constructor(private readonly client: AfroPin) {}

  /** Your wallets and their balances, one per currency. (GET /api/v1/brand/wallets) */
  list(params: Params = {}, options: RequestOptions = {}): Promise<Page> {
    return this.client.request('GET', `brand/wallets`, params, options, true);
  }
}

export class BrandStores {
  constructor(private readonly client: AfroPin) {}

  /** Your stores. (GET /api/v1/brand/stores) */
  list(params: Params = {}, options: RequestOptions = {}): Promise<Page> {
    return this.client.request('GET', `brand/stores`, params, options, true);
  }

  /** Add a store. (POST /api/v1/brand/stores) */
  create(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/stores`, params, options);
  }

  /** Edit a store. (POST /api/v1/brand/stores/{store_id}) */
  update(storeId: string, params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/stores/${encodeURIComponent(storeId)}`, params, options);
  }

  /** Remove a store. (DELETE /api/v1/brand/stores/{store_id}) */
  delete(storeId: string, params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('DELETE', `brand/stores/${encodeURIComponent(storeId)}`, params, options);
  }
}

export class BrandCards {
  constructor(private readonly client: AfroPin) {}

  /** Look up one of your printed cards before activating it. (POST /api/v1/brand/cards/lookup) */
  lookup(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/cards/lookup`, params, options);
  }

  /** Activate a printed card: sells a PIN for the amount loaded. (POST /api/v1/brand/cards/activate) */
  activate(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/cards/activate`, params, options);
  }
}

export class BrandIssuingCatalog {
  constructor(private readonly client: AfroPin) {}

  /** The products you can sell. (GET /api/v1/brand/issuing-catalog) */
  list(params: Params = {}, options: RequestOptions = {}): Promise<Page> {
    return this.client.request('GET', `brand/issuing-catalog`, params, options, true);
  }

  /** One product you can sell. (GET /api/v1/brand/issuing-catalog/{catalog_id}) */
  get(catalogId: string, params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('GET', `brand/issuing-catalog/${encodeURIComponent(catalogId)}`, params, options);
  }
}

export class BrandPins {
  constructor(private readonly client: AfroPin) {}

  /** Sell a PIN. The response has its full code (pin_code), returned only here. (POST /api/v1/brand/pins) */
  sell(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/pins`, params, options);
  }

  /** One of your PINs: balance, status, masks, customer, family cards. (GET /api/v1/brand/pins/{pin_id}) */
  get(pinId: string, params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('GET', `brand/pins/${encodeURIComponent(pinId)}`, params, options);
  }

  /** A PIN's movements, newest first. (GET /api/v1/brand/pins/{pin_id}/movements) */
  movements(pinId: string, params: Params = {}, options: RequestOptions = {}): Promise<Page> {
    return this.client.request('GET', `brand/pins/${encodeURIComponent(pinId)}/movements`, params, options, true);
  }

  /** Add value to a PIN. (POST /api/v1/brand/pins/top-up) */
  topUp(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/pins/top-up`, params, options);
  }

  /** Block (freeze) a PIN. Its cardholder can't undo it. (POST /api/v1/brand/pins/block) */
  block(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/pins/block`, params, options);
  }

  /** Unblock a PIN. (POST /api/v1/brand/pins/unblock) */
  unblock(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/pins/unblock`, params, options);
  }

  /** Give a PIN a new code; the old one stops working. (POST /api/v1/brand/pins/new-code) */
  newCode(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/pins/new-code`, params, options);
  }

  /** Links that add a PIN to Google Wallet or Apple Wallet. (POST /api/v1/brand/pins/wallet-links) */
  walletLinks(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/pins/wallet-links`, params, options);
  }

  /** Change a PIN's webhook. (POST /api/v1/brand/pins/webhook) */
  setWebhook(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/pins/webhook`, params, options);
  }

  /** Choose who delivers a PIN's codes to its customer: us (handle_delivery true) or you. (POST /api/v1/brand/pins/delivery) */
  setDelivery(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/pins/delivery`, params, options);
  }

  /** Check a PIN before redeeming it; nothing changes. (POST /api/v1/brand/pins/check) */
  check(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/pins/check`, params, options);
  }

  /** Redeem a PIN: take an amount off it and credit your wallet. (POST /api/v1/brand/pins/redeem) */
  redeem(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/pins/redeem`, params, options);
  }
}

export class BrandCatalog {
  constructor(private readonly client: AfroPin) {}

  /** The products you accept. (GET /api/v1/brand/catalog) */
  list(params: Params = {}, options: RequestOptions = {}): Promise<Page> {
    return this.client.request('GET', `brand/catalog`, params, options, true);
  }

  /** One product you accept. (GET /api/v1/brand/catalog/{catalog_id}) */
  get(catalogId: string, params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('GET', `brand/catalog/${encodeURIComponent(catalogId)}`, params, options);
  }
}

export class BrandResellerStores {
  constructor(private readonly client: AfroPin) {}

  /** Reseller stores that sell PINs you accept. (GET /api/v1/brand/reseller-stores) */
  list(params: Params = {}, options: RequestOptions = {}): Promise<Page> {
    return this.client.request('GET', `brand/reseller-stores`, params, options, true);
  }
}

export class BrandPayments {
  constructor(private readonly client: AfroPin) {}

  /** The redemptions credited to you, newest first. (GET /api/v1/brand/payments) */
  list(params: Params = {}, options: RequestOptions = {}): Promise<Page> {
    return this.client.request('GET', `brand/payments`, params, options, true);
  }

  /** One redemption. (GET /api/v1/brand/payments/{transaction_ref}) */
  get(transactionRef: string, params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('GET', `brand/payments/${encodeURIComponent(transactionRef)}`, params, options);
  }
}

export class BrandQuotes {
  constructor(private readonly client: AfroPin) {}

  /** Your quotes, newest first. (GET /api/v1/brand/quotes) */
  list(params: Params = {}, options: RequestOptions = {}): Promise<Page> {
    return this.client.request('GET', `brand/quotes`, params, options, true);
  }

  /** Quote a business for your gift cards in bulk; returns a pay_url. (POST /api/v1/brand/quotes) */
  create(params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/quotes`, params, options);
  }

  /** One quote, by id or QTE- reference. (GET /api/v1/brand/quotes/{quote_id}) */
  get(quoteId: string, params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('GET', `brand/quotes/${encodeURIComponent(quoteId)}`, params, options);
  }

  /** Withdraw an unpaid quote. (POST /api/v1/brand/quotes/{quote_id}/cancel) */
  cancel(quoteId: string, params: Params = {}, options: RequestOptions = {}): Promise<any> {
    return this.client.request('POST', `brand/quotes/${encodeURIComponent(quoteId)}/cancel`, params, options);
  }
}

/** The brand API (/api/v1/brand): every call a brand account can make, by area. */
export class Brand {
  readonly wallets: BrandWallets;
  readonly stores: BrandStores;
  readonly cards: BrandCards;
  readonly issuingCatalog: BrandIssuingCatalog;
  readonly pins: BrandPins;
  readonly catalog: BrandCatalog;
  readonly resellerStores: BrandResellerStores;
  readonly payments: BrandPayments;
  readonly quotes: BrandQuotes;

  constructor(client: AfroPin) {
    this.wallets = new BrandWallets(client);
    this.stores = new BrandStores(client);
    this.cards = new BrandCards(client);
    this.issuingCatalog = new BrandIssuingCatalog(client);
    this.pins = new BrandPins(client);
    this.catalog = new BrandCatalog(client);
    this.resellerStores = new BrandResellerStores(client);
    this.payments = new BrandPayments(client);
    this.quotes = new BrandQuotes(client);
  }
}
