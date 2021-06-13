import React , { useState }  from "react";
import './CSS/App.css'

import Header from "./Header" ;
import MainPosts from './MainPosts'
 import { BrowserRouter as Router, Switch, Route, Link , useParams , useRouteMatch } from "react-router-dom";
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
                
              </div>
                
          );
    

}

export default App;