import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import { UserContext } from '../context/LoginContext';

const Bookmark = ({bookmarkedData,setBookmarkedData,postData,setPostData}) => {
    const {userInfo} = useContext(UserContext);


    return (
        <div className='bookmark'>
            {bookmarkedData===null
                ?<div className='bookmark__no-content'>
                    <h1>포스트를 저장하세요!</h1>
                    <p> 다시 찾아보고 싶은 포스트를 잊기 전에 저장하세요! <br/> 저장된 포스트는 푹마크 탭에서 언제든지 쉽게 찾아볼 수 있습니다.</p>
                </div>
                : postData.length!==0&&[...postData].reverse().map((e,i)=>{
                        if(bookmarkedData.includes(e.content)) return <Link key={i} to={'../detail/'+i}>
                        <Post setPostData={setPostData} setBookmarkedData={setBookmarkedData} postData={e} bookmarkedData={bookmarkedData}></Post>
                    </Link>
                    })
                
            }
        </div>
    );
};

export default Bookmark;