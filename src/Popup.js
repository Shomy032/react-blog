import React , { useState } from "react";
 import { Link , Route , Switch } from "react-router-dom";
import './CSS/Popup.css' ;
import LoginForm from "./LoginForm.js";
import RegisterForm from "./RegisterForm.js";

function Popup( { setPopup } ) {

// TODO  PASS THIS setPopup , to login and register button in header

    // switch between login and register
    // if false display register page , if true display login page
   const [ loginPopup , setLoginPopup ] = useState(false);

const handleClick = () => {
console.log('click')
setPopup(false)
}

// Popup is wraper  and real is real thing with full form
// Popap need to capture all clicks and dont alow it to pass through
 return (     
 <div className="Popup">

     <div className="real">
    <h1> Lorin and register page popup here</h1>
    <h2 onClick={handleClick}>X</h2>

     {loginPopup && <LoginForm />}
     {!loginPopup && <RegisterForm />}      
        
    {!loginPopup && <h1 onClick={() => setLoginPopup(!loginPopup)}>Alredy have account, click here to login</h1>}  
   {loginPopup && <h1 onClick={() => setLoginPopup(!loginPopup)}>Dont have account , click here to register</h1>} 
    </div>

     </div>
    )
    
}

export default Popup;