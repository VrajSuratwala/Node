const mongoose = require("../config/db");
const bcrypt = require("bcryptjs");

const employeeSchema = new mongoose.Schema({
  empId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true 
  },
  role: {
    type: String,
    enum: ["employee", "admin"],
    default: "employee"
  },
  basicSalary: {
    type: Number,
    required: true,
    default: 0
  },
  hra: {
    type: Number,
    default: 0
  },
  da: {
    type: Number,
    default: 0
  },
  grossSalary: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

employeeSchema.pre("save", async function (next) {
  // Generate empId if not present
  if (!this.empId) {
    const count = await mongoose.model("Employee").countDocuments();
    this.empId = `EMP${(count + 1).toString().padStart(3, "0")}`; 
  }

  this.hra = this.basicSalary * 0.2; // 20% HRA
  this.da = this.basicSalary * 0.1;  // 10% DA
  this.grossSalary = this.basicSalary + this.hra + this.da;

  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

module.exports = mongoose.model("Employee", employeeSchema, "employees");
