import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { build } from '../../../helper.js';

describe('/api/icd10cm/codes', () => {
  describe('GET /', () => {
    it('returns a paginated list of ICD10CMCode records', async (t) => {
      const app = await build(t);
      await t.loadFixtures();
      const res = await app.inject().get('/api/icd10cm/codes');
      const records = JSON.parse(res.payload);
      assert.deepStrictEqual(records.length, 6);
    });

    it('returns a paginated list of ICD10CMCode records for a given section', async (t) => {
      const app = await build(t);
      await t.loadFixtures();
      const res = await app.inject().get('/api/icd10cm/codes?sectionId=A15-A19');
      const records = JSON.parse(res.payload);
      assert.deepStrictEqual(records.length, 3);
      assert.deepStrictEqual(records, [
        {
          name: 'A15',
          desc: 'Respiratory tuberculosis',
          sectionId: 'A15-A19',
          parentName: '',
          depth: 0,
          lft: 189,
          rgt: 204
        },
        {
          name: 'A15.0',
          desc: 'Tuberculosis of lung',
          sectionId: 'A15-A19',
          parentName: 'A15',
          depth: 1,
          lft: 190,
          rgt: 191
        },
        {
          name: 'A15.4',
          desc: 'Tuberculosis of intrathoracic lymph nodes',
          sectionId: 'A15-A19',
          parentName: 'A15',
          depth: 1,
          lft: 192,
          rgt: 193
        }
      ]);
    });

    it('returns a paginated list of ICD10CMCode records at given depth level', async (t) => {
      const app = await build(t);
      await t.loadFixtures();
      const res = await app.inject().get('/api/icd10cm/codes?level=0');
      const records = JSON.parse(res.payload);
      assert.deepStrictEqual(records.length, 2);
      assert.deepStrictEqual(records, [
        {
          name: 'A00',
          desc: 'Cholera',
          sectionId: 'A00-A09',
          parentName: '',
          depth: 0,
          lft: 1,
          rgt: 8
        },
        {
          name: 'A15',
          desc: 'Respiratory tuberculosis',
          sectionId: 'A15-A19',
          parentName: '',
          depth: 0,
          lft: 189,
          rgt: 204
        }
      ]);
    });

    it('returns a paginated list of ICD10CMCode records for a given section and depth level', async (t) => {
      const app = await build(t);
      await t.loadFixtures();
      const res = await app.inject().get('/api/icd10cm/codes?sectionId=A15-A19&level=0');
      const records = JSON.parse(res.payload);
      assert.deepStrictEqual(records.length, 1);
      assert.deepStrictEqual(records, [
        {
          name: 'A15',
          desc: 'Respiratory tuberculosis',
          sectionId: 'A15-A19',
          parentName: '',
          depth: 0,
          lft: 189,
          rgt: 204
        }
      ]);
    });
  });
});
