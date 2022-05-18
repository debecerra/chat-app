/**
 * Defines Router for user routes.
 */

import express from 'express';

import { getUser } from '../controllers/users.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// handle GET route for /user
router.get('/', ensureAuthenticated, getUser);

export default router;
