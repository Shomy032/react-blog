import React  , { useState , useEffect } from "react" ;
import "../../CSS/Finish.css"

const Finish = ( { user } ) =>{
// ad register massage
//const [ state , setState ] = useState()



   const userRegistredWelcomeMassage = `Welcome ${user} , you have succefully registred :)`


    return  <div className="Finish">
         <h1>{ userRegistredWelcomeMassage }</h1>
       </div>
}

export default Finish ;