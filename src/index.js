import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Article from './Article';
import Footer from "./Footer" ;
import Main from './Main'
import { BrowserRouter as Router, Switch, Route, Link , useParams , useRouteMatch } from "react-router-dom";
// import ArticleDescription from './Article_description';

ReactDOM.render(
  <React.StrictMode>
    <>
    <Router>
    <Footer />
    <Main />
    {/* <Article search="First pos here , obout sql"/> */}
    </Router>
    </>

  </React.StrictMode>,
  document.getElementById('root')
);

