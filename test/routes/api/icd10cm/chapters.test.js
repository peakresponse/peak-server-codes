import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { build } from '../../../helper.js';

describe('/api/icd10cm/chapters', () => {
  describe('GET /', () => {
    it('returns a paginated list of ICD10CMChapter records', async (t) => {
      const app = await build(t);
      await t.loadFixtures();
      const res = await app.inject().get('/api/icd10cm/chapters');
      const records = JSON.parse(res.payload);
      assert.deepStrictEqual(records.length, 3);
      assert.deepStrictEqual(records, [
        {
          name: '1',
          position: 1,
          desc: 'Certain infectious and parasitic diseases (A00-B99)'
        },
        { name: '2', position: 2, desc: 'Neoplasms (C00-D49)' },
        {
          name: '3',
          position: 3,
          desc: 'Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism (D50-D89)'
        }
      ]);
    });
  });
});
