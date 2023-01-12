import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/LoginContext';
import CreatePost from './CreatePost';
import Post from './Post';

const PostLayout = ({postData}) => {
    const {accessToken} = useContext(UserContext);
    return (
        <div className='postlayout'>
            {accessToken&&<CreatePost></CreatePost>}
            {
                postData.length!==0&&postData.map((e,i)=>{
                    return <Link to={'detail/'+i}>
                        <Post key={i} postData={e}></Post>
                    </Link>
                })
            }
        </div>
    );
};

export default PostLayout;