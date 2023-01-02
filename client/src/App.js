import React from 'react';
import { Routes,Route } from 'react-router-dom';
import './styles/Main.scss';
import Header from './components/Header';
import Main from './pages/Main';
import Mypage from './pages/Mypage';

function App() {
  return (
    <div className="App">
        <Header></Header>
        <Routes>
          <Route path='/' element={<Main></Main>}></Route>
          <Route path='/mypage' element={<Mypage></Mypage>}></Route>
        </Routes>
        앱입니다.
    </div>
  );
}

export default App;
