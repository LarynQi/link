import React from "react";
import "./App.css";
import { useState } from "react";

class NameInput extends React.Component {
  constructor(props) {
    this.state = {
      inputNum: props.num,
      names: [{ name: "" }]
    };
  }
  fillNames() {
    for (var i = 0; i < this.state.inputNum; i++) {
      this.state.names.push(<input type="text" />);
    }
  }

  render() {
    return (
      this.fillNames(),
      (
        <div>
          {this.state.names.map((name) => (
            <li>{name}</li>
          ))}
        </div>
      )
    );
  }
}
