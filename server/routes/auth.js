import express from 'express';
import passport from 'passport';
import {
  register, login, logout,
} from '../controllers/auth.js';

const router = express.Router();

// handle register route
router.post('/register', register);

// handle login route
router.post('/login', login);

// handle google login route
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/error' }),
  (req, res) => {
    // Successful authentication, redirect success.
    console.log(res, req);
    // TODO: add sign in query to redirect
    res.redirect('http://localhost:3000?signIn=true');
  });

// handle logout route
router.get('/logout', logout);

export default router;
