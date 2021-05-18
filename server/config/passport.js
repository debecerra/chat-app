import bcrypt from 'bcryptjs';
import passportLocal from 'passport-local';
// import passportGoogle from 'passport-google-oauth20';

import User from '../models/user.js';

const LocalStrategy = passportLocal.Strategy;
// const GoogleStrategy = passportGoogle.Strategy;

export default (passport) => {
  // define local strategy
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

  // define Google strategy
  // passport.use(new passportGoogleStrategy.Strategy(
  //   {
  //     clientID: 'id',
  //     clientSecret: 'secret',
  //     callbackURL: 'url',
  //     userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
  //   },
  //   (accessToken, refreshToken, profile, cb) => {
  //     User.findOrCreate({ googleId: profile.id }, (err, user) => cb(err, user));
  //   },
  // ));

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
