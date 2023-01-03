import React from 'react';
import Footer from './components/Footer';
import { Routes,Route } from 'react-router-dom';
import Mypage from './pages/Mypage';
import SearchBar from './components/SearchBar';
import PostLayout from './components/PostLayout';

const Main = () => {
    return (
        <main className='main'>
            
            <div className='main-contents-container'>
                <SearchBar></SearchBar>
                <Routes>
                    <Route path='/' element={<PostLayout/>}></Route>
                    <Route path='/mypage' element={<Mypage></Mypage>}></Route>
                </Routes>
            </div>
            <div className='main-footer-container'>
                <Footer></Footer>
            </div>
        </main>
    );
};

export default Main;