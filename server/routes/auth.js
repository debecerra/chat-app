import express from 'express';
import {
  register, login, googleLogin, logout,
} from '../controllers/auth.js';

const router = express.Router();

// handle register route
router.post('/register', register);

// handle login route
router.post('/login', login);

// handle google login route
router.post('/login/google', googleLogin);

// handle logout route
router.get('/logout', logout);

export default router;
