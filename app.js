const express = require("express");
const axios = require("axios");
const parser = require("body-parser");
const cors = require("cors");
var assert = require("assert");
const path = require("path");
const app = express();

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

// MongoDB
var MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/";
var mongodb = require("mongodb");

// Middleware
app.use(cors());
app.use(parser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/client/dist"));

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

// compression bundle
app.get("*.js", function(req, res, next) {
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  next();
});

// trivia API request & handling
app.get("/question", (req, res) => {
  axios.get(`https://opentdb.com/api.php?amount=1`).then(response => {
    let API_data = response.data.results[0];
    trivia_data = API_formatter(API_data)
    res.send(trivia_data)
  });
});

let API_formatter = function(API_data) {
  let output = {}

  // direct deposit
  output.category = API_data.category
  output.type = API_data.type
  output.difficulty = API_data.difficulty
  output.question = entities.decode(API_data.question)
  output.correct_answer = entities.decode(API_data.correct_answer)


  // choices; multiple & boolean
  if (API_data.type === "multiple") {
    let randomize = [];
    randomize.push(entities.decode(API_data.correct_answer));
    API_data.incorrect_answers.forEach(option => {
      randomize.push(entities.decode(option));
    });
    let full_randomized = shuffle(randomize); //this is an array of strings
    output.choices = full_randomized;
    // store randomized options to array and res.send()
  } else if (API_data.type === "boolean") {
    // store true / false options to array and res.send()
    output.choices = ["True", "False"]
  }
  return output
};

let shuffle = function(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

// other endpoints for react-routers
app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'), (err) => {
    if(err){
      res.status(500).send(err)
    }
  })
})

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
