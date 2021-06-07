import React, { useState, useRef } from "react";

import './CSS/Auth.css'
// hard coded for testing
const path = "auth/register";
const port = "4002";
// let token = "test-token";

function Auth() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState(false); 

  let bodyTest = { username: user, password: pass, email: email ? email : "" };

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:${port}/${path}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json", // also cookie is active too , need to disable one
       // Authorization: `Bearer ${token || "no token"}`, // this is here for now , maybe we will go with cookie
      },
      body: JSON.stringify(bodyTest),
    })
      .then((res) => {

        if (res.ok) {
          return res.json()
        } else {
          throw new Error('bad response') // for now , todo : check what is wrong and display err in UI
        }})
      .then((data) => {
        setError(false)
        console.log(data) // remove later
      })
      .catch((err) => {
        // console.log('seting err to true')
        // console.log(err)
        setError(true)
      } );
  }

  function handleChangeUser(event) {
    setUser(event.target.value);
  }
  function handleChangePassword(event) {
    setPass(event.target.value);
  }
  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  return (
    <div className="Auth">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          autoComplete="off"
          value={user}
          onChange={handleChangeUser}
        />
      {error && <span>{"there is err"}</span>} {/* hard coded for now */}
        <input
          type="password"
          name="password"
          autoComplete="off"
          value={pass}
          onChange={handleChangePassword}
        />
        {error && <span>{"there is err"}</span>} {/* hard coded for now */}
        {true && ( // todo : make this use context , or move it to username input
          <input
            type="text"
            name="email"
            autoComplete="off"
            value={email || "milosmilic032@gmail.com"}
            onChange={handleChangeEmail}
          />
        )}
        {error && <span>{"there is err"}</span>} {/* hard coded for now */}
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </div>
  );
}

export default Auth;
