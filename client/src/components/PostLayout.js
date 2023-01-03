import React from 'react';
import CreatePost from './CreatePost';
import Post from './Post';

const PostLayout = () => {
    return (
        <div className='postlayout'>
            <CreatePost></CreatePost>
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