const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, qty: Number }],
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema,"orderss");
