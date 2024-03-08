const path = require('path');
const axios = require('axios');

const {multipleChoice} = require('./../util/multiple-choice.js')

exports.api = (req,res) => {
  axios.get(`https://opentdb.com/api.php?amount=1`)
  .then(response => {
    let API_data = response.data.results[0];
    trivia_data = multipleChoice(API_data)
    res.send(trivia_data)
  })
  .catch((err) => {
    res.send(err)
  });
}