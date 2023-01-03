import React, { useState } from 'react';
import profile from '../assets/레오쓰.jpeg'

const Mypage = () => {
    const [tap,setTap] = useState(0);

    return (
        <div className='mypage'>
            <div className='mypage__background'>
                <div className='mypage__background__profile__img'>
                    <img src={profile}></img>
                </div>
            </div>
            <div className='mypage__background__spacer'>

            </div>
            <div className='mypage__profile__contents'>
                <h3>zinoopark</h3>
                <span>@zinoo_park</span>
                <p>가입일: 2022년 10월</p>
                <div>
                    획득 뱃지 <span>a</span><span>b</span><span>c</span><span>d</span>
                </div>
            </div>
            <div className='mypage__contents'>
                <div className='mypage__contents__tap'>
                    <div onClick={()=>{setTap(0)}} className={tap===0?'mypage__contents__tap__item tap-hover':'mypage__contents__tap__item'}>RANK</div>
                    <div onClick={()=>{setTap(1)}} className={tap===1?'mypage__contents__tap__item tap-hover':'mypage__contents__tap__item'} >POST</div>
                </div>
            </div>
        </div>
    );
};

export default Mypage;