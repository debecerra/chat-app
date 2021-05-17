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
        fullName: req.body.fullName,
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

  // eslint-disable-next-line no-unused-vars
  passport.authenticate('local', (err, user, info) => {
    console.log(user);
    if (err) throw err;
    if (!user) res.status(404).json({ message: 'User does not exist' });
    else {
      req.login(user, (error) => {
        if (error) console.log(error);
        console.log('Successfully authenticated:\n', user);
        res.status(200).json({ message: 'Successfully Authenicated', user });
      });
    }
  })(req, res, next);
};

export const googleLogin = async (req, res) => {
  res.send('googleLogin');
};

export const logout = async (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
};
