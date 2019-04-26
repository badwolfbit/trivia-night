import React from "react";
import ReactDOM from "react-dom";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <label className="switch">
        <input type="checkbox" onChange={this.props.onChange} />
        <span className="slider round" />
      </label>
    );
  }
}

export default Toggle;