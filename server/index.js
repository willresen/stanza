const express = require('express');
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 3000;
const db = require('../database/index.js');

app.use(express.json());
app.use(express.static('public'));

app.get('/api/songs', (req, res) => {
  db.retrieve(req.query.id)
    .then(results => res.send(results));
});

app.post('/api/songs', (req, res) => {
  db.insert(req.body)
    .then(result => res.send(result));
});

app.listen(PORT, () => console.log('Listening on port ' + PORT));