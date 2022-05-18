/**
 * Defines handler functions for authentication router.
 */

import bcrypt from 'bcryptjs';
import passport from 'passport';
import querystring from 'querystring';
import dotenv from 'dotenv';

import User from '../models/user.js';

dotenv.config();

/**
 * Register a new user and initiate client session using local strategy.
 * @param req The HTTP request
 * @param res The HTTP response
 */
export const register = async (req, res) => {
  User.findOne({ email: req.body.email }, async (err, docFound) => {
    if (err) throw err;

    if (docFound) {
      // if user already exists, send 409 CONFLICT
      res.status(409).json({ message: 'User already exists' });
    } else if (!docFound) {
      // if user does not yet exist, create a new user
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();

      // login the newly created user
      req.login(newUser, () => {
        res.status(200).json({ message: 'Successfully authenticated' });
      });
    }
  });
};

/**
 * Login the client using local authentication and initiate a session.
 * @param req The HTTP request
 * @param res The HTTP response
 * @param next The next middleware function to be called
 */
export const login = async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) throw err;

    // check if user authenticated successfully
    if (!user) {
      res.status(404).json({ message: 'User does not exist' });
    } else {
      // if authentication successful, login the user
      req.login(user, (error) => {
        if (error) throw error;
        console.log(`${user.email} authenticated successfully`);
        res.status(200).json({ message: 'Successfully authenticated' });
      });
    }
  })(req, res, next);
};

/**
 * Login the client using Google authentication and initiate a session.
 * @param req The HTTP request
 * @param res the HTTP response
 */
export const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

/**
 * Redirect to the client application on successful Google Sign In.
 * @param req The HTTP request
 * @param res The HTTP response
 */
export const googleLoginSuccess = (req, res) => {
  /* Fareed Alnamrouti, https://stackoverflow.com/users/427622/fareed-alnamrouti,
   * Edited answer to "How do I redirect in expressjs while passing some context?", 23-05-2017,
   * https://stackoverflow.com/a/19038048, CC BY-SA 3.0
   */
  const query = querystring.stringify({ googleSuccess: true });
  res.redirect(`${process.env.CLIENT_ENDPOINT}?${query}`);
};

/**
 * Logout the client connection and end the client session.
 * @param req the http request
 * @param res the http response
 */
export const logout = async (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
};
