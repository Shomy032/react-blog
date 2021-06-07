import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link , useParams , useRouteMatch } from "react-router-dom";
import './CSS/Footer.css'

function Footer() {
  const [loger, setLoger] = useState(false); // todo : make this use context


  return (
    <div className='footer'>

        <img src="./favicon.ico" alt="logo" />       {/* just testing logo */}    

        <div className='contentLinks'>
       {/* e.g   /blogs , /all , /query */}
        </div>
  
        <div className='authLinks'>
        {!loger && <Link className='link' to="/login">Login</Link> }
        {!loger && <Link className='link' to="/register">Register</Link>}
        {loger && <Link className='link' to="/logout">Logout</Link>}
        </div>

    </div>
  );
}

export default Footer;
