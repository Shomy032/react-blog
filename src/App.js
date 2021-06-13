import React , { useState }  from "react";
import './CSS/App.css'

import Header from "./Header" ;
import MainPosts from './MainPosts'
 import { BrowserRouter as Router, Switch, Route, Link , useParams , useRouteMatch, useLocation , Redirect } from "react-router-dom";
import Dashboard from "./Dashboard"


function App() {

   const [dataFromDashboard , sendDataToIndexThenToMain ] = useState([])  // from index and from MainPosts 

   if(dataFromDashboard){console.log(dataFromDashboard , dataFromDashboard.length)}

          return (
              <div className='App'>
                   <Header sendDataToIndexThenToMain={sendDataToIndexThenToMain} />
             {/* <Auth /> */}
               
            <Dashboard sendDataToIndexThenToMain={sendDataToIndexThenToMain}/>


            <MainPosts dataFromDashboard={dataFromDashboard}/>
        
         {/* <Link to='/posts/filter?tag=html&tag=js' >test link</Link > */}


                  <Route path="/posts/:variable" > {/* all /posts/query  routes */}

                         <RenderRouter />  {/* this parse query string , and do stuff :) */}
                    {/* <h1>some post on , {} </h1> */}
                    
                  </Route>
                    
               {/* <Link to='/posts/404' >404</Link>  use redirect instead*/}
                <Route exact path='/posts/404'>
                  <h1>404 item not found</h1>
                </Route>  
              </div>
                
          );
    

}

export default App;


 const RenderRouter = (  ) => {


  let location = useLocation();
    console.log('pathname location' , location.pathname);
    console.log('all location' , location);

  let { variable } = useParams(); 
  console.log('current variable' , variable)

 // let query = useQuery();
 // console.log('current query' , query)

  switch(variable){
    case "id" : 
      console.log('swith id')
      // console.log('location.search[1]' , location.search.split('=')[1] )
      // console.log('location.search[0]' , location.search.split('=')[0] )
         if( location.search.split('=')[0] === "?_id" ){
            
          let base = 'http://localhost:4002'
            let fetchPath = base  + location.pathname + location.search  
              fetch(fetchPath , {
                method : 'GET' 
              }).then((res) =>{
                if(res.ok){
                  console.log('good response' , res.ok , res.status)
                 return  res.json() // parse
                } else {
                  console.log('bad response' , res.status)
                  throw new Error(`bad response ${res.status}`)
                }
              }).then((data) => {
                // render here , or pass props
                console.log(data) // remove
              }).catch((err) => {
                console.log(err) // remove
                return <Redirect to='/posts/404'/>
              })
         } else { return <Redirect to='/posts/404'/>  } // todo : throw custom err here
    break
    case "search" :
      console.log('swith search')
      

    break
    case "filter" :
      console.log('swith filter')
      

    break 
    default :
    console.log('non of the above')
     return <Redirect to='/posts/404'/>
  }
    

return <h1> from  test component</h1>
 } 


//  function useQuery() {
//   return new URLSearchParams(useLocation());
// }