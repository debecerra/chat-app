import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
// import passportLocal from 'passport-local';
// import passportGoogle from 'passport-google-oauth20';

import passportConfig from './config/passport.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

// initialize app
dotenv.config();
// const passportLocalStrategy = passportLocal.Strategy;
// const passportGoogleStrategy = passportGoogle.Strategy;
const app = express();

// middleware
app.use(bodyParser.urlencoded({
  limit: '30mb',
  extended: true,
}));
app.use(bodyParser.json({
  limit: '30mb',
  extended: true,
}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(cookieParser('secret'));

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

mongoose.connect(
  process.env.DB_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Mongoose is connected'),
);

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

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Root route response
app.get('/', (req, res) => {
  res.send('Welcome to the Chat App API');
});

const PORT = process.env.PORT || 5000;

// Start up the server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
