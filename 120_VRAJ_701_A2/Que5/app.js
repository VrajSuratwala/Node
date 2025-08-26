const express=require('express');
const app=express();
const cors=require('cors');
const path = require("path");

require("dotenv").config();

const route=require("./routes/route");
const employeeRoutes = require("./routes/employee");  // your employee.js routes

const PORT=process.env.PORT || 8002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/employees",route);
app.use("/api", employeeRoutes);

app.use(express.static(path.join(__dirname, "static")));


app.listen(PORT,(err)=>{
    console.log(`http://localhost:${PORT}/`);
});

