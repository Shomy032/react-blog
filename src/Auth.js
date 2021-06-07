import React , {useState , useRef} from "react";


// hard coded for testing
const path = 'register';
const port = '4002'
let token = 'test-token'; 

function Auth() {

 const [user , setUser] =  useState('')
 const [pass , setPass] =  useState('')
 const [email , setEmail] =  useState('')
      
let bodyTest =  {'username' : user , 'password' : pass , 'email' : email ? email : '' }

 function handleSubmit(event){
 event.preventDefault()
  fetch(`http://localhost:${port}/${path}` , {
method : 'POST' ,
  mode : "cors",
headers : {
    // "Content-Type" : "application/json",
    'Content-Type': 'application/json' ,
    "Authorization" : `Bearer ${token || 'no token'}` 
} ,
body : JSON.stringify(bodyTest) 
  }) 
.then(data => data.json())
.then(data => console.log(data))
.then(() => console.log(document.cookie))
  .catch(err => console.log(err)) 
 }

 function handleChangeUser(event){
    setUser(event.target.value)
 }
 function handleChangePassword(event){
    setPass(event.target.value)
 }
 function handleChangeEmail(event){
    setEmail(event.target.value)
}

  return (
   <>
<form onSubmit={handleSubmit}>
<input type='text' name='username' value={user} onChange={handleChangeUser}/>
<input type='password' name='password' value={pass} onChange={handleChangePassword}/>
{true && <input type='text' name='email' value={email || 'milosmilic032@gmail.com'} onChange={handleChangeEmail}/> }    
<button type='submit' onClick={handleSubmit}>submit</button>
</form>   
   </>
  );
}

export default Auth;
