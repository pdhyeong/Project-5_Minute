import React, { useContext } from 'react';
import { UserContext } from '../context/LoginContext';
import CreatePost from './CreatePost';
import Post from './Post';

const PostLayout = () => {
    const {accessToken, setAccessToken, isLoggedIn, setIsLoggedIn} =
    useContext(UserContext);
    return (
        <div className='postlayout'>
            {isLoggedIn&&<CreatePost></CreatePost>}
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
        </div>
    );
};

export default PostLayout;