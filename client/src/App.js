import React, { useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import './styles/App.scss';
import Header from './components/Header';
import Main from './Main';


function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(true);

  return (
    <div className="App">
        <Header isLoggedIn={isLoggedIn}></Header>
        <Main></Main>
      
    </div>
  );
}

export default App;
