import React, { useContext, useEffect, useState } from 'react';
import Footer from './components/Footer';
import { Routes,Route } from 'react-router-dom';
import Mypage from './pages/Mypage';
import SearchBar from './components/SearchBar';
import PostLayout from './components/PostLayout';
import Bookmark from './pages/Bookmark';
import Explore from './pages/Explore';
import MakePost from './pages/MakePost';
import { UserContext } from './context/LoginContext';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialLogin from './components/SocialLogin';
import axios from 'axios';
import Redirect from './components/Redirect';


const Main = () => {
    const {accessToken, setAccessToken, userInfo, setUserInfo} = useContext(UserContext);
    

    const getUserInfoByAccessToken = async (accessToken) => {
        
        const result = await axios
            .get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            })
            .then(res => res.data)
            .catch(err=>console.log(err));
         return result
    };    


    

    useEffect(()=>{
        const storedAccessToken =  (localStorage.getItem('accessToken'));
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
       
        if(storedAccessToken && accessToken===null){
            if(storedUserInfo ) setUserInfo(storedUserInfo);
            else getUserInfoByAccessToken(storedAccessToken)
            .then((result)=>{
                console.log(result);
                setUserInfo(result);
                localStorage.setItem('useInfo',JSON.stringify(result));;
            })

            setAccessToken(storedAccessToken);
        }
        else if(accessToken){
            console.log('Logged In')
        }
        else{
            console.log('Logged Out');
        }
    },[accessToken]);



    return (
        <main className='main'>
            <div className='main-contents-container'>
                <SearchBar></SearchBar>
                <Routes>
                    <Route path='/' element={<PostLayout />}></Route>
                    <Route path='/mypage' element={accessToken?<Mypage></Mypage>:<Redirect></Redirect>}></Route>
                    <Route path='/bookmark' element={accessToken?<Bookmark></Bookmark>:<Redirect></Redirect>}></Route>
                    <Route path='/explore' element={<Explore></Explore>}></Route>
                    <Route path='/post' element={accessToken?<MakePost></MakePost>:<Redirect></Redirect>}></Route>
                    <Route path='/redirect' element={<SocialLogin></SocialLogin>}></Route>
                </Routes>
            </div>
            <div className='main-footer-container'>
                <Footer ></Footer>
            </div>
        </main>
    );
};

export default Main;