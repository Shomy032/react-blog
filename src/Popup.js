import React, { useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./CSS/Popup.css";
import LoginForm from "./LoginForm.js";
import RegisterForm from "./RegisterForm.js";
import ResetPassword from "./ResetPassword.js";
import Finish from "./Finish.js"

function Popup({ setPopup }) {
  // TODO  PASS THIS setPopup , to login and register button in header

  // switch between login and register
  // if false display register page , if true display login page
  const [loginPopup, setLoginPopup] = useState(false);
  const [reset, setReset] = useState(false);
  const [redirectToFinish , setRedirectToFinish] = useState(false);

  const handleClick = () => {
    console.log("click");
    setPopup(false);
  };

  const goBack = () => {
    setReset(false);
    setLoginPopup(true);
  };

  const handleReset = () => {
    setReset(true)
  }


  const stateMenager = () => {

  if(redirectToFinish){
    return <Finish /> ;
  } else {
    if (reset) {
      return (
        <>
          <ResetPassword />
          <button onClick={goBack}>go back</button>
        </>
      );
    } else {
      return loginPopup ? (
        <div>
          <LoginForm  setRedirectToFinish={setRedirectToFinish} />
          <p className="link" onClick={() => setLoginPopup(!loginPopup)}>
            Dont have account , click here to register
          </p>
          <p className="linkToResetPassword" onClick={() =>  setReset(true) }>
          forget your password?
        </p>
        </div>
      ) : (
        <>
          <RegisterForm />
          <p className="link" onClick={() => setLoginPopup(!loginPopup)}>
            Alredy have account, click here to login
          </p>
        </>
      );
    }
  }
    




  };
 // const [redirectToFinish , setRedirectToFinish] = useState(false);
  // Popup is wraper  and real is real thing with full form
  // Popap need to capture all clicks and dont alow it to pass through
  return (
    <div className="Popup">
      <div className="real">
        
        <h2 className="btnX" onClick={handleClick}>X</h2>

        {/* return some jsx based on state logic */}
        {stateMenager()}
      </div>
    </div>
  );
}

export default Popup;
