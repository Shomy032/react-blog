import React , { useContext } from "react"
import UserContext from "./../../Context/UserContext.js"

import Likes from "./../Likes"
import "./../../CSS/SingleComment.css"
// not finished

const SingleComment = ({ element }) => {


  const { setPopup } = useContext(UserContext)


    return <div className="SingleComment">
      <div className="commentInfo">
  <p className="author"> { element.author } </p>
  {element.edited && <p> (edited) </p>}
  <p className="edited"> (edited) </p>
  </div>
  
  <h1 className="commentText"> { element.text } </h1>

  <Likes type="comment" data={element} setPopup={setPopup}/>
    </div>;
  };


  export default SingleComment ;


