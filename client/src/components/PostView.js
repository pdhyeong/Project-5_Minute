import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/LoginContext';

const PostView = ({setPostData,postData}) => {
    const {userInfo,accessToken} = useContext(UserContext);
    const [comment,setComment] = useState('');
    const [likeToggle,setLikeToggle] = useState(Array(100).fill(false));
    let {postid} = useParams();
    postid = postData?.length - postid -1;
    const detailData = postData[postid];
    


    const getPostData = async () => {
        axios.get('http://localhost:8080/post')
        .then(res=>res.data)
        .then(res=>{
            setPostData(res);
            // console.log(postData);
        })
    }
    const handleLikeClick = (i) =>{
        setLikeToggle(cur=>{
            let newLike = [...cur];
            newLike[i] = true;
            return newLike;
        })
    }

    const handleReplyButtonClick = () => {
        console.log('댓글클릭')
        if(comment===''){
            alert('댓글을 입력해주세요');
        }
        else{
            // console.log('댓글포스트요청');
            axios.post('http://localhost:8080/post/comment',{
                "user_name": userInfo.email.split('@')[0],
                "profile_image" : userInfo.picture,
                "comment_content" : comment,
                "post_content" : detailData?.content,
            }).then((res)=>{
                getPostData();
                setComment('');
            })
        }
    }
    const handleCommentInputChange = (e) => {
        // console.log(e.target.value)
        setComment(e.target.value);
        // console.log(comment)
    }
    // const handleKeyEnter = (e) => {
    //     if(e.key === 'Enter') {
    //         e.preventDefault();
    //         handleReplyButtonClick();
    //     }
    // }   

    return (
        <>
        <div className='spacer'></div>
        <div className='post'>
            <div className='post__profile'>
                <img src={detailData?.profile_image}></img>
            </div>
            <div className='post__contents'>
                <div className='post__contents__user'>
                    <h4>{detailData?.user_name}</h4>
                    <span>@{detailData?.user_name}</span>
                </div>
                <h2>{detailData?.title}</h2>
                <p>
                {detailData?.content}
                </p>
            </div>
        </div>
        <div className='post__contents__interact space-arround'>
            <div className='post__contents__interact__item green-hover'> 
                <svg viewBox="0 0 24 24" aria-hidden="true"  className='green-hover'><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                <span className='green-hover'>{detailData?.comments.length}</span>
            </div>
            <div className='post__contents__interact__item pink-hover'> 
            <svg viewBox="0 0 24 24" aria-hidden="true"  ><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
                <span >{detailData?.like}</span>
            </div>
            <div className='post__contents__interact__item orange-hover'> 
                <svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 464.628 464.628" enable-background="new 0 0 464.628 464.628">
                    <path d="m394.33,105.596h-76.136c22.944-22.372 37.216-53.596 37.216-88.096 0-9.665-7.835-17.5-17.5-17.5-44.786,0-84.057,24.045-105.596,59.9-21.539-35.855-60.81-59.9-105.595-59.9-9.665,0-17.5,7.835-17.5,17.5 0,34.5 14.273,65.724 37.216,88.096h-76.137c-9.665,0-17.5,7.835-17.5,17.5v324.033c0,9.665 7.835,17.5 17.5,17.5h324.032c9.665,0 17.5-7.835 17.5-17.5v-324.033c0-9.665-7.835-17.5-17.5-17.5zm-17.5,162.016h-127.016v-127.016h127.016v127.016zm-58.646-230.385c-7.525,32.765-33.378,58.618-66.144,66.143 7.526-32.766 33.379-58.619 66.144-66.143zm-105.596,66.142c-32.765-7.525-58.618-33.378-66.143-66.143 32.765,7.525 58.618,33.378 66.143,66.143zm2.226,37.227v127.016h-127.016v-127.016h127.016zm-127.016,162.016h127.016v127.017h-127.016v-127.017zm162.016,127.016v-127.016h127.016v127.017h-127.016z"/>
                </svg>
                <span >Award</span>
            </div>
        </div>
        {
            accessToken&&<div className='createpost'>
            <div className='createpost__profile'>
                <img src={userInfo.picture}></img>
            </div>
            <input 
            autoFocus='autoFocus'
            value={comment}
            // onKeyDown={handleKeyEnter}
            onChange={handleCommentInputChange}
            className='createpost__text-input bg-navy' placeholder='포스트에 댓글 작성하기'></input>
            <button 
            onClick={handleReplyButtonClick}
            className='replybutton'>Reply</button>
        </div>}
       
        <div className='comments'>
            <div className='comments__item__container'>
                {detailData?.comments.map((e,i)=>{
                    return <div key={i} className='comments__item'>
                        <img src={e.profile_image}></img>
                            <div>
                                <span>@{e.user_name}</span>
                                <div className='color-orange'>@{detailData.user_name} 님께 보내는 답글</div>
                                <p>{e.comment_content}</p>
                            </div>
                            <div 
                            className='smaller'>
                                <svg className={likeToggle[i]?'like-clicked':''} viewBox="0 0 24 24" aria-hidden="true"  fill='white'><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
                            </div>
                        </div>
                })}
            </div>
        </div>
    </>
    );
};

export default PostView;