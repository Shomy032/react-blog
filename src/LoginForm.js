import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./CSS/LoginForm.css";

// removed
// import PlaceholderLoading from "react-placeholder-loading";
// <PlaceholderLoading shape="circle" width={60} height={60} colorStart="" colorEnd="" />

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
// examle at and of file

const LoginForm = ({ setReset }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  // move this po parent , and pass setRedirect here ;
  const [redirect, setRedirect] = useState(false);

  const passwd = useRef(null);
  const [showPasswordState, setShowPasswordState] = useState(true);

  const URL = "";

  function handleSubmitLogin(event) {
    event.preventDefault();
    setLoading(true);
    if (email && password) {
      fetch(URL, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => {
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
            setErr(false);
            setRedirect(true);
          } else {
            throw new Error("error with response , login not accepted");
          }
        })
        .catch((err) => {
          setErr(true);
          console.log(err);
        });
    } else {
      setErr(true);
    }
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleStateForReset = () => {
    setReset(true);
  };

  const showPassword = () => {
    setShowPasswordState(!showPasswordState);

    if (showPasswordState) {
      passwd.current.type = "text";
    } else {
      passwd.current.type = "password";
    }
  };

  return loading ? (
    <Loader
      type="Puff"
      color="#00BFFF"
      width={60}
      height={60}
    />
  ) : (
    <div className="LoginForm">
      <form onSubmit={handleSubmitLogin}>
        <label>
          Email :
          <input
            className="emailInput"
            value={email}
            onChange={handleChangeEmail}
            name="email"
            type="text"
            placeholder="enter your email..."
          />
        </label>
        <label>
          Password :
          <input
            ref={passwd}
            className="passwordInput"
            value={password}
            onChange={handleChangePassword}
            name="password"
            type="password"
            placeholder="enter your password..."
          />
          <i class="fas fa-eye-slash" onClick={showPassword}></i>
        </label>
        {err && (
          <p className="loginError">invalid credentials , please try again</p>
        )}
        <p className="linkToResetPassword" onClick={handleStateForReset}>
          forget your password?
        </p>
        <button
          className="submitButton"
          type="submit"
          onClick={handleSubmitLogin}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;


// <Loader
//         type="Puff"
//         color="#00BFFF"
//         height={100}
//         width={100}
//         timeout={3000} //3 secs
//       />