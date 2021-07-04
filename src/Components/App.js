import React, { useState , useMemo , useEffect } from "react";
import "../CSS/App.css";

import Header from "./Header";
import MainPosts from "./MainPosts";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "./Profile/Profile.js"

import ResetPassword from "./Authentication/ResetPassword.js";

import RenderRouter from "./SinglePostPage/RenderRouter";
import Popup from "./Authentication/Popup";


import UserContext from "./../Context/UserContext.js"
import FooterContact from "./../Components/FooterContact.js"


function App() {
  const [dataFromDashboard, sendDataToIndexThenToMain] = useState([]); // from index and from MainPosts

  const [popup, setPopup] = useState(false); // this triger login popup , this is passed to SinglePost
  const [loger, setLoger] = useState(false);
  // if (dataFromDashboard) {
  //   console.log(dataFromDashboard, dataFromDashboard.length);
  // }
const value = useMemo(() => ({loger, setLoger}) , [loger, setLoger])

const url = "http://localhost:4002/auth/isThereUser"

useEffect(() => {
fetch(url , {
  method : "POST" ,
  credentials : "same-origin" 
}).then((res) => {
  return res.json()
}).then((data) => {
  console.log("dddaaatttaaa" , data)
if(data.success){
  setLoger(true)
} else {
  throw new Error("no user")
}
}).catch(() => {
  setLoger(false) // render auth button
})

} , [])

  return (
    <div className="App">
      
   <UserContext.Provider value={value}>

      <Header

        sendDataToIndexThenToMain={sendDataToIndexThenToMain}
        setPopup={setPopup}
        popup={popup}
        
      />


      {/* <Auth /> */}

      <Dashboard sendDataToIndexThenToMain={sendDataToIndexThenToMain} />
      {popup && <Popup setPopup={setPopup} />}
      
      
      <Switch>
        <Route exact path="/">
          <MainPosts
            dataFromDashboard={dataFromDashboard}
            setPopup={setPopup}
            popup={popup}
          />
        </Route>
        <Route exact path="/profile">
          <Profile />
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
      
      <FooterContact />
      </UserContext.Provider>
      
    </div>
  );
}

export default App;

//  function useQuery() {
//   return new URLSearchParams(useLocation());
// }
