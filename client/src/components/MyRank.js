import React, { useContext } from 'react';
import { UserContext } from '../context/LoginContext';

const MyRank = () => {
    const {userInfo} = useContext(UserContext);
    return (
        <div className='myrank'>
            <div className='myrank-background-img'></div>
            <div className='myrank-profile-img'></div>
            <h2>{userInfo.email.split('@')[0]}</h2>
            <p>보유 토큰 개수 : 30</p>
            <p>lv : 30</p>
            <p>경험치 : 70%</p>
        </div>
    );
};

export default MyRank;