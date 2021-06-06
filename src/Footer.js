import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link , useParams , useRouteMatch } from "react-router-dom";


function Footer() {
  const [loger, setLoger] = useState(false);


  return (
    <div>
      <div
        className="footer"
        style={{
          display: "flex",
          height: 40,
          width: "100%",
          backgroundColor: "red",
          margin: '0 0 1rem 0'
        }}
      >
        <img src="./favicon.ico" alt="logo" />
        {!loger && <Link style={{margin : '0 1rem' , backgroundColor : 'blue'}} to="/login">Login</Link> }
        {!loger && <Link style={{margin : '0 1rem' , backgroundColor : 'blue'}} to="/register">Register</Link>}
        {loger && <Link style={{margin : '0 1rem' , backgroundColor : 'blue'}} to="/logout">Logout</Link>}
      </div>
    </div>
  );
}

export default Footer;
