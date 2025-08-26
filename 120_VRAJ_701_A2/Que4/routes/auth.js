const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();

// Login (only admin can access admin panel)
router.get('/login', (req, res) => {
  res.render('auth/login', { error: null, title: 'Admin Login' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Employee.findOne({ email, role: 'admin' });
  if (!admin) return res.render('auth/login', { error: 'Invalid credentials', title: 'Admin Login' });

  const ok = await admin.comparePassword();
  if (!ok) return res.render('auth/login', { error: 'Invalid credentials', title: 'Admin Login' });

  req.session.user = { id: admin._id, role: admin.role, name: admin.name };
  res.redirect('/employees');
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
});

module.exports = router;
