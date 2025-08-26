const express = require("express");
const User = require("../Models/user");
const Product = require("../Models/product");
const Category = require("../Models/category");
const Order = require("../Models/order");
const bcrypt = require("bcrypt");

const router = express.Router();

// Home page (root) -> show only _id & name
router.get("/", async (req, res) => {
  const cats = await Category.find({}, "_id name"); // only id + name
  res.render("user/home", { cats });
});

// Register
router.get("/register", (req, res) => res.render("user/register"));
router.post("/register", async (req, res) => {
  await User.create(req.body);
  res.redirect("/login");
});

// Login
router.get("/login", (req, res) => res.render("user/login"));
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    req.session.user = user;
    return res.redirect("/home");
  }
  res.send("Invalid login");
});

// Home 
router.get("/home", async (req, res) => {
  const cats = await Category.find({}, "_id name");
  res.render("user/home", { cats });
});

// Show products under category
router.get("/products/:catid", async (req, res) => {
  const products = await Product.find({ category: req.params.catid });
  res.render("user/products", { products });
});

// Cart                              
router.post("/cart/add/:id", (req, res) => {
  if (!req.session.cart) req.session.cart = [];
  req.session.cart.push({ id: req.params.id, qty: 1 });
  res.redirect("/cart");
});

router.get("/cart", async (req, res) => {
  if (!req.session.cart) return res.render("user/cart", { cart: [] });

  let cart = [];
  let total = 0;
  for (let item of req.session.cart) {
    let product = await Product.findById(item.id);
    total += product.price * item.qty;
    cart.push({ product, qty: item.qty });
  }
  res.render("user/cart", { cart, total });
});

// Checkout
router.post("/checkout", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  let total = 0;
  const products = [];
  for (let item of req.session.cart) {
    let product = await Product.findById(item.id);
    total += product.price * item.qty;
    products.push({ product: product._id, qty: item.qty });
  }
  await Order.create({ user: req.session.user._id, products, total });
  req.session.cart = [];
  res.send("Order placed!");
});

module.exports = router;
