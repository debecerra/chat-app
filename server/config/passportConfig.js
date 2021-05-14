import bcrypt from 'bcryptjs';
// import passport from 'passport';
import passportLocal from 'passport-local';

import User from '../models/user.js';

const LocalStrategy = passportLocal.Strategy;

export default (passport) => {
  passport.use(
    new LocalStrategy((email, password, done) => {
      console.log('here1');
      // eslint-disable-next-line consistent-return
      User.findOne({ email }, (err, user) => {
        if (err) {
          throw err;
        } else if (!user) {
          console.log('here');
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

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInfo = {
        email: user.email,
      };
      cb(err, userInfo);
    });
  });
};
