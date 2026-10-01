const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const ts = require('typescript');

function load(file, overrides = {}) {
  const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require, console, Request, Response, AbortSignal, ...overrides });
  return exports;
}
const productsModule = load('src/data/products.ts');
function handler(env = { TELEGRAM_BOT_TOKEN: 'test-only', TELEGRAM_CHAT_ID: 'test-only' }, fail = false) {
  const sent = [];
  const logs = [];
  const { POST } = load('src/app/api/order/route.ts', {
    process: { env },
    require: id => id === '@/data/products' ? productsModule : require(id),
    console: { error: (...args) => logs.push(args.join(' ')) },
    fetch: async (_url, options) => {
      sent.push(JSON.parse(options.body));
      if (fail) throw new Error('request URL contains test-only');
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    },
  });
  return { POST, sent, logs };
}
const valid = {
  name: 'Test buyer', contact: '@test_buyer', consent: true, fulfillment: 'Самовывоз',
  items: [{ id: 'raspberry-pistachio', quantity: 2 }],
};
function request(body) {
  return new Request('http://localhost/api/order', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
}
test('missing Telegram credentials returns 503 without sending anything', async () => {
  const h = handler({});
  assert.equal((await h.POST(request(valid))).status, 503);
  assert.equal(h.sent.length, 0);
});
test('server computes price and escapes customer input', async () => {
  const h = handler();
  const response = await h.POST(request({ ...valid, name: '<b>Test</b>', items: [{ ...valid.items[0], unitPrice: 0.01, name: 'forged' }] }));
  assert.equal(response.status, 200);
  assert.match(h.sent[0].text, /€24\.00/);
  assert.match(h.sent[0].text, /&lt;b&gt;Test&lt;\/b&gt;/);
  assert.doesNotMatch(h.sent[0].text, /forged/);
});
test('invalid items reject the whole order, without a partial Telegram order', async () => {
  for (const items of [
    [null], [{ id: 'unknown', quantity: 1 }], [{ id: 'strawberry-matcha', quantity: 1 }],
    [{ id: 'raspberry-pistachio', quantity: 1.5 }], [{ id: 'raspberry-pistachio', quantity: -1 }],
    [{ id: 'raspberry-pistachio', quantity: '2' }], [valid.items[0], valid.items[0]],
    [valid.items[0], { id: 'unknown', quantity: 1 }],
  ]) {
    const h = handler();
    assert.equal((await h.POST(request({ ...valid, items }))).status, 400);
    assert.equal(h.sent.length, 0);
  }
});
test('consent, fulfillment and malformed JSON are validated', async () => {
  for (const body of [null, [], { ...valid, consent: 'yes' }, { ...valid, consent: false }, { ...valid, fulfillment: 'invalid' }]) {
    assert.equal((await handler().POST(request(body))).status, 400);
  }
  const malformed = new Request('http://localhost/api/order', { method: 'POST', body: '{' });
  assert.equal((await handler().POST(malformed)).status, 400);
});
test('delivery errors never leak the bot token into logs or response', async () => {
  const h = handler(undefined, true);
  const response = await h.POST(request(valid));
  assert.equal(response.status, 502);
  assert.doesNotMatch(h.logs.join(' ') + await response.text(), /test-only/);
});
