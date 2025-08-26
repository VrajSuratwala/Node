const express = require("express");
const Category = require("../Models/category");
const Product = require("../Models/product");
const router = express.Router();

// Dashboard
router.get("/dashboard", (req, res) => {
  res.render("admin/dashboard");
});

// Categories (list all with only _id & name)
router.get("/categories", async (req, res) => {
  const cats = await Category.find({}, "_id name"); // only id & name
  res.render("admin/categories", { cats });
});

// Create category (store only name)
router.post("/categories", async (req, res) => {
  await Category.create({ name: req.body.name }); // no parent
  res.redirect("/admin/categories");
});

// Products
router.get("/products", async (req, res) => {
  const products = await Product.find().populate("category");
  const cats = await Category.find({}, "_id name"); // only id & name
  res.render("admin/products", { products, cats });
});

router.post("/products", async (req, res) => {
  await Product.create({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  });
  res.redirect("/admin/products");
});

module.exports = router;
