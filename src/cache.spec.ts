import 'mocha';
import { expect } from 'chai';
import storage, { writeCache, readCache } from './cache';

describe('Cache module', () => {
  it('works',
    () => {
      writeCache(storage, 'test1', 'Hello!');

      const { error, value } = readCache(storage, 'test1');

      expect(error).to.equal(undefined);
      expect(value).to.equal('Hello!');
    });
});
