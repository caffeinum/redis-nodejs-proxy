import 'mocha';
import { expect } from 'chai';
import { writeCache, readCache } from './cache';

describe('Cache module', () => {
  it('works',
    () => {
      writeCache('test1', 'Hello!');

      const { error, value } = readCache('test1');

      expect(error).to.equal(undefined);
      expect(value).to.equal('Hello!');
    }
  );
});
