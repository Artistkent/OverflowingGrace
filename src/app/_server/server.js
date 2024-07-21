const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); 
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


let properties = require('./data.js');

// Endpoint to get properties
app.get('/properties', (req, res) => {
console.log('GET /properties called');
console.log('Returning properties:', properties);
  res.json(properties);
});

// Endpoint to update properties
app.post('/properties', (req, res) => {
  properties = req.body;
  fs.writeFile('./data.js', `module.exports = ${JSON.stringify(properties, null, 2)};`, (err) => {
    if (err) {
      res.status(500).send('Error writing file');
    } else {
      res.status(200).send('File updated successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
