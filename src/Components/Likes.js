import React , { useState } from "react";

const Likes = ({  data , setPopup }) => {



    const [like , setLike]  = useState(false)
    const [likeCount , setLikeCount] = useState(data.likes)

    
   const url = "http://localhost:4002/action/like"; // this wont change

   async function likeIt(url , actionType , postId , postType){
      try{
         const res = await fetch(url ,{
            method : 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'same-origin' ,
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

    const handleLike = async () => {
        setLike(!like) // this change only animation
       try{
        if(!like){    
        //   console.log('like')                          
           const res =  await likeIt(url  , "like" , data._id , "post") // post or comment , post in this case
        //   console.log(res , "res in if (like)") 
              if(res.success == true){
              //   console.log("res is good")
              
              setLikeCount(likeCount - 1)  
              } else if(res.success == false && res.authorized == false && res.redirect == true){
                 setLike(false) // this change only animation
              //   console.log("res is bad , unauthorized")
                 // popup here
                setPopup(true)
              } else {
                 setLike(false)
              //   console.log("res is just bad");
              }  
            
            } else { 
               console.log('dislike')                             
             const res =  await likeIt(url  , "dislike" , data._id , "post")// post or comment , post in this case
               console.log(res , "res in else (!like) !!!!")
               if(res.success == true){
                 console.log("res is good") 
  
                 setLikeCount(likeCount + 1) 
               } else if(res.success == false && res.authorized == false && res.redirect == true) {
                 setLike(true) // this change only animation
                 console.log("res is bad , unauthorized")
                 // popup here
                 setPopup(true)
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
    <div className="likes" onClick={handleLike}>
      <p>{likeCount}</p>
      {like ? (
        <i className="fas fa-heart" style={{ color: "red" }} />
      ) : (
        <i className="far fa-heart" />
      )}
    </div>
  );
};

export default Likes;
