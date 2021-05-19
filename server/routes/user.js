import express from 'express';

import { getUser } from '../controllers/user.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// handle GET route for /user
router.get('/', ensureAuthenticated, getUser);

export default router;
