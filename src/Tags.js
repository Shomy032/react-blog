import React from "react";
import { Link } from "react-router-dom";


import "./CSS/MainPosts.css"; // all styles for this component are here , for now


function Tags(props) {

    
          return (
              <div className='tagsWraper'>
              {props.all && props.all.map((e , i) => (
                                                            // TODO make this component hit route        
                <Link to={`/posts/filter?tag=${e}`} //  this route is /posts/filter?tag={e.g html}
                className="tag"
                  key={i}
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