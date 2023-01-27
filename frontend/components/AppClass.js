import React, { useState } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4;

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
};

export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = {
      steps: initialSteps,
      email: initialEmail,
      message: initialMessage,
      index: initialIndex,
      x: 2,
      y: 2,
    };
  }

  addStep = () => {
    this.setState({
      ...this.state,
      steps: this.state.steps + 1,
    });
  };

  goUp = (e) => {
    if (
      this.state.index !== 0 &&
      this.state.index !== 1 &&
      this.state.index !== 2
    ) {
      this.setState({
        ...this.state,
        index: this.state.index - 3,
        steps: this.state.steps + 1,
        y: this.state.y - 1,
        message: "",
      });
    } else {
      this.setState({
        ...this.state,
        message: `You can't go ${e.target.id}`,
      });
    }
  };
  goDown = (e) => {
    if (
      this.state.index !== 6 &&
      this.state.index !== 7 &&
      this.state.index !== 8
    ) {
      this.setState({
        ...this.state,
        index: this.state.index + 3,
        steps: this.state.steps + 1,
        y: this.state.y + 1,
        message: "",
      });
    } else {
      this.setState({
        ...this.state,
        message: `You can't go ${e.target.id}`,
      });
    }
  };

  goLeft = (e) => {
    if (
      this.state.index !== 0 &&
      this.state.index !== 3 &&
      this.state.index !== 6
    ) {
      this.setState({
        ...this.state,
        index: this.state.index - 1,
        steps: this.state.steps + 1,
        x: this.state.x - 1,
        message: "",
      });
    } else {
      this.setState({
        ...this.state,
        message: `You can't go ${e.target.id}`,
      });
    }
  };
  goRight = (e) => {
    if (
      this.state.index !== 2 &&
      this.state.index !== 5 &&
      this.state.index !== 8
    ) {
      this.setState({
        ...this.state,
        index: this.state.index + 1,
        steps: this.state.steps + 1,
        x: this.state.x + 1,
        message: "",
      });
    } else {
      this.setState({
        ...this.state,
        message: `You can't go ${e.target.id}`,
      });
    }
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      email: e.target.value,
    });
  };

  reset = () => {
    this.setState({
      steps: initialSteps,
      message: initialMessage,
      index: initialIndex,
      email: initialEmail,
      x: 2,
      y: 2,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      x: this.state.x,
      y: this.state.y,
      steps: this.state.steps,
      email: this.state.email,
    };
    this.setState({ ...this.state, email: initialEmail });
    if (email !== "") {
      axios
        .post("http://localhost:9000/api/result", dataToSend)
        .then((res) => {
          console.log(res);
          this.setState({ ...this.state, message: res.data.message });
        })
        .catch((err) => {
          if (err) {
            this.setState({ ...this.state, message: err.request.response });
          }
        });
      this.setState({ ...this.state, email: "" });
    } else if (email === "") {
      this.setState({ ...this.state, message: "Ouch: email is required" });
    }
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({this.state.x},{this.state.y})
          </h3>
          <h3 id="steps">
            You moved {this.state.steps}{" "}
            {this.state.steps === 1 ? "time" : "times"}
          </h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div
              key={idx}
              className={`square${idx === this.state.index ? " active" : ""}`}
            >
              {idx === this.state.index ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.goLeft} id="left">
            LEFT
          </button>
          <button onClick={this.goUp} id="up">
            UP
          </button>
          <button onClick={this.goRight} id="right">
            RIGHT
          </button>
          <button onClick={this.goDown} id="down">
            DOWN
          </button>
          <button onClick={this.reset} id="reset">
            reset
          </button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.onChange}
            value={this.state.email}
            id="email"
            type="email"
            placeholder="type email"
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}

//Why would I ever use classes over functional?