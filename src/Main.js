import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import ArticleDescription from "./ArticleDescription";
import "./ArticleDescription.css";
import Article from './Article';


function Main() {
  let [values, setValues] = useState();
  // let [metadata, setMetadata] = useState({});

  useEffect(() => {
    try {
      (async () => {
        const req = await fetch(`http://127.0.0.1:8000/blogs/`);
        const res = await req.json();
       
        setValues(res);
        console.log(res)
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div
      style={{
        width: 1000,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
      }}
    >

{/*  */}


{/*  */}
      {values &&
        values.map((e) =>{
          return(
          <>
            <ArticleDescription data={e.metadata} key={e._id} hover={true}/>
          
         <Route path={`/${e.name}`}>  
         <Article search={e.name}/>
         </Route>  
   </>
            )
        })}
      {/* {values && <div>{JSON.stringify(values)}</div> } */}
    </div>
  );

  // {/* <div>{JSON.stringify(values)}</div> */}
  // values.map((e) => {


// </Route><Route path={`/${e.name}`}> 

  // return (
  // <>
  // <ArticleDescription data={e.metadata} key={e._id}/>
  //  </>
  // );
  // })
}

export default Main;
