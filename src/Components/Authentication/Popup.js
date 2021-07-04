import React, { useReducer, useState } from "react";
import "../../CSS/Popup.css";
import LoginForm from "./LoginForm.js";
import RegisterForm from "./RegisterForm.js";
import ResetPassword from "./ResetPassword.js";
import Finish from "./Finish.js"


function formReducer(state , action){
switch(action.type){
case "login":
  return {title : "Login" } ;
case "register":
  return {title : "Register"} ;
case "reset" :
  return {title : "Reset Password"}    
default :
return {title : ""}

}

}

//const ReducerContext = React.createContext([]);
//<ReducerContext.Provider value={[formReducer , dispatch ]}> 
// </ReducerContext.Provider>

function Popup( { setPopup  } ) {
  // TODO  PASS THIS setPopup , to login and register button in header

  // switch between login and register
  // if false display register page , if true display login page
  const [loginPopup, setLoginPopup] = useState(false);
  const [reset, setReset] = useState(false);
  const [redirectToFinish , setRedirectToFinish] = useState(false);
  const [user1 , setUser] = useState("");

const [state , dispatch] = useReducer( formReducer ,  {title : ""})

const [title , setTitle] = useState("Register");


  const handleClick = () => {
   // console.log("click");
    setPopup(false);
  };

  // const goBack = () => {
  //   setReset(false);
  //   setLoginPopup(true);
  //   dispatch({ type: "login" })
  // };

  const handleReset = () => {
    setReset(true)
    dispatch({ type: "reset" })
  }


  const stateMenager = () => {

          

  if(redirectToFinish){
    return <Finish user={user1} /> ;
  } 
  else {
    if (reset) {
      // setTitle("Reset password")
    //    dispatch({ type: "reset" })
      return (
        <>
          <ResetPassword />
          {/* <button className="goBackButton" onClick={goBack}>go back</button> */}
        </>
      );
    } else {
      
      // dispatch({ type: "login" })
      return loginPopup ? (
        <>
          <LoginForm dispatch={dispatch} setRedirectToFinish={setRedirectToFinish} setUser={setUser}/>
          <div className="liksAuthSwitch">
          <p className="link" onClick={() =>{
           dispatch({type : "register"})   
          return setLoginPopup(!loginPopup)
          } }>
            Dont have account , click here to register
          </p>
          <p className="linkToResetPassword" onClick={() =>{
          dispatch({type : "reset"})
            return setReset(true) ;
          } }>
          forget your password?
        </p>
        </div>
        </>
      ) : (
        <>
          <RegisterForm  dispatchPopup={dispatch} setRedirectToFinish={setRedirectToFinish} setUser={setUser} />
          <div className='liksAuthSwitch'>
          <p className="link" onClick={() =>{
      dispatch({type : "login"}) 
      return setLoginPopup(!loginPopup)}
          } 
            >
            Alredy have account, click here to login 
          </p>
          </div>
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
        <h2 className="formTitle" >{state.title}</h2>
        <h2 className="btnX" onClick={handleClick}>X</h2>

        {/* return some jsx based on state logic */}
        {stateMenager()}
      </div>
    </div>
  );
}

export default Popup;
