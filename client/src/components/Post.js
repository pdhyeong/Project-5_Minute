import React from 'react';

const Post = () => {
    return (
        <div className='post'>
            <div className='post__profile'>
                {/* <img alt='img'></img> */}
            </div>
            <div className='post__contents'>
                <div className='post__contents__user'>
                    <h4>user name</h4>
                    <span>@user id</span>
                </div>
                <p>
            
                lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                
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