const express=require("express");
const employee=require("../models/employee");
const bcrypt=require("bcrypt");
const router=express.Router();
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const jwt=require("../libs/token");
const jwtVerify=require("../middleware/auth");

router.post("/register",[
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").notEmpty().withMessage("Password is required"),
    check("role").notEmpty() .notEmpty()
      .withMessage("Role is required")
      .isIn(["employee", "admin", "manager"]) 
      .withMessage("Invalid role selected"),
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    const existing = await employee.findOne({ email: req.body.email });
      if (existing) {
        return res.status(400).json({ message: "Email already registered" });
      }
    const hashedPassword =await bcrypt.hash(req.body.password, 10);
    var e1=new employee({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        role:req.body.role
    });
    e1.save()
        .then((employee)=>{res.status(200).send(employee)})
        .catch((err)=>{res.status(400).send(err)});

});

router.post("/login",[
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").notEmpty().withMessage("Password is required")
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    const emp = await employee.findOne({email:req.body.email});
    if(!emp) {
        return res.status(400).json({message:"Register Yourself"});
    }
    const isvalid=await bcrypt.compare(req.body.password,emp.password);
    if(!isvalid)
    {
        return res.status(400).json({message:"Invalid Email Or Password"});
    }
    const token = jwt.generateToken(emp);

        return res.status(200).json({ 
            message: "Login successful", 
            token
        });
});


module.exports=router;
