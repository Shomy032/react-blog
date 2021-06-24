import React, { useState, useEffect } from "react";
import "../CSS/App.css";

import Header from "./Header";
import MainPosts from "./MainPosts";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useLocation,
  Redirect,
} from "react-router-dom";
import Dashboard from "./Dashboard";

import ResetPassword from "./Authentication/ResetPassword.js";

import RenderRouter from "./SinglePostPage/RenderRouter";
import Popup from "./Authentication/Popup";

function App() {
  const [dataFromDashboard, sendDataToIndexThenToMain] = useState([]); // from index and from MainPosts

  const [popup, setPopup] = useState(false); // this triger login popup , this is passed to SinglePost

  // if (dataFromDashboard) {
  //   console.log(dataFromDashboard, dataFromDashboard.length);
  // }

  return (
    <div className="App">
      <Header
        sendDataToIndexThenToMain={sendDataToIndexThenToMain}
        setPopup={setPopup}
        popup={popup}
      />
      {/* <Auth /> */}

      <Dashboard sendDataToIndexThenToMain={sendDataToIndexThenToMain} />
      {popup && <Popup setPopup={setPopup}/>}
      
      {/* problem is that e.g. '/al' route goes nowhere */}
      <Switch>
        <Route exact path="/">
          <MainPosts
            dataFromDashboard={dataFromDashboard}
            setPopup={setPopup}
            popup={popup}
          />
        </Route>
        {/* '/' will be porfolio or docs */}
        <Route exact path="/posts">
          <MainPosts
            dataFromDashboard={dataFromDashboard}
            setPopup={setPopup}
            popup={popup}
          />
        </Route>{" "}
        {/*  duplicate route */}
        {/* <Route exact path="/passwordReset">
          <ResetPassword />
        </Route> */}
        <Route exact path="/posts/all">
          <MainPosts dataFromDashboard={dataFromDashboard} />
        </Route>
        <Route path="/posts/:variable">
          <RenderRouter setPopup={setPopup}/>
        </Route>
        <Route exact path="/posts/404">
          <h1>404 item not found</h1>
        </Route>
        {/* <Route exact path="/login">
                  <h1>login route</h1>  

                  </Route>
                  
                  <Route exact path="/register">
                  <h1>register route</h1> 
                  </Route> */}
        <Route path="/">
          <h1>404 that route dont exist</h1>
        </Route>
        <Route exact path='/posts/404'>
        <h1>404 that route dont exist</h1>        
        </Route>

      </Switch>
      
    
        
    
    </div>
  );
}

export default App;

//  function useQuery() {
//   return new URLSearchParams(useLocation());
// }
