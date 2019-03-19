import React from "react";
import ReactDOM from "react-dom";

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: ["orange", "blurple"],
      score: 0
    };
  }
  componentDidMount() {}

  render() {
    return (
        <div className="row justify-content-md-center">
          {this.state.names.map((name, i) => (
            <div className="col-4 card" key={i}>
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Score: {this.state.score}</h6>
              </div>
            </div>
          ))}
        </div>
    );
  }
}

export default Players;
