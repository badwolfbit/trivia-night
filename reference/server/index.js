const express = require("express");
const app = express();

// MongoDB
var MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/";
var mongodb = require("mongodb");

const middleware = require('./routes/middleware-route.js');
const router = require('./routes/index-route.js');
const api = require('./routes/api-route.js');


app.use(middleware);
app.use(api);
app.use(router);

// MongoClient.connect(
//   url,
//   {
//     poolSize: 20,
//     useNewUrlParser: true
//   },
//   function(err, db) {
//     assert.equal(null, err);
//     mongodb = db;
//   }
// );

// database

// get user wins
app.get("/users", (req, res) => {
  let collection = mongodb.db("trivia").collection("users");
  collection.find({}, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

// save user wins
app.post("/post", (req, res) => {
  let collection = mongodb.db("trivia").collection("users");
  let data = req;

  collection.insert({
    //schema

    // username_id
    username: data.user,
    // users score
    score: data.score,
    // game number
    game_number: data.game_number
  });
});

let port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
