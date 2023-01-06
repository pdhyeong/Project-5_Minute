import React, { useContext } from 'react';
import { UserContext } from '../context/LoginContext';
import CreatePost from './CreatePost';
import Post from './Post';

const PostLayout = () => {
    const {accessToken} = useContext(UserContext);
    return (
        <div className='postlayout'>
            {accessToken&&<CreatePost></CreatePost>}
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