import React, { useState , useRef , useEffect} from "react";
import { Link } from "react-router-dom";

import Tags from './Tags'

import "./CSS/MainPosts.css";





function SinglePost(props) {
   
// props.setPopup // this triger login popup , this is passed to SinglePost from MainPosts

   const [like , setLike]  = useState(false)
   const [likeCount , setLikeCount] = useState(props.data.likes)

   const [render , setRender]  = useState(false) //this is needed , this rerender component once
   useEffect(() => {

      if(props.data.tags){
 
         props.data.tags.forEach(() => {
            ref.current.push(Math.random() * 359)
            setRender(true)
        }); 
      }
    

   } , [])
  
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
         console.log(res.status , "data" , res)
         if(res.status === 403 && !res.ok){ 
            return {
               success : false,
               redirect : true ,
               authorized : false
            }  
         }else if(res.status == 400 && !res.ok){
            throw new Error("invalid request")  
         }
         const data = await res.json();
         console.log("data" , data);
         return data ; // if all pass return original data
      } catch(err) {
      console.log("err" , err , "sended" , "failed to" , actionType)
      throw new Error("failed to" + actionType);
      }
   
   }
   

// parse data from mongo , and return month date and time //TODO make this return time ago...
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
            } else if(res.success == false && res.authorized == false && res.redirect == true){
               setLike(false) // this change only animation
               console.log("res is bad , unauthorized")
               // popup here
               props.setPopup(true)
            } else {
               setLike(false)
               console.log("res is just bad");
            }  
          
          } else { 
             console.log('dislike')                             
           const res =  await likeIt(url  , "dislike" , props.data._id , "post")// post or comment , post in this case
             console.log(res , "res in else (!like) !!!!")
             if(res.success == true){
               console.log("res is good") 

               setLikeCount(likeCount + 1) 
             } else if(res.success == false && res.authorized == false && res.redirect == true) {
               setLike(true) // this change only animation
               console.log("res is bad , unauthorized")
               // popup here
               props.setPopup(true)
             } else {
               console.log("res is just bad") 
               setLike(true)
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