import React from "react";
import { Link } from "react-router-dom";



import "./CSS/MainPosts.css"; // all styles for this component are here



function Tags(props) {

    
          return (
              <div className='tagsWraper'>
              {props.all.map((e , i) => (
       
                <Link to={`/posts/filter/${e}`} // todo : make /filter endpoint  
                className="tag"
                  key={Math.random() * 1237561245673}
                  style={{
                    backgroundColor: `hsl( ${props.colors[i]} , 100%, 50%)`,
                  }}
                >
                  {e}
                </Link>
              ))}
            </div>     
          );
    

}

export default Tags;