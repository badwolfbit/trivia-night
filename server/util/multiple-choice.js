const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

// call shuffle function to randomize choices

const {shuffle} = require('./../util/shuffle.js');

multipleChoice = (API_data) => {
      let output = {};

      // direct deposit
      output.category = API_data.category;
      output.type = API_data.type;
      output.difficulty = API_data.difficulty;
      output.question = entities.decode(API_data.question);
      output.correct_answer = entities.decode(API_data.correct_answer);

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
        output.choices = ["True", "False"];
      }
      return output
};

module.exports = {multipleChoice}