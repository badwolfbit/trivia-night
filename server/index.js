const express = require("express");
const axios = require("axios");
const parser = require("body-parser");
const cors = require("cors")
var assert = require("assert");
const app = express();

// MongoDB
var MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/";
var mongodb = require("mongodb");

// Middleware
app.use(cors())
app.use(express.static(__dirname + "/../client/dist"));
app.use(parser.json());

MongoClient.connect(
  url,
  {
    poolSize: 20,
    useNewUrlParser: true
  },
  function(err, db) {
    assert.equal(null, err);
    mongodb = db;
  }
);

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});




// database

// get user wins
app.get('/users', (req, res) => {
  let collection = mongodb.db("trivia").collection("users")
  collection.find({}, (err,result) => {
    if(err) console.log(err)
    res.send(result)
  })
});

// save user wins
app.post('/post', (req, res) => {
  let collection = mongodb.db("trivia").collection("users")
  let data = req;

  collection.insert({
    //schema

    // username_id
    username: data.user,
    // users score
    score: data.score,
    // game number
    game_number: data.game_number

  })
})

let port = 4000;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});