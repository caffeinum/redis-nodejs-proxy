import * as express from 'express';
import redisClient, { getAsync } from './redis';

class App {
  public express = express();

  constructor() {
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();

    router.get('/:key', async (req, res) => {
      const { key } = req.params;

      const value = await getAsync(key);

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
