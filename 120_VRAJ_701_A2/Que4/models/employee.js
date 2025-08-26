const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
  empId: { type: String, unique: true, index: true }, // e.g., EMP0001
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ['admin', 'employee'], default: 'employee' },

  // Salary inputs
  baseSalary: { type: Number, required: true, min: 0 },
  hraPercent: { type: Number, default: 20 }, // House Rent Allowance
  daPercent: { type: Number, default: 10 },  // Dearness Allowance
  deductions: { type: Number, default: 0 },
}, { timestamps: true });

// Virtuals for salary:
employeeSchema.virtual('hra').get(function () {
  return Math.round((this.baseSalary * (this.hraPercent || 0)) / 100);
});
employeeSchema.virtual('da').get(function () {
  return Math.round((this.baseSalary * (this.daPercent || 0)) / 100);
});
employeeSchema.virtual('gross').get(function () {
  return (this.baseSalary || 0) + (this.hra || 0) + (this.da || 0);
});
employeeSchema.virtual('net').get(function () {
  return (this.gross || 0) - (this.deductions || 0);
});

// Hash password if modified:
employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(String(this.password), 10);
  next();
});

// Instance helper:
employeeSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(String(plain), this.password);
};

module.exports = mongoose.model('Employee', employeeSchema, 'employess');

