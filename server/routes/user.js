import express from 'express';

import { getUser } from '../controllers/user.js';

const router = express.Router();

// handle GET route for /user
router.get('/', getUser);

export default router;
