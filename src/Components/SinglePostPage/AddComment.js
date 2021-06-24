import React , { useState } from "react"
import "./../../CSS/AddComment.css"


const AddComment = () =>{

    const [value , setValue] = useState("")

    const  handleChange = (event) => {
        setValue(event.target.value) ;
    }
const handleSubmit = (event) => {
event.preventDefault() ;
console.log("submit")

}


return (
    <div className="AddComment">
        <form onSubmit={handleSubmit}>
<textarea className="textArea"
placeholder="enter your comment here..."
value={value} onChange={handleChange}/>
<button className="addCommentBtn" type="submit" onClick={handleSubmit}>
add comment
</button>
        </form>
    </div>
)
}

export default AddComment ;