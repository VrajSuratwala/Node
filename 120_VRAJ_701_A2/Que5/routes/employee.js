const express=require('express');
const verifyToken=require('../middleware/auth');
const Employee=require('../models/employee');
const Leave=require('../models/leave');

const router=express.Router();

router.get("/profile",verifyToken,async(req,res)=>{
    const emp=await Employee.findById(req.user.id).select("-password");
     console.log("Employee found:", emp); 
    if (!emp) 
    {
        return res.status(404).json({ message: "Employee not found" });
    }
    res.json(emp);
});

router.post("/apply", verifyToken, async (req, res) => {
    try {
        const { startDate, endDate, reason } = req.body;

        const leave = new Leave({
            employee: req.user.id,
            startDate,
            endDate,
            reason
        });

        await leave.save();
        res.status(201).json({ message: "Leave applied successfully", leave });
    } catch (err) {
        res.status(500).json({ message: "Error applying leave", error: err.message });
    }
});
router.get("/myleaves", verifyToken, async (req, res) => {
    try {
        const leaves = await Leave.find({ employee: req.user.id });
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: "Error fetching leaves", error: err.message });
    }
});

module.exports=router;
