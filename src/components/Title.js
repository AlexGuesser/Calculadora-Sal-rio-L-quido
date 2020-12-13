import React, { Component } from "react";
import css from "../css/title.module.css";

export default class Title extends Component {
  render() {
    return (
      <div className={css.title}>
        <h2>React Salário</h2>
      </div>
    );
  }
}
