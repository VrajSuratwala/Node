const express = require('express');
const Employee = require('../models/employee');
const { sendWelcomeEmail } = require('../utils/mailer'); // keep using mailer utility

const router = express.Router();

// Middleware to check admin session
function requireAdmin(req, res, next) {
  if (req.session?.user?.role === 'admin') return next();
  return res.redirect('/auth/login');
}

// Utility: generate Employee ID
function generateEmpId() {
  return "EMP" + Math.floor(1000 + Math.random() * 9000);
}

// Utility: generate random temporary password
function generateTempPassword(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

// List employees
router.get('/', requireAdmin, async (req, res) => {
  const employees = await Employee.find().sort({ createdAt: -1 });
  res.render('employees/index', { employees, title: 'Employees' });
});

// Show new employee form
router.get('/new', requireAdmin, (req, res) => {
  res.render('employees/new', { employee: {}, title: 'New Employee' });
});

// Create employee
router.post('/', requireAdmin, async (req, res) => {
  try {
    const empId = generateEmpId();
    const tempPassword = generateTempPassword(); // will be hashed in pre-save

    const emp = new Employee({
      empId,
      name: req.body.name,
      email: req.body.email,
      password: tempPassword,
      role: req.body.role || 'employee',
      baseSalary: Number(req.body.baseSalary || 0),
      hraPercent: Number(req.body.hraPercent || 20),
      daPercent: Number(req.body.daPercent || 10),
      deductions: Number(req.body.deductions || 0),
    });
    await emp.save();

    // Send welcome email with credentials
    await sendWelcomeEmail(process.env, emp.email, {
      name: emp.name,
      empId: emp.empId,
      password: tempPassword,
    });

    res.redirect('/employees');
  } catch (e) {
    console.error(e);
    res.render('employees/new', {
      employee: req.body,
      error: 'Error creating employee',
      title: 'New Employee'
    });
  }
});

// Edit employee form
router.get('/:id/edit', requireAdmin, async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.redirect('/employees');
  res.render('employees/edit', { employee, title: 'Edit Employee' });
});

// Update employee
router.post('/:id', requireAdmin, async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  if (!emp) return res.redirect('/employees');

  emp.name = req.body.name;
  emp.email = req.body.email;
  emp.role = req.body.role || emp.role;
  emp.baseSalary = Number(req.body.baseSalary || 0);
  emp.hraPercent = Number(req.body.hraPercent || 20);
  emp.daPercent = Number(req.body.daPercent || 10);
  emp.deductions = Number(req.body.deductions || 0);

  // If admin provides new password, reset it
  if (req.body.newPassword) emp.password = req.body.newPassword;

  await emp.save();
  res.redirect('/employees');
});

// Delete employee
router.post('/:id/delete', requireAdmin, async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect('/employees');
});

module.exports = router;
