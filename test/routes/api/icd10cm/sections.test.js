import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { build } from '../../../helper.js';

describe('/api/icd10cm/sections', () => {
  describe('GET /', () => {
    it('returns a paginated list of ICD10CMSection records', async (t) => {
      const app = await build(t);
      await t.loadFixtures();
      const res = await app.inject().get('/api/icd10cm/sections');
      const records = JSON.parse(res.payload);
      assert.deepStrictEqual(records.length, 9);
    });

    it('returns a paginated list of ICD10CMSection records for a given chapter', async (t) => {
      const app = await build(t);
      await t.loadFixtures();
      const res = await app.inject().get('/api/icd10cm/sections?chapterName=2');
      const records = JSON.parse(res.payload);
      assert.deepStrictEqual(records.length, 3);
      assert.deepStrictEqual(records, [
        {
          id: 'C00-C14',
          desc: 'Malignant neoplasms of lip, oral cavity and pharynx (C00-C14)',
          chapterName: '2'
        },
        {
          id: 'C00-C75',
          desc: 'Malignant neoplasms, stated or presumed to be primary (of specified sites), and certain specified histologies, except neuroendocrine, and of lymphoid, hematopoietic and related tissue (C00-C75)',
          chapterName: '2'
        },
        {
          id: 'C00-C96',
          desc: 'Malignant neoplasms (C00-C96)',
          chapterName: '2'
        }
      ]);
    });
  });
});
