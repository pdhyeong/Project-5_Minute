import React, { useContext } from 'react';
import { UserContext } from '../context/LoginContext';

const MyRank = () => {
    const {userInfo} = useContext(UserContext);
    return (
        <div className='myrank'>
            <div className='myrank-background-img'></div>
            <div className='myrank-profile-img'></div>
            <h2>{userInfo.email.split('@')[0]}</h2>
            <p>내 지갑주소 : {userInfo.address}</p>
            <p>보유 토큰 개수 : {userInfo.token_amount}</p>
            <p>lv : 30</p>

        </div>
    );
};

export default MyRank;