

import React , {} from "react"
import "./../../CSS/ResetCodeFormPassword.css"

const ResetCodeFormPassword = ({ code , handleSubmitCode , handleChangeCode , state , stateError }) => {



    return  ( 
      <> 
    <form onSubmit={handleSubmitCode}>
       
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
        {state.error && <p className="errorReset">{state.errorMessage || stateError}</p>}
      </form> 
      <p className="resetInfo">
      Check your email , we are sending you 6 diget code , please
      enter it bellow
    </p>
    <p className="resetInfo">
      If you didnt recieve our email please check your spam , or contact us on ******
    </p>
      </>
      )


}
 

export default ResetCodeFormPassword ;