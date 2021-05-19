import passport from 'passport';

export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(400).json({ message: 'User is not authenticated' });
};

export const ensureGoogleAuth = passport.authenticate('google', {
  failureRedirect: 'http://localhost:3000/login?loginFailed=true',
});
