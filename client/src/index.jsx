import React, { Suspense, Fragment, Component } from "react";
import ReactDOM from "react-dom";
import TriviaQuestion from "./components/TriviaQuestion.jsx";
import TriviaChoices from "./components/TriviaChoices.jsx";
import Players from "./components/Players.jsx";
import Highscores from "./components/Highscores.jsx";
import Toggle from "./components/Toggle.jsx";
import axios from "axios";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      category: "",
      type: "",
      difficulty: "",
      incorrect_answers: "",
      correct_answer: "",
      button_color: "btn-light",
      checked: false
    };
    this.getData = this.getData.bind(this);
    this.players_choice = this.players_choice.bind(this);
    this.layout_reset = this.layout_reset.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get(`/question`)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          question: data.question,
          category: data.category,
          type: data.type,
          difficulty: data.difficulty,
          choices: data.choices, //array
          correct_answer: data.correct_answer
        });
      })
      .catch(err => console.error(err));
  }

  handleChange() {
    this.setState({ checked: !this.state.checked });
  }

  players_choice(e) {
    e.preventDefault();
    if (e.target.dataset.choice === this.state.correct_answer) {
      // add points based on difficulty to current player
      // point system (ADD)
      if (this.state.difficulty === "easy") {
        // easy - 200pts
        this.setState({});
      } else if (this.state.difficulty === "medium") {
        // medium - 400pts
        this.setState({});
      } else if (this.state.difficulty === "hard") {
        // hard - 800pts
        this.setState({});
      }
      this.setState({ button_color: "btn-success" });
    } else {
      // negate points based on difficulty to current player
      // point system (NEGATE)
      // easy - 200pts
      // medium - 400pts
      // hard - 800pts
      this.setState({ button_color: "btn-danger" });
    }

    // after click switch to next player && request new question
    setTimeout(() => {
      this.getData(), this.layout_reset();
    }, 1000); //currently changing questions, next is players
  }

  layout_reset() {
    this.setState({
      button_color: "btn-light"
    });
  }

  render() {
    return (
      <Router>
        <Fragment>
          {this.state.checked ? <Highscores /> : null}
          <div className="title-bar navbar navbar-dark bg-dark shadow-sm">
            <h3>.trivia</h3>
            <Toggle onChange={this.handleChange} checked={this.state.checked} />
          </div>
          <div className="main">
            <section className="jumbotron text-center trivia-field">
              <div className="container">
                <div className="jumbotron-heading large-question">
                  <TriviaQuestion main_question={this.state.question} />
                </div>

                <div className="options">
                  <TriviaChoices
                    options={this.state.choices}
                    chosen={this.players_choice}
                    btn_color={this.state.button_color}
                  />
                </div>
                    <Link exact to="/highscores">Highscores</Link>
              </div>
            </section>
          </div>
          <div className="container">
            <Players question_level={this.state.difficulty} />
          </div>
          <Switch>
            <Route path="/highscores" component={Highscores} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("trivia"));
