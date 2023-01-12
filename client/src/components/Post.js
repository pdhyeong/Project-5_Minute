import React from 'react';

const Post = ({postData}) => {
    return (
        <div className='post'>
            <div className='post__profile'>
                {<img alt='img' src={postData.profile_image}></img>}
            </div>
            <div className='post__contents'>
                <div className='post__contents__user'>
                    <h4>{postData.user_name}</h4>
                    <span>@{postData.user_name}</span>
                </div>
                <h2>{postData.title}</h2>
                <p>
                {postData.content}
                
                </p>
                <div className='post__contents__interact'>
                    <div> 888 comments</div>
                    <div> 1929 like</div>
                    <div> award</div>
                    <div> save</div>
                </div>
            </div>
        </div>
    );
};

export default Post;