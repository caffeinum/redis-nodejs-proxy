import * as express from 'express';
import { getAsync } from './redis';
import storage, { readCache, writeCache } from './cache';

class App {
  public express = express();

  constructor() {
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();

    router.get('/:key', async (req, res) => {
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
    });

    router.get('/', async (_req, res) => {
      res.json({
        config: storage.config,
        message: 'Send a key to /:key',
      });
    });

    this.express.use('/', router);
  }
}

export default new App().express;
