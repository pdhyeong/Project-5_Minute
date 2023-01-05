import React, { useState } from 'react';
import './styles/App.scss';
import Header from './components/Header';
import Main from './Main';
import LogginBanner from './components/LogginBanner';
import { UserContext } from './context/LoginContext';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);


  return (

    <div className="App">
      <UserContext.Provider value={{accessToken, setAccessToken, isLoggedIn,setIsLoggedIn}}>
        <Header ></Header>
        <Main></Main>
        {
          !isLoggedIn&&<LogginBanner ></LogginBanner>
        }

      </UserContext.Provider>
    </div>
  );
}

export default App;
