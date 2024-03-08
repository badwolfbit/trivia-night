import React from "react";
import ReactDOM from "react-dom";

class TriviaChoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div className="row">
        {this.props.options
          ? this.props.options.map((choice, i) => (
              <button
                type="button"
                className={`btn ${this.props.btn_color} btn-lg btn-block`}
                key={i}
                onClick={e => this.props.chosen(e, i)}
                data-choice={choice}
              >
                {choice}
              </button>
            ))
          : "loading..."}
        {this.props.options ? console.log(this.props.options) : null}
      </div>
    );
  }
}

export default TriviaChoices;
