import React  , {} from "react" ;
import "../../CSS/Finish.css"

const Finish = ( { user } ) =>{
// ad register massage

   const userLogedWelcomeMassage = `Welcome ${user} , you have succefully logged in :)`


    return <div className="Finish">
        <h1>{ userLogedWelcomeMassage }</h1>
    </div>
}

export default Finish ;