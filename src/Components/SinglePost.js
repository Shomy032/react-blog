import React, { useState , useRef , useEffect} from "react";
import { Link } from "react-router-dom";

import Tags from './Tags'

import "../CSS/MainPosts.css";
import Likes from "./Likes" ;




function SinglePost({ setPopup , data , parsedName }) {
   
// props.setPopup // this triger login popup , this is passed to SinglePost from MainPosts


   const [render , setRender]  = useState(false) //this is needed , this rerender component once
   useEffect(() => {

      if(data.tags){
 
         data.tags.forEach(() => {
            ref.current.push(Math.random() * 359)
            setRender(true)
        }); 
      }
    

   } , [])
  
   

// parse data from mongo , and return month date and time //TODO make this return time ago...
function dateParser(oldDate){
 
   let parse =  oldDate.split('-')
   parse[2] = parse[2].slice(0 , 2)
  let  newDate = parse.join("_")

   return newDate;
}


    const ref = useRef([])  

   

          return (
           <div className='singlePost'>    {/*TODO :  make this search by _id bcs name is maybe not unique*/}
              <Link className="link" to={`/posts/${parsedName}`}>  {/* this endpoint exist */}
                {data.name}
              </Link>
              <Tags colors={ref.current} all={data.tags} />

{/* make this a component , likes*/}

                   <Likes data={data} setPopup={setPopup}/>
                 
{/* make this a component , likes*/}

                 <div className='comment'>
                    <span>{`${data.comments.length} comments`}</span> {/* hard coded */}
                    <i className='fas fa-share'/>

                    <span>{dateParser(data.date)}</span>

                    </div> 
            </div>
         
          );
    

}

export default SinglePost;