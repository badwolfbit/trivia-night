const express = require("express");
const axios = require("axios");
const parser = require("body-parser");
const cors = require("cors")
const app = express();

app.use(cors())
app.use(express.static(__dirname + "/../client/dist"));
app.use(parser.json());

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

let port = 4000;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});