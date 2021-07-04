import React, { useState, useEffect } from "react";
import "./../../CSS/OneFullPost.css";
import Likes from "./../Likes.js";
import AddComment from "./AddComment.js"
import SingleComment from "./SingleComment.js"
import Empty from "./Empty.js"


const OneFullPost = ({ data, setPopup }) => {
  console.log()
  const [comments, setComments] = useState([]);


  const [like, setLike] = useState(false); // copy
  const [addComment, setAddComment] = useState(false); // copy

   
  useEffect(() => {

  console.log("data in use effect" , data)
   
    fetch("http://localhost:4002/posts/comments" , {
      method : "POST" ,
      headers : new Headers({"Content-Type" : 'application/json'}),
      body : JSON.stringify({
        postId : data[0]._id
      })
    })
    .then((res) =>{
      if(res.ok){
        console.log("res is good")
        return res.json()
      } else {
        console.log("response is bad")
        throw new Error("response is bad")
      }

    } )
    .then((data) =>{
      if(data.length !== 0){
        console.log('setting comments')
        console.log('setting comments' , data)
         console.log(data)
        setComments(data)
      } else {
        console.log("no comments for this post")
        throw new Error("no comments for this post")
      }
      
    } )
    .catch((err) => {
      setComments([])
    })
  }, []);

const handleAddComment = () => {

  // true for now , todo : check if user is logged in
  if(false){
    setPopup(true)
  }else {
    setAddComment(!addComment)
  }
  
}


  return (
    <div className="OneFullPost">
      <div className="OneFullPostAuthor">
        {/* <p>{JSON.stringify(data)}</p> */}
        <div className="wraperOneFullPost">
          <h1>
            {data[0].name}
           {data[0].edited &&  <span className="edited">( edited )</span>}
           {/* data[0].edited */}
          </h1>
          <div className="likes">
            <Likes type="post" data={data[0]} setPopup={setPopup} />
          </div>
        </div>
        <div className="authorInfo">
        <p>{ data[0].authorName }</p>
        <p>{ data[0].date.slice(0 , 10) }</p>
        </div>
        <h2>{data[0].text}</h2>
        
        <div className="commentInfo">
        <div className="numberOfComments">
            <p> comments </p>
            <i className='fas fa-share'/>
         <span>{data[0].comments.length}</span> 
          </div>
          <button className="addCommentBtn"
          onClick={handleAddComment}
          >{addComment ?  "cancel comment" : "leave a comment" }</button>
        </div>
          
          {addComment && <AddComment />}
        
      </div>

      <div className="allComments">
        {comments.length !== 0 ?
          comments.map((element, index) => {
            return <SingleComment key={index} element={element} />;
          }) : <Empty />}
      </div>
    </div>
  );
};





export default OneFullPost;
