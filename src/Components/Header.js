import React, { useState , useRef , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link , useParams , useRouteMatch, Redirect } from "react-router-dom";
import '../CSS/Header.css'
import Search from './Search'
import Filter from './Filter'


function Header( { sendDataToIndexThenToMain  , setPopup } ) {
  const [loger, setLoger] = useState(false); // todo : make this use context


  const [filters , addFilters ] = useState([]) // his is for child component // Filter
  const [resData , setResData ] = useState([])  // his is for child component // Search  
  const [red , setRed] = useState( null )

  // console.log('current filters , rerendering' , filters , JSON.stringify(filters))
  
  let filterString = useRef('')
        
  // current problem , effect are called once ??
  useEffect(() => {
      console.log('useEffect is called' )

      filterString.current = filters.map((tag , index , arr) =>{
          return  arr.length == index + 1 ? `tag=${tag}` : `tag=${tag}&` // construct query
          }).join('') 

      console.log('filters in effect' , filters , filterString.current)

      if(filterString.current && filters.length !== 0){
        console.log('useEffect is fetching' , `http://localhost:4002/posts/filter?${filterString.current}` )
          fetch(`http://localhost:4002/posts/filter?${filterString.current}`
          , {method : "GET"})
           .then((res) => { if(res.ok || res.status == 200){ return res.json() }
            else { throw new Error('fetch failed') } // throw new Error('fetch failed')
          })
               .then((data) => sendDataToIndexThenToMain(data)) // save in state
                   .catch((err) => console.error(err)) // if there is err throw it
      } else { 
         console.error('bad filters' , 'returning')    
           return () => console.log('returning , last else')
      }

  } ,  [JSON.stringify(filters)] ) // for some reason , this isnt working, it call only once , or twice ???
                                                   // with [filters] only it calls once
                                                   // with ... it throw error
//[JSON.stringify(outcomes)]
//[JSON.stringify(filters)]

useEffect(() => {
  if(resData instanceof Error){  // myError instanceof Error // true
    console.log('err in use effect')
    setRed( <Redirect to='/posts/404' />)
  }
 
//   console.log('resData is changing')
// console.log(resData , 'resData is changing')
} , [resData])




  return (
    <div className='Header'>

          

        {/* <div className='contentLinks'>
       
        </div> */}
      
        <div className='authLinks'>
        <h1 className="logo">OverflowStack</h1>  
        {!loger && <div className='link' onClick={() => setPopup(true)} >Sing up</div> }
        {/* {!loger && <div className='link' onClick={() => setPopup(true)} >Register</div>}
        {loger && <div className='link' to="/logout">Logout</div>} */}
        </div>

  {/* // setResData in Dashboard todo :: */}
          <div className='wraperHeader' style={{ display : 'flex' , width : 'auto'  }}>

         <Search setResData={ setResData }/> 
         <Filter addFilters={ addFilters } />  
       
       { red }
        </div>
{/* addFilters={addFilters} from dashboard */}

    </div>
  );
}

export default Header;
