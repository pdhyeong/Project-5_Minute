import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/LoginContext';
import CreatePost from './CreatePost';
import Post from './Post';

const PostLayout = ({bookmarkedData,setBookmarkedData,setPostData,postData}) => {
    const {accessToken} = useContext(UserContext);
    return (
        <div className='postlayout'>
            {accessToken&&<CreatePost></CreatePost>}
            {
                postData.length!==0&&[...postData].reverse().map((e,i)=>{
                    return <Link key={i} to={'detail/'+i}>
                        <Post bookmarkedData={bookmarkedData} setBookmarkedData={setBookmarkedData} setPostData={setPostData} postData={e}></Post>
                    </Link>
                })
            }
        </div>
    );
};

export default PostLayout;