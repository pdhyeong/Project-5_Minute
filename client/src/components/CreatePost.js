import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import oreo from '../assets/레오쓰.jpeg'
import axios from 'axios'

const CreatPost = () => {
    const SERVER_URL = '';
    const [image,setImage] = useState({
        image_file: '',
        preview_URL: oreo,
    });
    const navigate = useNavigate();




    return (
        <div className='createpost'>
            <div className='createpost__profile'></div>
            <input onClick={()=>{navigate('/post')}} className='createpost__text-input' placeholder=' 게시글 작성하러 가기!'></input>


        </div>
    );
};

export default CreatPost;