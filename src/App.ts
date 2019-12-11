import * as express from 'express';
import { getAsync } from './redis';
import storage, { readCache, writeCache } from './cache';

import routes from './routes';

class App {
  public express = express();

  constructor() {
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.express.use('/', routes);
  }
}

export default new App().express;
