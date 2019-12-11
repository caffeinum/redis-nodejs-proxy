import * as express from 'express';
import info from './info';
import cached from './cached';

const router = express.Router();
router.get('/', info.get)
router.get('/:key', cached.get)

export default router
