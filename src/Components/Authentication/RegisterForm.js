import React, { useState, useReducer } from "react";

import "../../CSS/RegisterForm.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
var Loader2 = require("react-loader");

function reducerRegister(state, action) {
  switch (action.type) {
    case "usernameLength":
      return { error: "username must be over 6 characters long" };
    case "usernameForm":
      return { error: "usernam cant start with number" };
    case "usernameUnique":
      return { error: "sorry that username is not avalible" };
    case "passwordForm":
      return { error: "password must be minimum 6 characters long" };
    case "passwordEqual":
      return { error: "passwords must be the same" };
    case "eamailInvalid":
      return { error: "please enter valid email" };
    case "emailUse":
      return { error: "sorry , that email is alredy in use" };
    default:
      return { error: "there is a error" };
  }
}

function vlidateInput(username, email, password1, password2, dispatch) {
  let result = true;

  const emailTest1 =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (username.length < 6) {
    dispatch({ type: "usernameLength" });
    result = false;
  } else if (typeof username[0] == "number") {
    dispatch({ type: "usernameForm" });
    result = false;
  } else if (password1 !== password2) {
    dispatch({ type: "passwordEqual" });
    result = false;
  } else if (password1.length < 6) {
    dispatch({ type: "passwordForm" });
    result = false;
  } else if (!emailTest1.test(email)) {
    dispatch({ type: "eamailInvalid" });
    result = false;
  }

  return result;
}

const RegisterForm = ({ setRedirectToFinish , dispatchPopup }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  // move this po parent , and pass setRedirect here ;

  const [state, dispatch] = useReducer(reducerRegister, { error: "" });

  const URL = "http://localhost:4002/auth/register";

  function handleSubmitLogin(event) {
    event.preventDefault();
    setLoading(true);

    const check = vlidateInput(
      username,
      email,
      password1,
      password2,
      dispatch,
      setLoading
    );
    console.log(check, "check");
    if (!check) {
      setErr(true);
      setLoading(false);
    } else if (!check) {
      setErr(false);
    } else if (email && password1 && password2 && username) {
      setErr(false);
      fetch(URL, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          username: username,
          email: email,
          password1: password1,
          password2: password2,
        }),
      })
        .then((res) => {
          // console.log("res" , res)
          setLoading(false);
          if (res.ok) {
            setErr(false);
            return res.json();
          } else {
            throw new Error("error with raw response");
          }
        })
        .then((data) => {
          if (data.success === true) {
            dispatchPopup({title : "normal"})
            setErr(false);
            setRedirectToFinish(true);
          } else {
            setRedirectToFinish(false);
            throw new Error("error with response , login not accepted");
          }
        })
        .catch((err) => {
          setErr(true);
          console.log(err);
        });
    } else {
      dispatch({type : 'normal'})
      setErr(true);
      // setLoading(false);
    }
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword1 = (e) => {
    setPassword1(e.target.value);
  };
  const handleChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const options = {
    lines: 13,
    length: 10,
    width: 10,
    radius: 5,
    scale: 1.0,
    corners: 1,
    color: "rgb(111, 36, 141)",
    opacity: 0.25,
    rotate: 0,
    direction: 1,
    speed: 1,
    trail: 60,
    fps: 20,
    zIndex: 2e9,
    top: "50%",
    left: "50%",
    shadow: false,
    hwaccel: false,
    position: "absolute",
  };

  return loading ? (
    <>
      <Loader2 loaded={false} options={options} className="spinner" />
      {/* <Loader type="Puff" color="#00BFFF" width={50} height={50} /> */}
    </>
  ) : (
    <>
      <div className="RegisterForm">
        <form className="formRegister" onSubmit={handleSubmitLogin}>
          <input
            className="emailInput"
            value={email}
            onChange={handleChangeEmail}
            name="email"
            type="text"
            placeholder="enter your email..."
          />

          <input
            className="usernameinput"
            value={username}
            onChange={handleChangeUsername}
            name="username"
            type="text"
            placeholder="enter your username..."
          />

          <input
            className="passwordInput"
            value={password1}
            onChange={handleChangePassword1}
            name="password"
            type="password"
            placeholder="enter your password..."
          />

          <input
            className="passwordInput"
            value={password2}
            onChange={handleChangePassword2}
            name="password"
            type="password"
            placeholder="enter your password again..."
          />

          {err && <p className="loginError">{state.error}</p>}
          <button
            className="submitButton"
            type="submit"
            onClick={handleSubmitLogin}
          >
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
