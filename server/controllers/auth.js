import bcrypt from 'bcryptjs';
import passport from 'passport';
import User from '../models/user.js';

export const register = async (req, res) => {
  console.log('/auth/register hit');
  console.log(req.body);

  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) {
      console.log(err);
    } else if (doc) {
      res.send('User already exists');
      console.log('User already exists');
    } else if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.send('User created');
    }
  });
};

export const login = async (req, res, next) => {
  console.log('/auth/login hit');
  console.log(req.user);

  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.send('No user exists');
    else {
      req.login(user, (error) => {
        if (error) console.log(error);
        res.send('Successfully Authenicated');
        console.log(req.user);
      });
    }
  })(req, res, next);
};

export const googleLogin = async (req, res) => {
  res.send('googleLogin');
};

export const logout = async (req, res) => {
  res.send('logout');
};
