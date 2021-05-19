import bcrypt from 'bcryptjs';
import passport from 'passport';
import querystring from 'querystring';
import User from '../models/user.js';

/**
 * Register a new user and initiate client session using local strategy.
 * @param req the http request
 * @param res the http response
 */
export const register = async (req, res) => {
  User.findOne({ email: req.body.email }, async (err, docFound) => {
    if (err) {
      throw err;
    } else if (docFound) {
      res.status(400).json({ message: 'User already exists' });
    } else if (!docFound) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      req.login(newUser, () => {
        res.status(200).json({ message: 'Successfully Authenticated', user: newUser });
      });
    }
  });
};

/**
 * Login the client using local authentication and initiate a session.
 * @param req the http request
 * @param res the http response
 * @param next the next middleware function to be executed
 */
export const login = async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) throw err;

    // check if user authenticated successfully
    if (!user) {
      res.status(404).json({ message: 'User does not exist' });
    } else {
      // if success, login the user
      req.login(user, (error) => {
        if (error) throw error;
        console.log('Successfully authenticated:\n', user);
        res.status(200).json({ message: 'Successfully Authenicated', user });
      });
    }
  })(req, res, next);
};

/**
 * Login the client using Google authentication and initiate a session.
 * @param req the http request
 * @param res the http response
 */
// eslint-disable-next-line no-unused-vars
export const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleLoginSuccess = (req, res) => {
  // https://stackoverflow.com/a/19038048
  const query = querystring.stringify({ signedIn: true });
  res.redirect(`http://localhost:3000?${query}`);
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
