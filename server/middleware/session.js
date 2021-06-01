import session from 'express-session';
import MongoStore from 'connect-mongo';

const sessionStore = MongoStore.create({
  mongoUrl: process.env.DB_CONNECTION_URL,
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
});

export default sessionMiddleware;
