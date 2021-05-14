import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const LocalStrategy = passportLocal.Strategy;

const strategy = new LocalStrategy((email, password, done) => {
  // eslint-disable-next-line consistent-return
  User.findOne({ email }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      return done(null, false);
    }
    if (user) {
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) throw error;
        if (result === true) {
          return done(null, user);
        }
        return done(null, false);
      });
    }
  });
});

export default strategy;
