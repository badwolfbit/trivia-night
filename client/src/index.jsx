import React, { Suspense, Fragment } from "react";
import ReactDOM from "react-dom";
import TriviaQuestion from "./components/TriviaQuestion.jsx";
import TriviaChoices from "./components/TriviaChoices.jsx";
import Players from "./components/Players.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      category: "",
      type: "",
      difficulty: "",
      incorrect_answers: "",
      correct_answer: ""
      // randomized_choices: ""
    };
    this.getData = this.getData.bind(this);
    // this.handleQuestions = this.handleQuestions.bind(this);
  }
  componentDidMount() {
    this.getData();
    // this.handleQuestions();
  }

  getData() {
    // API Request
    axios
      .get(`https://opentdb.com/api.php?amount=1`)
      .then(response => {
        let API_data = response.data.results[0];
        console.log(response.data.results);
        // refactor this later
        let API_category = API_data.category;
        let API_question = API_data.question;
        let API_type = API_data.type;
        let API_difficulty = API_data.difficulty;
        let API_answer = API_data.correct_answer;
        let API_incorrect_answers = API_data.incorrect_answers; //returns an array of incorrect suggestions
        console.log(API_incorrect_answers);
        console.log(API_answer);
        let interviewQ = [];

        if (API_type === "multiple") {
          let randomize = [];
          // take all answers
          randomize.push(API_answer);
          API_incorrect_answers.forEach(answer => {
            randomize.push(answer);
            // console.log(answer)
          });

          var shuffle = function(array) {
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
          let full_randomized = shuffle(randomize);

          this.setState({ randomized_choices: full_randomized });
        } else if (API_type === "boolean") {
          this.setState({ randomized_choices: ["true", "false"] });
        }

        let API_question_quoteOmit = API_question.replace(/&quot;/g, '"'); //factoring out &quote; statements to be ""
        this.setState({
          question: API_question_quoteOmit,
          category: API_category,
          type: API_type,
          difficulty: API_difficulty,
          incorrect_answers: API_incorrect_answers, //returns an array of incorrect suggestions
          correct_answer: API_answer
        });
      })
      .catch(err => console.log(err));
  }

  // handleQuestions() {
  //   // output array
  //   let output = [];

  //   // if multiple choice
  //   if (this.state.type === "multiple") {
  //     let randomize = [];
  //     // take all answers
  //     randomize.push(this.state.API_answer);
  //     this.state.incorrect_answers.forEach(answer => {
  //       randomize.push(answer);
  //       // console.log(answer)
  //     });
  //     this.setState({ randomized_choices: randomize });

  // #############################################################################
  // var shuffle = function(array) {
  //   var currentIndex = array.length;
  //   var temporaryValue, randomIndex;

  //   while (0 !== currentIndex) {
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;

  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }
  //   return array;
  // };
  // #############################################################################

  // randomize then
  // let randomized_choices = shuffle(randomize);
  // push them to output array & return
  // randomized_choices.forEach((rando_answer) => {output.push(rando_answer)})
  // randomized.forEach((rando_answer) => {
  //   output.push(rando_answer)
  // })
  // } else if (this.state.type === "boolean") {
  //   this.setState({ randomized_choices: ["true", "false"] });
  // }

  // if boolean choice
  // push "true" or "false" in output array & return
  // }

  render() {
    return (
      <Fragment>
        {/* {console.log("Choices:", this.state.randomized_choices)} */}
        {/* {console.log(this.state.type)} */}
        <div className="title-bar navbar navbar-dark bg-dark shadow-sm">
          <h3>trivia</h3>
        </div>
        <div className="main">
          <section className="jumbotron text-center trivia-field">
            <div className="container">
              <div className="jumbotron-heading">
                <TriviaQuestion main_question={this.state.question} />
              </div>

              <div className="options">
                <TriviaChoices choices={this.state.randomized_choices} />
                {/* <ul>
              <li>{this.state.randomized_choices[0]}</li>
              <li>{this.state.randomized_choices[1]}</li>
              <li>{this.state.randomized_choices[2]}</li>
              <li>{this.state.randomized_choices[3]}</li>
            </ul> */}
              </div>
            </div>
          </section>
          <div className="container">
            <Players />
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            {/* <div>
            <ul>
              {this.state.randomized_choices.map(item => (
                <li>{item}</li>
              ))}
            </ul>
          </div> */}
          </Suspense>
        </div>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("trivia"));
