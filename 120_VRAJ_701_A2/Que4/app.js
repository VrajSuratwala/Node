const express = require('express');
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./config/db');
const sessionMW = require('./config/session');

require('dotenv').config();
const app = express();

// DB + Session setup as before
connectDB(process.env.MONGODB_URI);
app.use(sessionMW(process.env.MONGODB_URI, process.env.SESSION_SECRET));

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve CSS from your css folder (assuming public/ contains your HTML and css folders)
app.use(express.static(path.join(__dirname, 'public')));

// Serve your login HTML on /auth/login route
app.get('/auth/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'auth', 'login.html'));
});

// Serve your employee pages similarly (adjust as needed)
app.get('/employees/new', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'employee', 'new-edit-list.html'));
});

// Similarly, add other routes for employees if needed (edit, list etc.)
// Or use express.static to serve all files under views as static (not advised for complex apps)

// API and other Express routers
app.use('/auth', require('./routes/auth'));
app.use('/employees', require('./routes/employees'));

// Root redirect - modify if needed
app.get('/', (req, res) => res.redirect('/auth/login'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
