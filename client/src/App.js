import React, { useState } from 'react';
import './styles/App.scss';
import Header from './components/Header';
import Main from './Main';
import LogginBanner from './components/LogginBanner';
import { UserContext } from './context/LoginContext';

function App() {
  const [accessToken,setAccessToken] = useState(null);
  const [userInfo,setUserInfo] = useState({
    id: '',
    email: '',
    picture: '',
    verified: null,
  })


  return (

    <div className="App">
      <UserContext.Provider value={{userInfo,setUserInfo,accessToken,setAccessToken}}>
        <Header ></Header>
        <Main></Main>
        {
          accessToken===null&&<LogginBanner ></LogginBanner>
        }

      </UserContext.Provider>
    </div>
  );
}

export default App;
