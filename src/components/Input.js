import React, { Component } from "react";

export default class Input extends Component {
  handleChange = (event) => {
    if (event.target.value.trim()) {
      this.props.onChange(event.target.value);
    } else {
      this.props.onChange("0");
    }
  };
  render() {
    return (
      <div>
        <label>{this.props.description}</label>
        <input
          autoFocus
          step="100"
          type="number"
          id={this.props.id}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
