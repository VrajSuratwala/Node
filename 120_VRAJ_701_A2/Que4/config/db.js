const mongoose = require('mongoose');

module.exports = async function connectDB(uri) {
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
  console.log('Mongo connected');
};
