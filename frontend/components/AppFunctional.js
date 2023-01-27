import React, { useState } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);
  const [index, setIndex] = useState(initialIndex);
  const [x, setX] = useState(2);
  const [y, setY] = useState(2);

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();

    const dataToSend = {
      x: x,
      y: y,
      steps: steps,
      email: email,
    };

    setEmail(initialEmail);
    if (4 > x && x > 0 && 4 > y && y > 0 && steps > 0 && email !== "") {
      axios
        .post("http://localhost:9000/api/result", dataToSend)
        .then((res) => {
          setMessage(res.data.message);
        })
        .catch((err) => {
          if (err) {
            setMessage(err.request.response);
          }
        });
    } else if (email === "") {
      setMessage("Ouch: email is required");
    } else {
      setMessage("Ouch: email must be a valid email");
    }
  }

  function reset() {
    setSteps(initialSteps);
    setIndex(initialIndex);
    setMessage(initialMessage);
    setEmail(initialEmail);
    setX(2);
    setY(2);
  }

  const goUp = (evt) => {
    if (index !== 0 && index !== 1 && index !== 2) {
      setIndex(index - 3);
      addStep();
      setY(y - 1);
      setMessage(initialMessage);
    } else {
      setMessage(`You can't go ${evt.target.id}`);
    }
  };

  const goDown = (evt) => {
    if (index !== 6 && index !== 7 && index !== 8) {
      setIndex(index + 3);
      addStep();
      setY(y + 1);
      setMessage(initialMessage);
    } else {
      setMessage(`You can't go ${evt.target.id}`);
    }
  };

  const goLeft = (evt) => {
    if (index !== 0 && index !== 3 && index !== 6) {
      setIndex(index - 1);
      addStep();
      setX(x - 1);
      setMessage(initialMessage);
    } else {
      setMessage(`You can't go ${evt.target.id}`);
    }
  };
  const goRight = (evt) => {
    if (index !== 2 && index !== 5 && index !== 8) {
      setIndex(index + 1);
      addStep();
      setX(x + 1);
      setMessage(initialMessage);
    } else {
      setMessage(`You can't go ${evt.target.id}`);
    }
  };

  const addStep = () => {
    setSteps(steps + 1);
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({x}, {y})
        </h3>
        <h3 id="steps">
          You moved {steps} {steps === 1 ? "time" : "times"}
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={goLeft} id="left">
          LEFT
        </button>
        <button onClick={goUp} id="up">
          UP
        </button>
        <button onClick={goRight} id="right">
          RIGHT
        </button>
        <button onClick={goDown} id="down">
          DOWN
        </button>
        <button onClick={reset} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={email}
          id="email"
          type="email"
          placeholder="type email"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
