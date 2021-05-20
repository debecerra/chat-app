/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth20';
import dotenv from 'dotenv';

import User from '../models/user.js';

dotenv.config();
const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

export default (passport) => {
  // Local  strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email }, (findError, user) => {
      if (findError) {
        // handle error
        console.error('Error authenticating with Local Strategy:', findError);
        return done(findError);
      }
      if (!user || !user.password) {
        // email not found, or email already in use with Google Sign In
        return done(null, false, { message: 'Email is not registered' });
      }
      // check if login credentials are correct
      bcrypt.compare(password, user.password, (passwordCompError, isMatch) => {
        if (passwordCompError) {
          // handle error
          console.error('Error checking password on Local authentication:', passwordCompError);
          return done(passwordCompError);
        }
        if (isMatch) {
          // successful authentication
          return done(null, user);
        }
        // password was incorrect
        return done(null, false, { message: 'Incorrect password' });
      });
    });
  }));

  // Google strategy
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/redirect',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    (accessToken, refreshToken, profile, done) => {
      // check user collection for anyone with a google ID of profile.id
      User.findOne({ googleId: profile.id }, (findError, user) => {
        if (findError) {
          // handle error
          console.error('Error authenticating with Google strategy:', findError);
          return done(findError);
        }
        if (!user) {
          // no user was found, create a new user with values from Google
          const newUser = new User({
            displayName: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
          newUser.save((createError) => {
            if (createError) console.error('Error creating new user via Google:', createError);
            else console.log('New user created via Google: ', newUser);
            return done(createError, newUser);
          });
        } else {
          // existing user was found
          console.log('Google sign in successful: ', user);
          return done(null, user);
        }
      });
    },
  ));

  // determine data that should be stored in the session cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // retrieves data that was stored in the session
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      // only return the display name and email
      const userInfo = {
        displayName: user.displayName,
        email: user.email,
      };
      done(err, userInfo);
    });
  });
};
