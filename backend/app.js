const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');

const app = express();

mongoose.connect('mongodb+srv://pathak_a:GJ55xHltwgxtgORC@cluster0-izck3.mongodb.net/node-angular?retryWrites=true&w=majority',
                  { useNewUrlParser: true,  useUnifiedTopology: true })
.then(() => {
  console.log('Connected to the Database!');
})
.catch(() => {
  console.log('Connection to the Database was unsuccessful');
}) ;

app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


app.use('/api/posts', postRoutes);
module.exports = app;
