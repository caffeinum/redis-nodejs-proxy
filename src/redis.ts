import * as redis from 'redis';
import { promisify } from 'util';

const host = process.env.REDIS_ADDR || '127.0.0.1';
const port = process.env.REDIS_PORT || 6379;

export const client = redis.createClient(Number(port), host);
export const getAsync = promisify(client.get).bind(client);

export default client
