const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { RedisStore } = require('connect-redis');
const redisClient = require('./redisclient');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./static'));

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  })
);

app.get('/', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome ${req.session.user.email} <br><a href="/logout">Logout</a>`);
  } else {
    res.sendFile(path.join(__dirname, 'static', 'login.html'));
  }
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  if (email) {
    req.session.user = { email };
    res.send(`Login Successful! <a href="/">Home</a>`);
  } else {
    res.send('Invalid credentials. <a href="/">Try again</a>');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
