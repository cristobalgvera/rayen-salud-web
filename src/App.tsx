import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Menu from './components/Menu';
import Routes from './components/Routes';

function App() {
  return (
      <BrowserRouter>
        <div className={"App"}>
          <Menu/>
          <Routes/>
        </div>
      </BrowserRouter>
  );
}

export default App;
