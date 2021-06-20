import React, { useState , useRef , useEffect} from "react";
import { Link } from "react-router-dom";

import Tags from './Tags'

import "./CSS/MainPosts.css";


const url = "http://localhost:4002/action/like"; // this wont change

async function likeIt(url , actionType , postId , postType){
   try{
      const res = await fetch(url ,{
         method : 'POST',
         headers: new Headers({'Content-Type': 'application/json'}),
         body : JSON.stringify({
            postId : postId , // or comment id name dont change either way
            postType : postType , // post or comment , post in this case
            actionType : actionType // like or dislike
         })
      });
      const data = await res.json();
      console.log("data" , data);
      return data ;
   } catch(err) {
   console.log("err" , err , "sended" , "failed to" , actionType)
   return new Error("failed to" + actionType);
   }

}



function SinglePost(props) {

   const [like , setLike]  = useState(false)
   const [likeCount , setLikeCount] = useState(props.data.likes)

   const [render , setRender]  = useState(false) //this is needed , this rerender componen once
   useEffect(() => {

      if(props.data.tags){
 
         props.data.tags.forEach(() => {
            ref.current.push(Math.random() * 359)
            setRender(true)
        }); 
      }
    

   } , [])
  

function dateParser(oldDate){
 
   let parse =  oldDate.split('-')
   parse[2] = parse[2].slice(0 , 2)
  let  newDate = parse.join("_")

   return newDate;
}


    const ref = useRef([])  

   const handleLike = async () => {
      setLike(!like) // this change only animation
     try{
      if(!like){    
         console.log('like')                          
         const res =  await likeIt(url  , "like" , props.data._id , "post") // post or comment , post in this case
         console.log(res , "res in if (like)") 
            if(res.success == true){
               console.log("res is good")
            
            setLikeCount(likeCount - 1)  
            } else{
               setLike(false) // this change only animation
               console.log("res is bad")
            }  
          
          } else { 
             console.log('dislike')                             
           const res =  await likeIt(url  , "dislike" , props.data._id , "post")// post or comment , post in this case
             console.log(res , "res in else (!like) !!!!")
             if(res.success == true){
               console.log("res is good") 

               setLikeCount(likeCount + 1) 
             }else {
               setLike(true) // this change only animation
               console.log("res is bad")
             }
            
          }
     } catch(err){
      console.log('err from catch ::', err)
     }
     
    
   }

          return (
           <div className='singlePost'>    {/*TODO :  make this search by _id bcs name is maybe not unique*/}
              <Link className="link" to={`/posts/${props.parsedName}`}>  {/* this endpoint exist */}
                {props.data.name}
              </Link>
              <Tags colors={ref.current} all={props.data.tags} />

                  <div className='likes' onClick={handleLike}>
                <p>{likeCount}</p>
                {like ?  <i className="fas fa-heart" style={{color : 'red'}}/> : <i className="far fa-heart" />}
                </div>

                 <div className='comment'>
                    <span>{`${12} comments`}</span> {/* hard coded */}
                    <i className='fas fa-share'/>

                    <span>{dateParser(props.data.date)}</span>

                    </div> 
            </div>
         
          );
    

}

export default SinglePost;