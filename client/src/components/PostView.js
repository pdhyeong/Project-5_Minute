import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/LoginContext';

const PostView = ({postData}) => {
    const {userInfo,accessToken} = useContext(UserContext);
    const {postid} = useParams();
    const detailData = postData[postid];

    return (
        <>
        <div className='spacer'></div>
        <div className='post'>
            <div className='post__profile'>
                {/* <img alt='img'></img> */}
            </div>
            <div className='post__contents'>
                <div className='post__contents__user'>
                    <h4>{detailData.user_name}</h4>
                    <span>@{detailData.user_name}</span>
                </div>
                <h2>{detailData.title}</h2>
                <p>
                {detailData.content}
                </p>
            </div>
            
        </div>
        {
            accessToken&&<div className='createpost'>
            <div className='createpost__profile'>
                <img src={userInfo.picture}></img>
            </div>
            <input className='createpost__text-input bg-navy' placeholder='포스트에 댓글 작성하기'></input>
            <button className='replybutton'>Reply</button>
        </div>}
        <div className='comments'>

        </div>
    </>
    );
};

export default PostView;