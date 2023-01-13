/* eslint-disable no-undef */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { render } from "https://cdn.skypack.dev/react-dom@17";
import confetti from "https://cdn.skypack.dev/canvas-confetti@1";
import axios from 'axios';
import { UserContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

const MakePost = () => {
    const [descriptions, setDescriptions] = useState({
        title: '',
        content: '',
    })
    const {userInfo} = useContext(UserContext);
    const navigate = useNavigate();

    const callback = useCallback(() => {
        confetti({
        particleCount: 150,
        spread: 60
        });
    }, []);

    const handleButtonClick = ()=>{
        if(descriptions.title===''){
            alert('제목을 입력해주세요')   
        }else if(descriptions.content===''){
            alert('내용을 입력해주세요')
        }else{
            callback();
            axios.post('http://localhost:8080/post',{
                user_name: userInfo.email.split('@')[0],
                profile_image: userInfo.picture,
                problem_name: 1,
                title: descriptions.title,
                hash_title: [],
                content: descriptions.content,
                address: userInfo.address,
                like: 0,
            })
            .then(res=>{
                console.log('글쓰기 성공');
                window.location.replace('/');
            })
            .catch(err=>{
                console.log('글쓰기 실패',err);
                window.location.replace('/');
            });
        }
    }

    const handleInputChange = (e) => {
        setDescriptions(
            {
                title: e.target.value,
                content: descriptions.content
            }
     	)

        //  console.log(descriptions);

    }

    const handleTextareaChange = (e) => {
 		setDescriptions(
            {
                title: descriptions.title,
                content: e.target.value
            }
     	)
        //  console.log(descriptions);
     }


    return (
        <div className='makepost'>
            <h3>Create Post</h3>
            <div className='makepost__editor-container'>
                <div className='makepost__editor-container__input-container'>
                    <input 
                    autoFocus="autofocus"
                    onChange={handleInputChange}
                    placeholder='제목' maxLength='300' type='text'></input>
                    <span>{descriptions.title.length}/300</span>

                </div>
                {/* <Editor
                ref={editorRef}
                initialValue='포스트를 입력해주세요'
                previewStyle="vertical"
                height="350px"
                
                initialEditType="markdown"
                theme='dark'
                useCommandShortcut={true}
                onChange={handleEditorInputChage}
                /> */}
                <textarea 
                placeholder='포스트를 입력해주세요'
                onChange={handleTextareaChange}>

                </textarea>
                {/* <span>Preview</span> */}
                <button className="button" onClick={handleButtonClick}>
                    <span>🎉</span>
                    <span>Post</span>
                </button>
            </div>
        </div>
    );
};

export default MakePost;