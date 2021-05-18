/* eslint-disable no-unused-vars */
import bcrypt from 'bcryptjs';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth20';
import dotenv from 'dotenv';

import User from '../models/user.js';

dotenv.config();
const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

export default (passport) => {
  // Local strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // eslint-disable-next-line consistent-return
    User.findOne({ email }, (err, user) => {
      if (err) {
        throw err;
      } else if (!user) {
        return done(null, false);
      } else {
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) throw error;
          if (result === true) {
            return done(null, user);
          }
          return done(null, false);
        });
      }
    });
  }));

  // TODO: finish this strategy
  // Google strategy
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/redirect',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(JSON.stringify(profile));
      // User.findOrCreate({ googleId: profile.id }, (err, user) => cb(err, user));
      // check user table for anyone with a facebook ID of profile.id
      // eslint-disable-next-line consistent-return
      User.findOne({ 'google.id': profile.id }, (err, user) => {
        if (err) {
          console.log('error', err);
          return done(err);
        }
        // eslint-disable-next-line max-len
        // No user was found, create a new user with values from Facebook (all the profile. stuff)
        if (!user) {
          console.log('creating new google user');
          const newUser = new User({
            // name: profile.displayName,
            fullName: 'google name',
            // email: profile.emails[0].value,
            email: 'google email',
            // username: profile.username,
            provider: 'google',
            // now in the future searching on User.findOne({'facebook.id': profile.id },
            // will match because of this next line
            // eslint-disable-next-line no-underscore-dangle
            google: profile._json,
          });
          newUser.save((error) => {
            if (error) console.log('error creating user', error);
            console.log('new user created');
            return done(err, newUser);
          });
        } else {
          console.log('found google user', user);
          // found user. Return
          return done(err, user);
        }
      });
    },
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInfo = {
        fullName: user.fullName,
        email: user.email,
      };
      done(err, userInfo);
    });
  });
};
