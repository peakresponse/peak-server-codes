import { test } from 'node:test';
import * as assert from 'node:assert';
import { build } from '../helper.js';

test('/health', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: '/health'
  });
  assert.deepStrictEqual(JSON.parse(res.payload), { alive: true });
});
