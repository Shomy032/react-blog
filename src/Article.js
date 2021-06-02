import React, { useState, useEffect } from "react";
import "./Article.css";
import ArticleDescription from "./ArticleDescription";
import { BrowserRouter as Router, Switch, Route, Link , useParams , useRouteMatch } from "react-router-dom";

function Article(props) {
  let [values, setValues] = useState([]);
  let [metadata, setMetadata] = useState({});

  // 
  let { name } = useParams();
//  
  useEffect(() => {
    try {
      (async () => {
        // hard coded for now
        const req = await fetch(
          `http://127.0.0.1:8000/blogs/${props.search}`
        );
        const res = await req.json();
        //data is usen in this component
        const data = res.content;
        // passed to child

        setMetadata({ ...res.metadata });
        setValues([...data]);
      })();
    } catch (err) {
      console.log(err); // here hard code fake response
    }
  }, []);

  return (
    <section className="Article">
      {/*  */}
      <ArticleDescription data={metadata} />
      {/*  */}
      {values.map((e) => (
        <div className="part" key={e.id}>
          {e.h1 ? <h1>{e.h1}</h1> : null}
          {e.p ? <p>{e.p}</p> : null}
          {e.img_path ? <img src={e.img_path} alt="" /> : null}
        </div>
      ))}
      <h3>{name}</h3>
    </section>
  );
}

export default Article;
