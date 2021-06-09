import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link , useParams , useRouteMatch } from "react-router-dom";
import './CSS/Footer.css'

function Footer(props) {
 
    useEffect(() => {
      
     } , [])

  return (
    <div className='Footer'>
      {props.data && props.data.map((e) =>{
          let queryString = 'posts/id?' + '=' + e._id
        return <Link className="link" key={e._id} to={`/${queryString}`}>{e.name}</Link>  
      })}                             
    </div>
  );
}

export default Footer;