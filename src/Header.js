import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link , useParams , useRouteMatch } from "react-router-dom";
import './CSS/Header.css'
import Search from './Search'
import Filter from './Filter'


function Header() {
  const [loger, setLoger] = useState(false); // todo : make this use context


  return (
    <div className='Header'>

          

        {/* <div className='contentLinks'>
       
        </div> */}
      
        <div className='authLinks'>
        <img src="./favicon.ico" alt="logo" />       {/* just testing logo */}  
        {!loger && <Link className='link' to="/login">Login</Link> }
        {!loger && <Link className='link' to="/register">Register</Link>}
        {loger && <Link className='link' to="/logout">Logout</Link>}
        </div>

  {/* // setResData in Dashboard todo :: */}
          <div className='wraperHeader' style={{ display : 'flex' , width : 'auto'  }}>

         <Search /> 
         <Filter />  

        </div>
{/* addFilters={addFilters} from dashboard */}

    </div>
  );
}

export default Header;
