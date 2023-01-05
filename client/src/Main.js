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


const Main = () => {
    const [userInfo,setUserInfo] = useState({
        id: '',
        email: '',
        profileImgUrl: ''
    });
    const {accessToken, setAccessToken, isLoggedIn, setIsLoggedIn} =
        useContext(UserContext);


    const checkAuth = async (accessToken) => {
        console.log(accessToken)
        await axios
            .get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            })
            .then((res) => {
                const {id,email,picture} = res.data;

                // console.log(email,id,picture)
                setUserInfo({
                    id: id,
                    email: email,
                    profileImgUrl: picture,
                });
                localStorage.setItem('user_info',JSON.stringify(
                    res.data
                ))
                
            })
            .catch((err) => {
                console.log(err)
            alert("oAuth token expired");
            setAccessToken(null);
            setIsLoggedIn(false);
            // window.location.assign("http://localhost:3000");
            });
        };    
    useEffect(()=>{
        const user_info =  localStorage.getItem('user_info');
        if(accessToken){
            const getAuthData = async () => {
                await checkAuth(accessToken);

            };
            getAuthData();
            localStorage.setItem('access_token',accessToken);
            console.log(userInfo)
        }   
        else if(!!user_info) {
            setAccessToken(localStorage.getItem('access_token'));
            const {id,email,picture} = JSON.parse(localStorage.getItem('user_info'));


            // console.log(email,id,picture)
            setUserInfo({
                id: id,
                email: email,
                profileImgUrl: picture,
            });
            setIsLoggedIn(true);
        }
        else{
            console.log('accessToken 없음');
        }
        
    },[accessToken]);

    return (
        <main className='main'>
            <div className='main-contents-container'>
                <SearchBar></SearchBar>
                <Routes>
                    <Route path='/' element={<PostLayout />}></Route>
                    <Route path='/mypage' element={<Mypage></Mypage>}></Route>
                    <Route path='/bookmark' element={<Bookmark></Bookmark>}></Route>
                    <Route path='/explore' element={<Explore></Explore>}></Route>
                    <Route path='/post' element={<MakePost></MakePost>}></Route>
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