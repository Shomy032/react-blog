import React from "react";
import { Link  } from "react-router-dom";
import './CSS/Footer.css'

function Footer(props) {
 
 

  return (
    <div className='Footer'>
      {props.data && props.data.map((e) =>{
          let queryString = 'posts/id?_id' + '=' + e._id
        return <Link className="link" key={e._id} to={`/${queryString}`}>{e.name}</Link>  
      })}                             
    </div>
  );
}

export default Footer;