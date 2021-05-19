import express from 'express';

import { ensureGoogleAuth } from '../middleware/auth.js';
import {
  register, login, logout, googleLogin, googleLoginSuccess,
} from '../controllers/auth.js';

const router = express.Router();

// Route that handles register user request
router.post('/register', register);

// Route that handles local login request
router.post('/login', login);

// Route that handles google sign in request
router.get('/google', googleLogin);

// Google Sign in redirects to this route on completion
router.get('/google/redirect', ensureGoogleAuth, googleLoginSuccess);

// Route that handles logout request
router.get('/logout', logout);

export default router;
