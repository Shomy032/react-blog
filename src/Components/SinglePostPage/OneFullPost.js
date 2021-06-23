import React , {useState , useEffect }  from 'react'
import './../../CSS/OneFullPost.css'

const OneFullPost = (props) => {
    const { data } = props ;

    const [ comments , setComments ] = useState([])

    const [likeCount , setLikeCount] = useState(data[0].likes) // copy
    const [like , setLike]  = useState(false)  // copy
    

useEffect(() =>{
// api call for comments here
}, [])

const handleLike = () => {
    setLike(!like) 

     if(like){
        setLikeCount(likeCount - 1)  // TODO : make this fetch route for like , and add rate limiting
     } else {
        setLikeCount(likeCount + 1)  // TODO : make this fetch route for like , and add rate limiting
     }
    
   }


    return <div className="OneFullPost"> 
    <div className='OneFullPostAuthor'>
  <p>{JSON.stringify(data)}</p>    
     <h1>{data[0].name}</h1>
     <div className='likes' onClick={handleLike}>
          <p>{likeCount}</p>
      {like ?  <i className="fas fa-heart" style={{color : 'red'}}/> : <i className="far fa-heart" />}
      <h2>{data[0].text}</h2>   {/* todo : add parser soo user can make more then one paragraph and add links */} 
       <p>{data[0].author + ' ' + data[0].date}</p>
      </div>
    </div>

    <div className='allComments'>
{comments && comments.map((element , index) =>{
   return <SingleComment  key={index} element={element} /> 
}) }
    </div>
    </div>
  }


  const SingleComment = ( { element } ) => {

const [ data , setData ] = useState({})

    useEffect(() => {
// call api here , and store it in state
    } , [])

    
    return <div className='singleComment'>
       
    </div>
      }
      



  export default OneFullPost



  