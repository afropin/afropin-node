// The Node SDK's checks: signing and webhooks offline, then (with AFROPIN_TEST_ENV pointing at a JSON file of test keys,
// base_url, catalog_id and test_pin) a real round trip against an AfroPin API in test mode. Build first: npm run build
const test = require('node:test');
const assert = require('node:assert');
const { createHash, createHmac, randomBytes } = require('node:crypto');
const fs = require('node:fs');
const { AfroPin, AfroPinError, Page, verifyWebhook } = require('../dist');

test('signs requests and returns data', async () => {
  let sent;
  const fakeFetch = async (url, init) => {
    sent = { url, ...init };
    return new Response(JSON.stringify({ ok: true, data: { pin_id: 'p1' } }), { status: 200 });
  };
  const client = new AfroPin('key_1', 'secret_1', { baseUrl: 'https://example.test/api/v1', fetch: fakeFetch });
  const data = await client.reseller.pins.topUp({ pin_id: 'p1', amount: 500 }, { idempotencyKey: 'idem-1' });
  const h = sent.headers;
  const canonical = ['POST', 'api/v1/reseller/pins/top-up', h['X-Timestamp'], h['X-Nonce'], createHash('sha256').update(sent.body).digest('hex')].join('.');
  assert.strictEqual(h['X-Signature'], createHmac('sha256', 'secret_1').update(canonical).digest('hex'));
  assert.strictEqual(h['Idempotency-Key'], 'idem-1');
  assert.deepStrictEqual(data, { pin_id: 'p1' });
  await client.reseller.pins.get('a/b');
  assert.ok(sent.url.endsWith('/reseller/pins/a%2Fb'));
  assert.strictEqual(sent.body, undefined);
});

test('verifies webhooks', () => {
  const body = '{"type":"pin.sold","data":{"pin_id":"p1"}}';
  assert.ok(verifyWebhook(body, createHmac('sha256', 'whsec').update(body).digest('hex'), 'whsec'));
  assert.ok(!verifyWebhook(body, createHmac('sha256', 'other').update(body).digest('hex'), 'whsec'));
});

const envFile = process.env.AFROPIN_TEST_ENV;
test('round trip in test mode', { skip: !envFile && 'set AFROPIN_TEST_ENV to run against an API' }, async () => {
  const env = JSON.parse(fs.readFileSync(envFile, 'utf8'));
  const reseller = new AfroPin(env.reseller.key_id, env.reseller.secret, { baseUrl: env.base_url });
  const brand = new AfroPin(env.brand.key_id, env.brand.secret, { baseUrl: env.base_url });

  assert.ok((await reseller.reseller.wallets.list()).data.length > 0);
  const catalog = await reseller.reseller.catalog.list({ limit: 5 });
  assert.ok(catalog instanceof Page && catalog.data.length > 0 && catalog.paging.total > 0);
  const product = await reseller.reseller.catalog.get(env.catalog_id);
  const amount = Number((product.denominations && product.denominations[0]) ?? product.min);
  const sold = await reseller.reseller.pins.sell({
    catalog_id: env.catalog_id, amount, external_reference: 'sdk-node-' + randomBytes(6).toString('hex'),
    first_name: 'Sdk', last_name: 'Test', email: 'sdk.test@gmail.com',
  });
  assert.ok(sold.pin_code && sold.pin_id);
  const pin = await reseller.reseller.pins.get(sold.pin_id);
  assert.strictEqual(Number(pin.balance), amount);
  await assert.rejects(reseller.reseller.pins.get('00000000-0000-4000-8000-000000000000'),
    (e) => e instanceof AfroPinError && e.code === 'pin_not_found' && e.status === 404);
  assert.ok('can_redeem' in (await brand.brand.pins.check({ pin_code: env.test_pin })));
});
