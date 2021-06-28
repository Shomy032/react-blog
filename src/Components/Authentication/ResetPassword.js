import React , { useState , useReducer } from "react" ;
import "../../CSS/ResetPassword.css";
const Loader = require("react-loader");



const errorResetReducer = (state, action) =>{
switch(action.type){
    case "invalidEmail" :
        return {error : true , errorMessage : "please enter valid email", status : false}
    case "emailNotInUse" :
        return {error : true , errorMessage : "please enter valid email" , status : false}
    case "responseGood" :
        return {error : false , errorMessage : "" , status : true}
    case "invalidCode" :
        return {error : true , errorMessage : "please enter valid code", status : false}
        case "codeNotMatching" :
        return {error : true , errorMessage : "please enter your code" , status : false}   
    default :
    return {error : false , errorMessage : "" , status : false}         
}


}


const ResetPassword = () =>{


const  [loading , setLoading] = useState(false) 
const [email , setEamil] = useState("")
const [code , setCode] = useState("")
const [state , dispatch] = useReducer(errorResetReducer , {error : false , errorMessage : "" ,  status : false })


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

     




const emailTest2 =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



const  handleSubmitEmail = (event) => {
event.preventDefault()

const url = "http://localhost:4002/auth/resetemail" ; // doesnt exist now
if(emailTest2.test(email)){
    setLoading(true)
    fetch(url , {
        method : "POST" ,
        headers : new Headers({"Content-Type" : "application/json"}) ,
        body : JSON.stringify({
            email : email
        })
    }).then((res) => {
       if(res.ok){
        setLoading(false)
        dispatch({type : "responseGood"})
        return res.json() ;
       } else {
           throw new Error("res is not ok")
       }
    }).then((data) => {
        if(data.success){
            setLoading(false)
            dispatch({type : "responseGood"})
        }
    }).catch((err) => {
        console.log(err)
        dispatch({type : "emailNotInUse"})
    })
} else {
    setLoading(false)
    dispatch({type : "invalidEmail"})
}



}

const handleChangeEmail = (event) => {
    setEamil(event.target.value) ;
}

const handleChangeCode = (event) => {
 setCode(event.target.value) ;
}

const handleSubmitCode = (event) => {
    event.preventDefault()

    const url = "http://localhost:4002/auth/resetcode" ; // doesnt exist now

   if(code.length !== 6){
    setLoading(true)
    fetch(url , {
        method : "POST" ,
        headers : new Headers({"Content-Type" : "application/json"}) ,
        body : JSON.stringify({
            code : code
        })
    }).then((res) => {
       if(res.ok){
        setLoading(false)
        dispatch({type : "responseGood"})
        return res.json() ;
       } else {
           throw new Error("res is not ok")
       }
    }).then((data) => {
        if(data.success){
            setLoading(false)
            dispatch({type : "responseGood"})
        }
    }).catch((err) => {
        console.log(err)
        dispatch({type : "codeNotMatching"})
    })
   } else {
    setLoading(false)
    dispatch({type : "invalidCode"})
   }
   
}

    return (
       
        <div className="ResetPassword">
    {loading ? <Loader loaded={false} options={options} className="spinner" /> : 
    !state.status ?
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
        <button className="goBackButton" onSubmit={handleSubmitEmail}>submit</button>
        {state.error && <p className="errorReset">{state.errorMessage}</p>}
                        </form> :
                        <form onSubmit={handleSubmitCode}>
                            <p className="resetInfo">Please check your email , we are sending you 6 diget code , please enter it bellow</p>
                            <input 
        className="inputResetCode"
        value={code}
        name="email"
        placeholder="enter youe code here..."
        type="text"
        autoComplete="off"
        onChange={handleChangeCode}
        />
        <button className="goBackButton" onSubmit={handleSubmitCode}>submit</button>
        {state.error && <p className="errorReset">{state.errorMessage}</p>}
                        </form>
    
    } 
        </div>


    )
}

export default ResetPassword ;
