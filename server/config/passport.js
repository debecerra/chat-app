import bcrypt from 'bcryptjs';
import passportLocal from 'passport-local';
// import passportGoogle from 'passport-google-oauth20';

import User from '../models/user.js';

const LocalStrategy = passportLocal.Strategy;

export default (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
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
    }),
  );

  passport.serializeUser((user, done) => {
    console.log('serialize', user);
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInfo = {
        fullName: user.fullName,
        email: user.email,
      };
      console.log(user);
      done(err, userInfo);
    });
  });
};
