import React, { useContext } from 'react';
import { UserContext } from '../context/LoginContext';
const GOOGLE_ID = '564959361694-cpirev63lk2deu94g77m6d3rjm47e92p.apps.googleusercontent.com';
const GoogleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&response_type=token&redirect_uri=http://localhost:3000/redirect&scope=https://www.googleapis.com/auth/userinfo.email`;



const LogginBanner = () => {
    const {accessToken, setAccessToken, isLoggedIn, setIsLoggedIn} =
    useContext(UserContext);

    const oAuthHandler = () => {
        console.log(isLoggedIn)
        window.location.assign(GoogleURL);
    };

    return (
        <div className='login-banner'>
            <div className='login-banner__wrapper'>
                <h4>회원가입, 로그인 하세요!</h4>
                <button 
                onClick={()=>{
                    oAuthHandler();

                }}>로그인</button>
                <button>가입하기</button>
            </div>
        </div>
    );
};

export default LogginBanner;