import React from "react";
import ReactDOM from "react-dom";


class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: ['orange', 'blurple']

    };

  }
  componentDidMount() {
    
  }

  

  render() {
    return (
      <div className="row">
        <div>
          {this.state.names.map((name) => (
            <li>{name}</li>
          ))}
        </div>
      </div>
    );
  }
}

export default Players;