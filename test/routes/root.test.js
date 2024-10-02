import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { StatusCodes } from 'http-status-codes';
import { build } from '../helper.js';

describe('/health', () => {
  describe('GET /', () => {
    it('returns succesfully if the server and db connection is alive', async (t) => {
      const app = await build(t);
      const res = await app.inject({
        url: '/health'
      });
      assert.deepStrictEqual(res.statusCode, StatusCodes.OK);
      assert.deepStrictEqual(JSON.parse(res.payload), { alive: true });
    });
  });
});
