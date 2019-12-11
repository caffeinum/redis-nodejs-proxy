import { RequestHandler } from 'express';
import storage, { readCache, writeCache } from '../cache';
import redis, { getAsync } from '../redis';

// GET /:key
export const get: RequestHandler = async (req, res) => {
  const { key } = req.params;

  let fromCache = true;

  // eslint-disable-next-line
  let { error, value } = readCache(storage, key);

  if (error === 'CACHE_MISS' || error === 'CACHE_EXPIRED') {
    // debug cache error
    value = await getAsync(key);
    fromCache = false;
  }

  if (!value) {
    // TODO: handle
    // unknown error
  } else {
    writeCache(storage, key, value);
  }

  res.json({
    status: 'ok',
    cache: fromCache,
    value,
  });
}

export default {
  get,
}
