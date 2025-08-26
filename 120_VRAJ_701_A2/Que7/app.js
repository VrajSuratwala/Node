const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

mongoose.connect("mongodb://127.0.0.1:27017/shopDB");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "shopsecret", resave: false, saveUninitialized: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/admin", adminRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => res.redirect("/home"));

app.listen(8000, () => console.log("http://localhost:8000/"));
