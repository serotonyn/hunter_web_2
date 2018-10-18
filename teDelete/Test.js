import React, { Component } from "react";
import { Input } from "semantic-ui-react";

export default class Test extends Component {
  state = {
    input: ""
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Input onChange={this.handleChange} />
      </div>
    );
  }
}
