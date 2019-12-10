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

      // eslint-disable-next-line
      let { error, value } = readCache(storage, key);

      if (error) {
        // debug cache error
        value = await getAsync(key);
      }

      writeCache(storage, key, value);

      if (!value) {
        // TODO: handle
        // unknown error
      }

      res.json({
        status: 'ok',
        value,
      });
    });

    router.get('/', async (_req, res) => {
      res.json({
        message: 'Send a key to /:key',
      });
    });

    this.express.use('/', router);
  }
}

export default new App().express;
