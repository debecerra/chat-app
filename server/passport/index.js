import passport from 'passport';
import LocalStrategy from './localStrategy.js';
import User from '../models/user.js';

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

passport.use(LocalStrategy);

export default passport;
