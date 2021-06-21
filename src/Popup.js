import React, { useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./CSS/Popup.css";
import LoginForm from "./LoginForm.js";
import RegisterForm from "./RegisterForm.js";
import ResetPassword from "./ResetPassword.js";

function Popup({ setPopup }) {
  // TODO  PASS THIS setPopup , to login and register button in header

  // switch between login and register
  // if false display register page , if true display login page
  const [loginPopup, setLoginPopup] = useState(false);
  const [reset, setReset] = useState(false);

  const handleClick = () => {
    console.log("click");
    setPopup(false);
  };

  const goBack = () => {
    setReset(false);
    setLoginPopup(true);
  };

  const stateMenager = () => {
    if (reset) {
      return (
        <>
          <ResetPassword />
          <button onClick={goBack}>go back</button>
        </>
      );
    } else {
      return loginPopup ? (
        <>
          <LoginForm setReset={setReset} />
          <p onClick={() => setLoginPopup(!loginPopup)}>
            Dont have account , click here to register
          </p>
        </>
      ) : (
        <>
          <RegisterForm />
          <p onClick={() => setLoginPopup(!loginPopup)}>
            Alredy have account, click here to login
          </p>
        </>
      );
    }
  };

  // Popup is wraper  and real is real thing with full form
  // Popap need to capture all clicks and dont alow it to pass through
  return (
    <div className="Popup">
      <div className="real">
        <h1> Login and register page popup here</h1>
        <h2 onClick={handleClick}>X</h2>

        {/* return some jjs based on state logic */}
        {stateMenager()}
      </div>
    </div>
  );
}

export default Popup;
