import { RequestHandler } from 'express';
import storage from '../cache';

export const get: RequestHandler = async (_req, res) => {
  res.json({
    config: storage.config,
    message: 'Send a key to /:key',
  });
};

// POST edit config

export default {
  get,
}
