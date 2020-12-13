import React, { Component } from "react";
import css from "../css/display.module.css";

export default class Display extends Component {
  render() {
    const { id, value } = this.props;
    return (
      <span>
        <label>{this.props.description}</label>
        <input
          className={css.display}
          type="text"
          id={id}
          readOnly
          value={value}
          style={{ color: this.props.color }}
        />
      </span>
    );
  }
}
