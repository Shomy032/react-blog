import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link , useParams , useRouteMatch } from "react-router-dom";

function Footer() {
  const [value, setValue] = useState(false);

  function login(x) {
    if (value) return null;
    console.log(x);
    return x;
  }

  return (
    <>
      <div
        className="footer"
        style={{
          display: "flex",
          height: 40,
          width: "100%",
          backgroundColor: "red",
        }}
      >
        <img src="./favicon.ico" alt="logo" />
        {!value && <button onClick={() => login("login")}>Login</button>}
        {!value && (
          <button onClick={() => console.log("Register")}>Register</button>
        )}
        {value && <button onClick={() => console.log("Logout")}>Logout</button>}
      </div>
    </>
  );
}

export default Footer;
