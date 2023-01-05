/* eslint-disable no-undef */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { render } from "https://cdn.skypack.dev/react-dom@17";
import confetti from "https://cdn.skypack.dev/canvas-confetti@1";

import { Editor } from '@toast-ui/react-editor';

const MakePost = () => {
    let editorRef = useRef(null);
    const [descriptions, setDescriptions] = useState({
        title: '',
        content: '',
    })

    const handleButtonClick = useCallback(() => {
        confetti({
          particleCount: 150,
          spread: 60
        });
      }, []);

    const handleInputChange = (e) => {
        setDescriptions(
            {
                title: e.target.value,
                content: descriptions.content
            }
     	)
        //  console.log(descriptions);

    }

    const handleEditorInputChage = () => {
 		setDescriptions(
            {
                title: descriptions.title,
                content: editorRef.current.getInstance().getMarkdown()
            }
     	)
        // console.log(descriptions);
     }
    // console.log(editorRef.current);
    
    // useEffect(()=>{
    //     if(editorRef)   
        // editorRef.current.classList.add('my-editor-root');
    //     console.dir(editorRef.current.children)
    // },[]);
    

    return (
        <div className='makepost'>
            <h3>Create Post</h3>
            <div className='makepost__editor-container'>
                <div className='makepost__editor-container__input-container'>
                    <input 
                    onChange={handleInputChange}
                    placeholder='제목' maxLength='300' type='text'></input>
                    <span>{descriptions.title.length}/300</span>

                </div>
                <Editor
                ref={editorRef}
                initialValue='포스트를 입력해주세요'
                previewStyle="vertical"
                height="350px"
                
                initialEditType="markdown"
                theme='dark'
                useCommandShortcut={true}
                onChange={handleEditorInputChage}
                />
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