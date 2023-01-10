import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/LoginContext';
import Loading from './Loading';

const SocialLogin = () => {
    const {accessToken, setAccessToken} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const url = new URL(window.location.href);
        const hash = url.hash;
        if (!hash) return;
        const token = hash.split("=")[1].split("&")[0];

        //1. 토큰으로 유저정보가져와서 
        axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => res.data)
        .then(res=>{
            axios.get(`http://localhost:8080/users?email=${res.email}`)
            .then(res=>{
                const user = res.data;
                if(user.length===0) {
                    navigate(`/signin?token=${token}`);
                }
                else {
                    localStorage.setItem('accessToken',token);
                    window.location.replace('/');
                }
            })
            .catch(err=>{
                console.log('db에서 user찾기실패',err);
                throw err;
            })
        })
        .catch(err=>{               
            console.log('토큰으로 user정보 가져오기 불가',err);
        });
        //2. db에 조회
        //3. 있으면 로그인
        //4. 없으면 회원가입연결

    }, []);
    
    return <Loading>
    </Loading>
};

export default SocialLogin;