import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import Article from './Article';
import Footer from "./Footer" ;
import Main from './MainPosts'
import { BrowserRouter as Router, Switch, Route, Link , useParams , useRouteMatch } from "react-router-dom";

import Auth from "./Auth"
// import ArticleDescription from './Article_description';

ReactDOM.render(
  <React.StrictMode>
   
    <Router> {/* router is here for now , bcs links are in Footer and routes in Main*/} 

    <Footer />
    <Auth />
    <h1>debug</h1>
    <Main />

    </Router>
    {/* <Article search="First pos here , obout sql"/> */}
    


  </React.StrictMode>,
  document.getElementById('root')
);

