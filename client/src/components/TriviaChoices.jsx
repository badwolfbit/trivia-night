import React from "react";
import ReactDOM from "react-dom";

class TriviaChoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {}

  render() {
    return (
      <div className="row">
        {/* asynchronously await for full data then render */}
        <ul>
          <li>{this.props.choices}</li>
        </ul>
        {console.log(this.props.choices)}
      </div>
    );
  }
}

export default TriviaChoices;
