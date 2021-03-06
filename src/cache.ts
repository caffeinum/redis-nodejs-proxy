
// number of keys stored
const CACHE_CAPACITY = Number(process.env.CACHE_CAPACITY || 1e5);

// env variable in seconds, local in milliseconds
const CACHE_EXPIRY_TIME = Number(process.env.CACHE_EXPIRY_TIME || 3600) * 1000;

const unique_ordered_key = (() => {
  let id = Date.now()
  // let id = 0
  return () => id++
})();

const DEFAULT_CONFIG: CacheConfig = {
  CACHE_EXPIRY_TIME,
  CACHE_CAPACITY,
};

interface CacheConfig {
  CACHE_CAPACITY: number,
  CACHE_EXPIRY_TIME: number,
}

// 'test_key': { value: 'test', ts: Date.now(), pk: 1 },
interface CacheEntry {
  // last access timestamp
  ts: number;
  // ordered access key
  pk: number;

  value: any;
}

interface Cache {
  [key: string]: CacheEntry;
}

interface CacheStorage {
  cache: Cache;
  config: CacheConfig;
}

export const createCacheStorage: (config?: any) => CacheStorage = (config = {}) => ({
  cache: {},
  config: {
    ...DEFAULT_CONFIG,
    ...config,
  },
});

export const globalStorage = createCacheStorage();

export const clearLRU = (storage: CacheStorage, shouldFreeSlots: number = 0) => {
  const { cache, config: { CACHE_CAPACITY }} = storage;

  if (Object.keys(cache).length < CACHE_CAPACITY) {
    return;
  }

  // TODO: this is an example, too slow, O(n * log n)
  // sort from the most recent to the oldest
  // remove the tail after the first N entries

  const lastIndex = CACHE_CAPACITY - 1 - shouldFreeSlots;
  //      [0, 1, 2,  X   ] \ [ 3, 4, 5, ... ]
  //             |    |          capacity = 4
  // last_index = 2  free 1 slot
  //

  Object.keys(cache)
    .sort((key1, key2) => cache[key2].pk - cache[key1].pk)
    // .map(key => {
    //   console.log('have key', key, cache[key].ts);
    //   return key
    // })
    .filter((_key, index) => index > lastIndex)
    // .map(key => {
    //   console.log('will delete', key);
    //
    //   return key
    // })
    .map((key) => (delete cache[key]));
};

export const clearExpired = (storage: CacheStorage) => {
  const { cache, config: { CACHE_EXPIRY_TIME } } = storage;
  // TODO: too slow, O(n)
  // a bit faster if we have had a sorted list
  // in which we would search for the first NOT expired
  // and then delete all after him
  //
  // Object.keys(cache)
  //  .sort((key1, key2) => cache[key2].ts - cache[key1].ts)

  Object.keys(cache)
    .filter((key) => cache[key].ts + CACHE_EXPIRY_TIME < Date.now())
    .map((key) => (delete cache[key]));
};

export const writeCache = (storage: CacheStorage, key: string, value: any) => {
  const { cache } = storage;

  clearLRU(storage, 1);

  // console.log('write', key)

  cache[key] = { ts: Date.now(), pk: unique_ordered_key(), value };

  // we can also check that AFTER writing
  // clearLRU(0);
};

export const readCache = (storage: CacheStorage, key: string) => {
  const { cache, config: { CACHE_EXPIRY_TIME } } = storage;

  if (!cache[key]) {
    return { error: 'CACHE_MISS' };
  }

  const { ts, value } = cache[key];

  if (ts + CACHE_EXPIRY_TIME < Date.now()) {
    clearExpired(storage);
    return { error: 'CACHE_EXPIRED' };
  }

  return { value };
};

export default globalStorage;
