import 'mocha';
import { expect } from 'chai';
import { createCacheStorage, writeCache, readCache } from './cache';

const storage = createCacheStorage({
  CACHE_CAPACITY: 3,
  CACHE_EXPIRY_TIME: 300,
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Cache module', () => {
  it('works', () => {
    writeCache(storage, 'test', 'Hello!');

    const { error, value } = readCache(storage, 'test');

    expect(error).to.equal(undefined);
    expect(value).to.equal('Hello!');
  });

  it('clears least recently used', () => {
    writeCache(storage, 'test1', 'Hello One!');
    writeCache(storage, 'test2', 'Hello Two!');
    writeCache(storage, 'test3', 'Hello Three!');
    writeCache(storage, 'test4', 'Hello Four!');
    writeCache(storage, 'test5', 'Hello Five!');

    const { error: error1, value: test1_value } = readCache(storage, 'test1');
    const { error: error2, value: test2_value } = readCache(storage, 'test2');
    const { error: error3, value: test3_value } = readCache(storage, 'test3');
    const { error: error4, value: test4_value } = readCache(storage, 'test4');
    const { error: error5, value: test5_value } = readCache(storage, 'test5');

    expect(test1_value).to.equal(undefined);
    expect(test2_value).to.equal(undefined);
    expect(test3_value).to.not.equal(undefined);
    expect(test4_value).to.not.equal(undefined);
    expect(test5_value).to.not.equal(undefined);

    expect(error1).to.equal('CACHE_MISS');
    expect(error2).to.equal('CACHE_MISS');
    expect(error3).to.equal(undefined);
    expect(error4).to.equal(undefined);
    expect(error5).to.equal(undefined);
  });

  it('cache expires', async () => {
    writeCache(storage, 'forgotten-key', 'Should expire');

    await sleep(300);

    const { error, value } = readCache(storage, 'forgotten-key');

    expect(error).to.equal('CACHE_EXPIRED');
    expect(value).to.equal(undefined);
  })
});
