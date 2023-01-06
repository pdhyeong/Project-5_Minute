import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreatPost = () => {

    const navigate = useNavigate();


    return (
        <div className='createpost'>
            <div className='createpost__profile'></div>
            <input onClick={()=>{navigate('/post')}} className='createpost__text-input' placeholder=' 게시글 작성하러 가기!'></input>


        </div>
    );
};

export default CreatPost;