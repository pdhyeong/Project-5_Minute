import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import { UserContext } from '../context/LoginContext';


const Header = () => {
    const {accessToken, setAccessToken, userInfo, setUserInfo} =
    useContext(UserContext);

    const handleLogout = async () => {
        console.log('handle Logout!');
        await axios
          .post(`https://oauth2.googleapis.com/revoke?token=${accessToken}`)
          .then(() => {
            localStorage.clear();
            setAccessToken(null);
            setUserInfo(null);
            window.location.assign("http://localhost:3000/");
          })
          .catch(() => {
            localStorage.clear();
            setAccessToken(null);
            setUserInfo(null);
            alert("로그아웃에 실패했습니다.");
          });
      };


    return (
        <header className='header'>

            <Link to='/'>
                <div className='header-img-wrapper'>
                    <img className='header-img-wrapper-img' src={logo}></img>                
                </div>
            </Link>

            <ul className='header-ul'>

                {
                <Link to='/'>
                    <li className='header-ul-li'>
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill='#f7f9f9'><g><path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"></path></g></svg>
                        <span>Home</span>
                    </li>
                </Link>
                }
                {
                <Link to='/explore'>
                    <li className='header-ul-li'>
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill='#f7f9f9'><g><path d="M10.64 3.157l-.36 3.593h4.99l.38-3.892 2.99.299-.36 3.593h2.97v2.5h-3.22l-.55 5.5h2.77v2.5h-3.02l-.39 3.892-2.98-.299.36-3.593H9.23l-.39 3.892-2.98-.299.36-3.593H2.75v-2.5h3.72l.55-5.5H3.75v-2.5h3.52l.38-3.892 2.99.299zm3.83 11.593l.55-5.5h-4.99l-.55 5.5h4.99z"></path></g></svg>
                        <span>탐색하기</span>
                    </li>
                </Link>
                }
                {
                accessToken&&<Link to='/mypage'>
                    <li className='header-ul-li'>
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill='#f7f9f9'><g><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path></g></svg>
                        <span>프로필</span>
                    </li>
                </Link>
                }
                {
                accessToken&&<Link to='/bookmark'>
                    <li className='header-ul-li'>
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill='#f7f9f9'><g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g></svg>
                        <span>북마크</span>
                    </li>
                </Link>
                }
                {accessToken&&<Link to='/post'>
                    <li className='header-ul-li'>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" fill='#f7f9f9' preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none"><path d="M2492 5109 c-45 -13 -108 -80 -121 -126 -7 -26 -11 -392 -11 -1130 l0 -1093 -1113 -2 -1113 -3 -41 -27 c-63 -41 -88 -90 -88 -169 0 -54 5 -72 27 -106 15 -22 44 -51 65 -64 l38 -24 1112 -3 1113 -2 2 -1113 3 -1112 24 -38 c13 -21 42 -50 64 -65 34 -23 52 -27 107 -27 55 0 73 4 107 27 22 15 51 44 64 65 l24 38 3 1112 2 1113 1113 2 1112 3 38 24 c21 13 50 42 65 64 23 34 27 52 27 107 0 55 -4 73 -27 107 -15 22 -44 51 -65 64 l-38 24 -1112 3 -1113 2 -2 1113 -3 1112 -24 38 c-47 76 -151 113 -239 86z"/></g></svg>
                        <span>Post</span>
                    </li>
                </Link>
                }
                {accessToken&&<li onClick={handleLogout} className='header-ul-li header__logout'>
                        <svg  version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" fill='#f7f9f9' preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none"><path d="M2492 5109 c-45 -13 -108 -80 -121 -126 -7 -26 -11 -392 -11 -1130 l0 -1093 -1113 -2 -1113 -3 -41 -27 c-63 -41 -88 -90 -88 -169 0 -54 5 -72 27 -106 15 -22 44 -51 65 -64 l38 -24 1112 -3 1113 -2 2 -1113 3 -1112 24 -38 c13 -21 42 -50 64 -65 34 -23 52 -27 107 -27 55 0 73 4 107 27 22 15 51 44 64 65 l24 38 3 1112 2 1113 1113 2 1112 3 38 24 c21 13 50 42 65 64 23 34 27 52 27 107 0 55 -4 73 -27 107 -15 22 -44 51 -65 64 l-38 24 -1112 3 -1113 2 -2 1113 -3 1112 -24 38 c-47 76 -151 113 -239 86z"/></g></svg>
                        <span>Logout</span>
                    </li>
                
                }
            </ul>
            {accessToken&&<div className='header__loggedin-profile'>
                <img src={userInfo.picture}/>
                <div className='header__loggedin-profile__id'>
                    <h5>{userInfo.email.split('@')[0]}</h5>
                    <span>{'@'+userInfo.email.split('@')[0]}</span>
                </div>
            </div>}
        </header>
    );
};

export default Header;