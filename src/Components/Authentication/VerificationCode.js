

import React , { useState , useContext } from "react"

import "./../../CSS/VerificationCode.css"
import UserContext from "./../../Context/UserContext.js"


const VerificationCode = ( {  username , setUser ,  email , setLoading , setRedirectToFinish } ) => {

const [code , setCode] = useState("")
const [error , setError] = useState("")
 
const { setLoger } = useContext(UserContext)

const handleSubmitCode = (event) => {
event.preventDefault()
const url = "http://localhost:4002/auth/verifyregister"
setLoading(true)

fetch(url , {
    method : "POST" ,
    headers : new Headers({ "Content-Type": "application/json" }) ,
    body : JSON.stringify({
        code : code ,
        email : email , 
        username : username
    })

})
.then((res) => {
  console.log(res)
  setLoading(false)
 return res.json()
}).then((data) => {
  //console.log(data)
   if(data.success) {
    setLoger(true)
      setLoading(false)
      // redirect here
     // console.log(data)
     
      setRedirectToFinish(true)
      

   } else {
      setLoading(false)
       setError(data.message)
   }   
}) 



}
const handleChangeCode = (event) => {
    setCode(event.target.value)
}

    return (
<div className="VerificationCode">
<form onSubmit={handleSubmitCode}>
        <p className="resetInfo">
          Check your email , we are sending you 6 diget code , please
          enter it bellow
        </p>
        <p className="resetInfo">
          If you didnt recieve our email please , contact us on ****
        </p>
        <input
          className="inputResetCode"
          value={code}
          name="code"
          placeholder="enter your code here..."
          type="text"
          autoComplete="off"
          onChange={handleChangeCode}
        />
        <button className="goBackButton" onSubmit={handleSubmitCode}>
          submit
        </button>
        {error && <p className="errorReset">{error}</p>}
      </form>
</div>
    )
}

export default VerificationCode ;