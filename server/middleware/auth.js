import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Verify the request is coming from an authenticated client.
 * @param req the http request
 * @param res the http response
 * @param next callback to next middleware to be called
 */
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(400).json({ message: 'User is not authenticated' });
};

/**
 * Authentication middleware to check if Google Sign In was successful after
 * Google redirects back to server API.
 */
export const ensureGoogleAuth = passport.authenticate('google', {
  failureRedirect: `${process.env.ORIGIN}/login?loginFailed=true`,
});
