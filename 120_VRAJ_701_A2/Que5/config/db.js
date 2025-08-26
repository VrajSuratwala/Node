require('dotenv').config();
const mongoose=require('mongoose');

mongoose.connect(process.env.URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

module.exports=mongoose;