import React, { useState , useRef , useEffect} from "react";
import { Link } from "react-router-dom";

import Tags from './Tags'

import "./CSS/MainPosts.css";



function SinglePost(props) {

   const [like , setLike]  = useState(false)
   const [likeCount , setLikeCount] = useState(props.data.likes)

   const [render , setRender]  = useState(false) //this is needed , this rerender componen once
   useEffect(() => {
    props.data.tags.forEach(() => {
        ref.current.push(Math.random() * 359)
        setRender(true)
    });  
   } , [])
  

    const ref = useRef([])  

   const handleLike = () => {
    setLike(!like) 

     if(like){
        setLikeCount(likeCount - 1)  // TODO : make this fetch route for like , and add rate limiting
     } else {
        setLikeCount(likeCount + 1)  // TODO : make this fetch route for like , and add rate limiting
     }
    
   }

   let parsedName = props.data.name.split(" ").join("_").toLowerCase();
          return (
           <div className='singlePost'>    {/*TODO :  make this search by _id bcs name is maybe not unique*/}
              <Link className="link" to={`/posts/search/${parsedName}`}>  {/* this endpoint exist */}
                {props.data.name}
              </Link>
              <Tags colors={ref.current} all={props.data.tags} />
                  <div className='likes' onClick={handleLike}>
                <p>{likeCount}</p>
                {like ?  <i className="fas fa-heart" style={{color : 'red'}}/> : <i className="far fa-heart" />}
                </div>
            </div>
         
          );
    

}

export default SinglePost;