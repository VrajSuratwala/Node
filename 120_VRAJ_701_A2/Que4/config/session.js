const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = (mongoUri, secret) =>
  session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 2 }, // 2h
    store: MongoStore.create({ mongoUrl: mongoUri })
  });
