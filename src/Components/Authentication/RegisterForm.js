import React , {useState} from 'react';

import "../../CSS/RegisterForm.css" ;
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";


const RegisterForm = ( { setRedirectToFinish  } ) => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
  
    // move this po parent , and pass setRedirect here ;
  
    
  
    const URL = "http://localhost:4002/auth/register";
  
    function handleSubmitLogin(event) {
      event.preventDefault();
      setLoading(true);
      if (email && password1  && password2) {
        fetch(URL, {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({
            username : username ,  
            email: email,
            password1: password1 ,
            password2: password2 ,
          }),
        })
          .then((res) => {
            console.log("res" , res)
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
        setErr(true);
        setLoading(false);
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
   }
    
    return loading ? (
        <Loader type="Puff" color="#00BFFF" width={50} height={50} />
      ) : (
        <>
        <div className="RegisterForm">
          <form className="formLogin" onSubmit={handleSubmitLogin}>
           
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
              
           
            {err && (
              <p className="loginError">there is an error , pls try again</p>
            )}
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
} 

export default RegisterForm ;


