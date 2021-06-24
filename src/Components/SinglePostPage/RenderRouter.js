import React , {useEffect , useState }  from 'react'
import { useParams ,  useLocation , Redirect  } from 'react-router-dom'
import OneFullPost from './OneFullPost'

import "./../../CSS/RenderRouter.css"

const RenderRouter = ( { setPopup } ) => {


    const [ comp , setComp ] = useState(null)

  let location = useLocation();
   // console.log('pathname location' , location.pathname);
   // console.log('all location' , location);

  let { variable } = useParams(); 
 // console.log('current variable' , variable)

 // let query = useQuery();
 // console.log('current query' , query)

 useEffect(() => {
  switch(variable){
    case "id" : 
      // console.log('location.search[1]' , location.search.split('=')[1] )
      // console.log('location.search[0]' , location.search.split('=')[0] )
         if( location.search.split('=')[0] === "?_id" ){
            
          let base = 'http://localhost:4002'
            let fetchPath = base  + location.pathname + location.search  
           // console.log(fetchPath , "fetchPath")
              fetch(fetchPath , {
                method : 'GET' 
              }).then((res) =>{
             //   console.log(res)
                if(res.ok){
                  
              //    console.log('good response' , res.ok , res.status)
                 return  res.json() // parse
                } else {
               //   console.log('bad response' , res.status)
                  throw new Error(`bad response ${res.status}`)
                }
              }).then((data) => {
                
               
                setComp( <OneFullPost data={data} setPopup={setPopup}/> )  
              }).catch((err) => {
            //    console.log(err) // remove
                setComp(<Redirect to='/posts/404'/>) //todo makhe history.push()
              })
         } else {  setComp(<Redirect to='/posts/404'/>)  } // todo : throw custom err here
    break
    case "search" :
     // console.log('swith search')
    
      // set new componenet here that render search or filter result or 404

    break
    case "filter" :
     // console.log('swith filter') 

      // set new componenet here that render search or filter result or 404
      
    break 
    default :
    //console.log('non of the above')
    setComp(<Redirect to='/posts/404'/>)
  }
 } , [variable])

  // comp is 404 redirect
 return comp ? comp : (
   <div className="RenderRouter">
      
   </div>
 )   // this is state componenet , this get rendered

// this render comp , which is state variable (JSX element)

 } 

 export default RenderRouter;