const express = require('express');
const app = express();

app.use(express.json()); 

app.post('/data', (req, res) => {
  console.log(req.body); 
  res.send('JSON Received!');
});