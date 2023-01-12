import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { UserContext } from '../context/LoginContext';

const SignIn = () => {
    const {setAccessToken,setUserInfo} = useContext(UserContext);
    const [password,setPassword] = useState();
    const navigate = useNavigate();

    const handleInputChange = (e) =>{
        setPassword(e.target.value);
    }
    const handleCloseButtonClick = () => {
        navigate('/');
    }
    const handleSubmitButton = () => {
        let token = window.location.search.split('=')[1];

        axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => res.data)
        .then(res =>{
            
            axios.post('http://localhost:8080/users',{
                
                nickname: res.email.split('@')[0],
                profile_image: res.picture,
                password: password,
                email: res.email,
                google_id : res.email,
            
            }).then(res=>{
                console.log(res.data);
                setUserInfo({
                    id: res.data.nickname,
                    email: res.data.email,
                    picture: res.data.profile_image,
                    verified_email: null,
                    token_amount: res.data.token_amount/1_000_000_000_000_000_000,
                    address: res.data.address,
                })
                setAccessToken(token);
                // localStorage.setItem('accessToken',token);
                // window.location.replace('/');
                navigate('/');
            })
        })
        .catch(err => console.log('user정보 못불러옴',err));
        

    }
    return (
        <div className='signin'>
            <div className='signin__modal'>
                <div className='signin__modal__header'>
                    <div 
                    className='signin__modal__header__close-button'
                    onClick={handleCloseButtonClick}>
                        <svg viewBox="0 0 24 24" aria-hidden="true"  fill="white"><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
                    </div>
                    <div className='signin__modal__header__logo'>
                        <img src={logo}></img>
                    </div>
                </div>
                <div className='signin__modal__input-container'>
                    <h4>비밀번호</h4>
                    <input
                        
                        type='text'
                        placeholder='토큰을 전송할 때 사용할 패스워드를 입력해주세요'
                        
                        onChange={handleInputChange}
                    ></input>
                    <div className='signin__modal__input-container__button'>
                        <button
                        onClick={handleSubmitButton}
                        >회원가입하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;