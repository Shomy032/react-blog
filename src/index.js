import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Article from './Article';
import Article_description from './Article_description';

ReactDOM.render(
  <React.StrictMode>
    <Article_description />
    <Article />
  </React.StrictMode>,
  document.getElementById('root')
);

