import * as express from 'express';
import redisClient, { getAsync } from './redis';
import { readCache, writeCache } from './cache';

class App {
  public express = express();

  constructor() {
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();

    router.get('/:key', async (req, res) => {
      const { key } = req.params;

      let { error, value } = readCache(key);

      if (error) {
        value = await getAsync(key);
      }

      writeCache(key, value);

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
        message: "Send a key to /:key",
      });
    });

    this.express.use('/', router);
  }
}

export default new App().express;
