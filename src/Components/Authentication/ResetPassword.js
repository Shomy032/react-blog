import React, { useState, useReducer } from "react";
import "../../CSS/ResetPassword.css";
const Loader = require("react-loader");

const errorResetReducer = (state, action) => {
  switch (action.type) {
    case "invalidEmail":
      return {
        error: true,
        errorMessage: "please enter valid email",
        status: false,
        newPassword : false ,
         newPasswordIsAdded : false
      };
    case "emailNotInUse":
      return {
        error: true,
        errorMessage: "please enter valid email",
        status: false,
        newPassword : false ,
         newPasswordIsAdded : false
      };
    case "responseGood":
      return { error: false, errorMessage: "", status: true , newPassword : false , newPasswordIsAdded : false };
    case "invalidCode":
      return {
        error: true,
        errorMessage: "please enter valid code",
        status: false,
        newPassword : false,
         newPasswordIsAdded : false
      };
    case "codeNotMatching":
      return {
        error: true,
        errorMessage: "please enter your code",
        status: false,
        newPassword : false,
         newPasswordIsAdded : false
      };
     case "codeIsGood" :
        return  { error: false, errorMessage: "", status: false , newPassword : true , newPasswordIsAdded : false};
     case "passwordsUnequal" :
        return  { error: true, errorMessage: "passwords must be the same", status: false , newPassword : true , newPasswordIsAdded : false};
    case "shortPassword" :
        return  { error: true, errorMessage: "passwords must be longer then 6 characters", status: false , newPassword : true , newPasswordIsAdded : false };
        case "resetPasswordBadResponse" :
         return { error: true, errorMessage: "there is error , pls try again", status: false , newPassword : true , newPasswordIsAdded : false };  
     case "passwordIsGood" :
         return { error: false, errorMessage: "", status: false , newPassword : false , newPasswordIsAdded : true };   
    default:
      return { error: false, errorMessage: "", status: false , newPassword : false  , newPasswordIsAdded : false};
  }
};

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEamil] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [code, setCode] = useState("");
  const [state, dispatch] = useReducer(errorResetReducer, {
    error: false,
    errorMessage: "",
    status: false,
    newPassword : false
  });

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

  const emailTest2 =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmitEmail = (event) => {
    event.preventDefault();

    const url = "http://localhost:4002/auth/resetemail"; // doesnt exist now
    if (emailTest2.test(email)) {
      setLoading(true);
      fetch(url, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          email: email,
        }),
      })
        .then((res) => {
          if (res.ok) {
            setLoading(false);
            dispatch({ type: "responseGood" });
            return res.json();
          } else {
            throw new Error("res is not ok");
          }
        })
        .then((data) => {
          if (data.success) {
            setLoading(false);
            dispatch({ type: "responseGood" });
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: "emailNotInUse" });
        });
    } else {
      setLoading(false);
      dispatch({ type: "invalidEmail" });
    }
  };

  const handleChangeEmail = (event) => {
    setEamil(event.target.value);
  };

  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const handleSubmitCode = (event) => {
    event.preventDefault();

    const url = "http://localhost:4002/auth/resetcode"; // doesnt exist now

    if (code.length !== 6) {
      setLoading(true);
      fetch(url, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          code: code,
        }),
      })
        .then((res) => {
          if (res.ok) {
            setLoading(false);
            dispatch({ type: "responseGood" });
            return res.json();
          } else {
            throw new Error("res is not ok");
          }
        })
        .then((data) => {
          if (data.success) {
            setLoading(false);
            dispatch({ type: "responseGood" });
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: "codeNotMatching" });
        });
    } else {
      setLoading(false);
      dispatch({ type: "invalidCode" });
    }
  };

const  handleChangePassword1 = (event) => {
    setPassword1(event.target.value)
}
const  handleChangePassword1 = (event) => {
    setPassword2(event.target.value)
}

const handleSubmitNewPassword = (event) => {
    event.preventDefault()
        setLoading(true)
    if(password1 !== password2){
        setLoading(false)
        dispatch({type : "passwordsUnequal"})
    } else if(password1.length < 6){
        setLoading(false)
        dispatch({type : "shortPassword"})
    }else {
        const url = "http://localhost:4002/auth/resetpassword"; // doesnt exist now
        fetch(url, {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({
              password1: password1,
              password2 : password2
            }),
          }).then(() => {

          }).then(() => {

          }).catch((err) => {
            console.log(err);
            dispatch({ type: "codeNotMatching" });
          })
    }
}

// todo add success message page , cant test it now mongo is not setup jet , todo2 DOCKER , AND  MDB CLUSTER
  return (
    <div className="ResetPassword">
      {loading ? (
        <Loader loaded={false} options={options} className="spinner" />
      ) : !state.status ? (
        <form onSubmit={handleSubmitEmail}>
          <input
            className="inputResetEmail"
            value={email}
            name="email"
            placeholder="enter your email here..."
            type="text"
            autoComplete="off"
            onChange={handleChangeEmail}
          />
          <button className="goBackButton" onSubmit={handleSubmitEmail}>
            submit
          </button>
          {state.error && <p className="errorReset">{state.errorMessage}</p>}
        </form>
      ) : 
      !state.newPassword ? <form onSubmit={handleSubmitCode}>
          <p className="resetInfo">
            Please check your email , we are sending you 6 diget code , please
            enter it bellow
          </p>
          <input
            className="inputResetCode"
            value={code}
            name="email"
            placeholder="enter your code here..."
            type="text"
            autoComplete="off"
            onChange={handleChangeCode}
          />
          <button className="goBackButton" onSubmit={handleSubmitCode}>
            submit
          </button>
          {state.error && <p className="errorReset">{state.errorMessage}</p>}
        </form>  : 
        <form onSubmit={handleSubmitNewPassword}>
            <input
            className="inputPassword1"
            value={password1}
            name="password1"
            placeholder="enter new password here..."
            type="text"
            autoComplete="off"
            onChange={handleChangePassword1}
          />
            <input
            className="inputResetCode"
            value={password2}
            name="password2"
            placeholder="please repead your new password here..."
            type="text"
            autoComplete="off"
            onChange={handleChangePassword2}
          />
          <button className="goBackButton" onSubmit={handleSubmitNewPassword}> //
            submit
          </button>
          {state.error && <p className="errorReset">{state.errorMessage}</p>}

        </form>
      
      }
    </div>
  );
};

export default ResetPassword;
