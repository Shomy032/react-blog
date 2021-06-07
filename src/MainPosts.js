import React, { useState, useEffect  } from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ArticleDescription from "./ArticleDescription";
import "./CSS/ArticleDescription.css";

import "./CSS/Main.css"
// import Article from './Article';


// ??
// const user = {
//   korisnik : true
// }


function Main() {
  let [values, setValues] = useState();
  // let [metadata, setMetadata] = useState({});

  useEffect(() => {
    try {
      (async () => {
        const req = await fetch(`http://localhost:8000/posts/all`);
        const res = await req.json();
       
        setValues(res);
        console.log(res)
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
      <div className='Main'>
           {/*map response and display all posts (questions) here */}
      </div>
  );



}

export default Main;

// <div>
// <Switch>
// <Route exact path="/login">
// <h1>login</h1>
// <p>yyou can loginnnnn hereee</p>
// </Route>

// <Route exact path="/register">
// <h1>register</h1>
// <p>yyou can register here</p>
// </Route>

// <Route exact path="/logout">
// <h1>logout</h1>
// <p>yyou can logout here here</p>
// </Route>

// <Route exact path="/all">
//     <div
//       style={{
//         width: 1000,
//         margin: "0 auto",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: 'center',
//       }}
//     >


      
//        {values && <div>{JSON.stringify(values)}</div> } 
//     </div>
//     </Route>

//     </Switch>

//     </div>  




// {values &&
//   values.map((e) =>{
//     return(
//     <div key={e._id}>
//       <ArticleDescription data={e.metadata}  hover={true} show={true} /> 
//    </div>
//       )
//   })}

//  <Switch>
//   {values && values.map((e) =>{
//     console.log(e.name)
//     return(
//     <div key={e._id}>
     
//    <Route exact path={`/${e.name}`}>
//      <h1>{e.name}</h1>  
//    {/* <Article search={e.name}/> */}
//    </Route>  
 
//    </div>
//       )
//   })}
//    <Route path='/'>
//   <h1>404</h1>
//    </Route>
//   </Switch>
